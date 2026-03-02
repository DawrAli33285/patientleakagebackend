import "dotenv/config";
import {
  AthenaClient,
  StartQueryExecutionCommand,
  GetQueryExecutionCommand,
  GetQueryResultsCommand,
} from "@aws-sdk/client-athena";
import https from "https";
import FootDataModel from "../footdata.js";
const athena = new AthenaClient({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const DATABASE = "sagemaker_sample_db";
const OUTPUT_BUCKET = "s3://support-data-eu-north-1-886281029470/athena-results/";

async function geocodeAddress(addressObj) {
  // Remove suite/unit numbers as they confuse geocoders
  const cleanStreet = addressObj.street
    .replace(/\s*(ste|suite|unit|apt|#|floor|fl)\s*[\w-]*/gi, '')
    .trim();
  const fullAddress = `${cleanStreet}, ${addressObj.city}, ${addressObj.state}`;  const encoded = encodeURIComponent(fullAddress);
  const url = `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1`;

  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "location-analysis/1.0" } }, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        try {
          const results = JSON.parse(data);
          if (!results.length) reject(new Error(`No geocoding results for: ${fullAddress}`));
          else resolve({ lat: parseFloat(results[0].lat), lon: parseFloat(results[0].lon) });
        } catch (e) { reject(e); }
      });
    }).on("error", reject);
  });
}

function boundingBox(location) {
  const kmPerDegreeLat = 111.0;
  const kmPerDegreeLon = 111.0 * Math.cos((location.lat * Math.PI) / 180);
  const latDelta = location.radius / kmPerDegreeLat;
  const lonDelta = location.radius / kmPerDegreeLon;
  return {
    minLat: location.lat - latDelta,
    maxLat: location.lat + latDelta,
    minLon: location.lon - lonDelta,
    maxLon: location.lon + lonDelta,
  };
}

async function runAthenaQuery(sql) {
  const { QueryExecutionId } = await athena.send(new StartQueryExecutionCommand({
    QueryString: sql,
    QueryExecutionContext: { Database: DATABASE },
    ResultConfiguration: { OutputLocation: OUTPUT_BUCKET },
  }));

  console.log("  Query ID:", QueryExecutionId);

  while (true) {
    const { QueryExecution } = await athena.send(new GetQueryExecutionCommand({ QueryExecutionId }));
    const state = QueryExecution.Status.State;
    console.log("  Status:", state);
    if (state === "SUCCEEDED") break;
    if (state === "FAILED" || state === "CANCELLED") {
      throw new Error(`Query ${state}: ${QueryExecution.Status.StateChangeReason}`);
    }
    await new Promise(r => setTimeout(r, 1500));
  }

  const rows = [];
  let nextToken;
  let isFirstPage = true;
  let headers = [];

  do {
    const result = await athena.send(new GetQueryResultsCommand({ QueryExecutionId, NextToken: nextToken }));

    if (isFirstPage) {
      headers = result.ResultSet.Rows[0].Data.map(d => d.VarCharValue);
    }

    const dataRows = isFirstPage ? result.ResultSet.Rows.slice(1) : result.ResultSet.Rows;
    dataRows.forEach(row => {
      const obj = {};
      row.Data.forEach((cell, i) => obj[headers[i]] = cell.VarCharValue ?? null);
      rows.push(obj);
    });

    nextToken = result.NextToken;
    isFirstPage = false;
  } while (nextToken);

  return rows;
}

