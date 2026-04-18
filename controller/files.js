

const xlsx = require('xlsx');


const REGION_BOUNDS = { minLat: 32.0, maxLat: 35.5, minLng: -83.5, maxLng: -78.5 };

function simplifyAddress(addr) {
  return addr
    .replace(/\s*(entrance\s*[a-z]|ste\s*[\w]+|suite\s*[\w]+|unit\s*[\w]+|apt\s*[\w]+|#[\w]+)\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


async function geocodeAddress(fullAddress) {
  for (const query of [fullAddress, simplifyAddress(fullAddress)]) {
    if (!query) continue;
    try {
      await sleep(300);
      const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=1&lang=en`;
      const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
      const data = await res.json();
      const feature = data?.features?.[0];
      if (feature) {
        const [lng, lat] = feature.geometry.coordinates;
        console.log(`[GEO] "${query}" → lat:${lat} lng:${lng}`);
        return [lat, lng];
      } else {
        console.log(`[GEO] No result for "${query}"`);
      }
    } catch (err) { console.error(`[GEO ERROR] "${query}":`, err.message); }
  }
  return null;
}

module.exports.parseExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const ext = (req.file.originalname || '').toLowerCase();
    if (!ext.endsWith('.xlsx') && !ext.endsWith('.xls') && !ext.endsWith('.csv')) {
      return res.status(400).json({ error: 'Only .xlsx, .xls, and .csv files are supported' });
    }

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rawRows = xlsx.utils.sheet_to_json(sheet, { defval: '' });

    if (!rawRows.length) {
      return res.status(422).json({ error: 'Spreadsheet appears to be empty' });
    }

    const firstRow = rawRows[0];
    const keys = Object.keys(firstRow).map(k => k.trim().toLowerCase());

    const isPrimaryCompetitor = keys.includes('primary') || keys.includes('competitor');
    const isAddressFormat     = keys.includes('address') || keys.includes('city state zip');
    const isEmployeeFormat    = keys.some(k => k.includes('address line 1')) ||
                                keys.some(k => k.includes('city') && k.includes('state'));
    
    if (!isPrimaryCompetitor && !isAddressFormat && !isEmployeeFormat) {
      return res.status(422).json({
        error: 'Unrecognized format. Expected columns: "primary"/"competitor", "Address"/"City State Zip", or "Address Line 1 + Address Line 2"/"City, State Zip Code"'
      });
    }
    
        const primaryMap = {};
        const competitorMap = {};
    rawRows.forEach((row) => {
      console.log("ROW")
      console.log(row)
      if (isEmployeeFormat) {
        // Find the address and city/state/zip columns (handle slight key variations)
        const addressKey = Object.keys(row).find(k => k.toLowerCase().includes('address line 1'));
        const cityKey    = Object.keys(row).find(k => k.toLowerCase().includes('city') && k.toLowerCase().includes('state'));
        const address      = String(row[addressKey] || '').trim();
        const cityStateZip = String(row[cityKey]    || '').trim();
        if (!address && !cityStateZip) return;
        const key = `${address}||${cityStateZip}`;
        if (primaryMap[key]) primaryMap[key].count += 1;
        else primaryMap[key] = { address, cityStateZip, count: 1 };
      } else if (isPrimaryCompetitor) {
        const primaryRaw    = String(row['primary']    || row['Primary']    || '').trim();
        const competitorRaw = String(row['competitor'] || row['Competitor'] || '').trim();
        if (primaryRaw)    primaryMap[primaryRaw]    = (primaryMap[primaryRaw]    || 0) + 1;
        if (competitorRaw) competitorMap[competitorRaw] = (competitorMap[competitorRaw] || 0) + 1;
      } else {
        const address      = String(row['Address']        || '').trim();
        const cityStateZip = String(row['City State Zip'] || '').trim();
        if (!address && !cityStateZip) return;
        const key = `${address}||${cityStateZip}`;
        if (primaryMap[key]) primaryMap[key].count += 1;
        else primaryMap[key] = { address, cityStateZip, count: 1 };
      }
    });
    
    if (isPrimaryCompetitor) {
      const parseEntry = (raw) => {
        const parts = raw.split(',').map(p => p.trim());
        const name    = parts[0] || raw;
        const address = parts.slice(1).join(', ').trim() || raw;
        return { name, address, fullAddress: raw };
      };

      const primaries   = Object.entries(primaryMap).map(([raw, count]) => ({ ...parseEntry(raw), count, type: 'primary' }));
      const competitors = Object.entries(competitorMap).map(([raw, count]) => ({ ...parseEntry(raw), count, type: 'competitor' }));
      const allEntries  = [...primaries, ...competitors];

      // Geocode server-side with bounds check
      const geocoded = [];
      for (const entry of allEntries) {
        const coords = await geocodeAddress(entry.fullAddress) || await geocodeAddress(entry.address);
        console.log(`[GEO] "${entry.name}" → ${coords ? coords : 'null (skipped)'}`);
        if (coords) geocoded.push({ ...entry, coords });
      }

      return res.json({
        rows: rawRows.length,
        addresses: geocoded.sort((a, b) => b.count - a.count),
        format: 'primary-competitor',
      });

    } else {
        const addressList = Object.entries(primaryMap)
        .map(([key, val]) => val)
        .sort((a, b) => b.count - a.count);

      // Geocode server-side for employee/address-zip formats
      const geocoded = [];
      for (const entry of addressList) {
        const fullAddress = entry.address
          ? `${entry.address}, ${entry.cityStateZip}`
          : entry.cityStateZip;

        // Try full address first, then city/state/zip only, then zip only
        const zipOnly = entry.cityStateZip;
        const zipCode = (entry.cityStateZip || '').match(/\b(\d{5})\b/)?.[1];
        const stateOnly = (entry.cityStateZip || '').replace(/\d{5}(-\d{4})?/, '').trim();

        const coords = await geocodeAddress(fullAddress)
          || await geocodeAddress(zipOnly)
          || (zipCode ? await geocodeAddress(zipCode + ', USA') : null)
          || (stateOnly ? await geocodeAddress(stateOnly) : null);

        console.log(`[GEO] "${fullAddress}" → ${coords ? coords : 'null (skipped)'}`);
        if (coords) geocoded.push({ ...entry, coords, fullAddress });
      }
      
      return res.json({
        rows: rawRows.length,
        addresses: geocoded,
        format: 'address-zip',
      });
    }
  } catch (err) {
    console.error('Parse error:', err);
    return res.status(500).json({ error: 'Failed to parse file: ' + err.message });
  }
};