export async function getFootData(req, res) {
  try {
    const { addresses, startDate, endDate } = req.body;

    if (!addresses || addresses.length < 2) {
      return res.status(400).json({ error: "Need at least a primary and one secondary address" });
    }

    const primaryAddr = addresses[0];
    console.log('🔍 Full addresses array received:', JSON.stringify(addresses, null, 2));
    console.log(`🔍 Geocoding primary: ${primaryAddr.street}, ${primaryAddr.city}, ${primaryAddr.state}`);
    const primaryGeo = await geocodeAddress(primaryAddr);
    await new Promise(r => setTimeout(r, 1100));
    console.log(`✅ Primary geocoded: lat=${primaryGeo.lat}, lon=${primaryGeo.lon}`);
    console.log(`📦 Full request body:`, JSON.stringify(req.body, null, 2));

    const PRIMARY_LOCATION = {
      name: primaryAddr.name,
      address: `${primaryAddr.street}, ${primaryAddr.city}, ${primaryAddr.state}`,
      lat: primaryGeo.lat,
      lon: primaryGeo.lon,
      radius: 0.5,
    };

    const SECONDARY_LOCATIONS = [];
    const secondaryAddrs = addresses.slice(1);
    
    for (let i = 0; i < secondaryAddrs.length; i++) {
      const addr = secondaryAddrs[i];
      try {
        console.log(`🔍 Geocoding (${i + 1}/${secondaryAddrs.length}): ${addr.street}, ${addr.city}, ${addr.state}`);
        const geo = await geocodeAddress(addr);
        console.log(`✅ ${addr.name} → lat=${geo.lat}, lon=${geo.lon}`);
        SECONDARY_LOCATIONS.push({
          name: addr.name,
          address: `${addr.street}, ${addr.city}, ${addr.state}`,
          lat: geo.lat,
          lon: geo.lon,
          radius: 0.5,
        });
      } catch (err) {
        console.warn(`⚠️ Skipping ${addr.name}: ${err.message}`);
      }
      await new Promise(r => setTimeout(r, 1100));
    }

    console.log(`\n=== Finding MAIDs near primary: ${PRIMARY_LOCATION.name} ===`);
    const pbb = boundingBox(PRIMARY_LOCATION);

    const primaryRows = await runAthenaQuery(`
      SELECT DISTINCT device_id
      FROM sagemaker_sample_db.incoming
      WHERE latitude IS NOT NULL
        AND longitude IS NOT NULL
        AND CAST(latitude AS DOUBLE) BETWEEN ${pbb.minLat} AND ${pbb.maxLat}
        AND CAST(longitude AS DOUBLE) BETWEEN ${pbb.minLon} AND ${pbb.maxLon}
        AND CAST(timestamp AS DATE) >= DATE '${startDate}'
        AND CAST(timestamp AS DATE) <= DATE '${endDate}'
    `);

    const primaryMAIDs = primaryRows.map(r => r.device_id);
    console.log(`  Unique MAIDs at primary: ${primaryMAIDs.length}`);
    console.log(`  Bounding box used: ${JSON.stringify(pbb)}`);
    if (!primaryMAIDs.length) {
      return res.status(200).json({
        success: true,
        data: {
          primary_location: PRIMARY_LOCATION.name,
          primary_visitor_count: 0,
          secondary_matches: []
        }
      });
    }

    const secondary_matches = [];
    const maidList = primaryMAIDs.map(id => `'${id}'`).join(", ");

    for (const secondary of SECONDARY_LOCATIONS) {
      console.log(`\n📍 Checking secondary: ${secondary.name}`);
      const sbb = boundingBox(secondary);

      const secondaryRows = await runAthenaQuery(`
        SELECT DISTINCT device_id
        FROM sagemaker_sample_db.incoming
        WHERE device_id IN (${maidList})
          AND latitude IS NOT NULL
          AND longitude IS NOT NULL
          AND CAST(latitude AS DOUBLE) BETWEEN ${sbb.minLat} AND ${sbb.maxLat}
          AND CAST(longitude AS DOUBLE) BETWEEN ${sbb.minLon} AND ${sbb.maxLon}
          AND CAST(timestamp AS DATE) >= DATE '${startDate}'
          AND CAST(timestamp AS DATE) <= DATE '${endDate}'
      `);

      const matchedMAIDs = secondaryRows.map(r => r.device_id);
      console.log(`  → ${matchedMAIDs.length} MAIDs visited both`);

      secondary_matches.push({
        location: secondary.name,
        address: secondary.address,
        matched_maid_count: matchedMAIDs.length,
        matched_maids: matchedMAIDs,
        overlap_percentage: primaryMAIDs.length > 0 
          ? ((matchedMAIDs.length / primaryMAIDs.length) * 100).toFixed(1)
          : 0
      });
    }

    await FootDataModel.create({
      user: req.user._id,
      primary_location: PRIMARY_LOCATION.name,
      primary_address: PRIMARY_LOCATION.address,
      primary_visitor_count: primaryMAIDs.length,
      start_date: startDate,
      end_date: endDate,
      secondary_matches
    });

    return res.status(200).json({
      success: true,
      data: {
        primary_location: PRIMARY_LOCATION.name,
        primary_visitor_count: primaryMAIDs.length,
        secondary_matches
      }
    });

  } catch (e) {
    console.error(e);
    return res.status(400).json({ error: e.message });
  }
}