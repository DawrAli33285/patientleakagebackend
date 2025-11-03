const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const userModel=require('./user')
const axios = require('axios');
const authRoutes=require('./routes/auth')
const connection=require('./connection/connection')

const app = express();
const PORT = process.env.PORT || 3001;

// Placer.ai API configuration
const PLACER_API_KEY = process.env.PLACER_API_KEY || 'your-api-key-here';
const PLACER_BASE_URL = 'https://api.placer.ai/v1';

connection
// Middleware
app.use(cors());
app.use(express.json());
app.use(authRoutes)

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'));
    }
  }
});

// Parse CSV and group data
function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    const grouped = {};

    fs.createReadStream(filePath)
      .pipe(csv({
        mapHeaders: ({ header }) => header.trim()
      }))
      .on('data', (row) => {
        const primaryAddr = (row['Primary Address'] || '').toString().trim();
        const otherAddr = (row['Other Site Visiting Address'] || '').toString().trim();

        if (!primaryAddr || !otherAddr) return;

        if (!grouped[primaryAddr]) {
          grouped[primaryAddr] = {};
        }

        if (!grouped[primaryAddr][otherAddr]) {
          grouped[primaryAddr][otherAddr] = 0;
        }

        grouped[primaryAddr][otherAddr]++;
      })
      .on('end', () => {
        const result = Object.entries(grouped).map(([primary, visits]) => ({
          primaryAddress: primary,
          visitingSites: Object.entries(visits)
            .map(([addr, count]) => ({
              address: addr,
              count: count
            }))
            .sort((a, b) => b.count - a.count),
          totalVisits: Object.values(visits).reduce((a, b) => a + b, 0)
        }));

        resolve(result);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

// Geocode address using Placer.ai or fallback
async function geocodeAddress(address) {
  try {
    // In production, use Placer.ai geocoding or third-party service
    // For now, return a mock apiId based on address hash
    const hash = Buffer.from(address).toString('base64').slice(0, 12);
    return { apiId: `api_${hash}`, address: address };
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

// Fetch visits by CBGs from Placer.ai
async function getVisitsByCBGs(apiIds, startDate, endDate, options = {}) {
  try {
    const response = await axios.post(
      `${PLACER_BASE_URL}/reports/visit-metrics-cbgs`,
      {
        apiIds: apiIds,
        startDate: startDate,
        endDate: endDate,
        location: options.location || 'Home',
        granularity: options.granularity || 'week',
        trafficVolPct: options.trafficVolPct || 70
      },
      {
        headers: {
          'x-api-key': PLACER_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Placer.ai API Error:', error.response?.data || error.message);
    throw new Error('Failed to fetch Placer.ai data: ' + (error.response?.data?.message || error.message));
  }
}

// Calculate total visits from CBG data
function calculateTotalVisits(cbgData) {
  if (!cbgData || !cbgData.visitsByCBGs) {
    return null;
  }

  const results = cbgData.visitsByCBGs.map(locationData => {
    let totalVisits = 0;
    let cbgBreakdown = [];

    if (locationData.visitsByCBGsTrend) {
      locationData.visitsByCBGsTrend.forEach((periodData, index) => {
        periodData.forEach(cbg => {
          totalVisits += cbg.visits || 0;
          
          let cbgEntry = cbgBreakdown.find(item => item.CBGcode === cbg.CBGcode);
          if (!cbgEntry) {
            cbgEntry = {
              CBGcode: cbg.CBGcode,
              totalVisits: 0,
              visitsByPeriod: []
            };
            cbgBreakdown.push(cbgEntry);
          }
          
          cbgEntry.totalVisits += cbg.visits || 0;
          cbgEntry.visitsByPeriod.push({
            date: locationData.dates[index],
            visits: cbg.visits || 0
          });
        });
      });
    }

    cbgBreakdown.sort((a, b) => b.totalVisits - a.totalVisits);

    return {
      apiId: locationData.apiId,
      totalVisits: totalVisits,
      topCBGs: cbgBreakdown.slice(0, 10),
      allCBGs: cbgBreakdown
    };
  });

  return {
    ...cbgData,
    summary: results
  };
}

// Calculate leakage and patient distribution across competitors
function calculateLeakageAndDistribution(totalPatients, patientsRetained, timePeriod, competitors) {
  // Calculate active leakage percentage
  const activeLeakagePercent = ((totalPatients - patientsRetained) / totalPatients * 100).toFixed(1);
  
  // Leakage patients count
  const leakagePatients = totalPatients - patientsRetained;

  // Distribute leakage across competitors (with signal strength weighting if provided)
  const competitorsWithWeight = competitors.map((comp, index) => {
    const signal = comp.signalStrength ? parseFloat(comp.signalStrength) : 1;
    return {
      ...comp,
      weight: signal,
      index: index
    };
  });

  // Calculate total weight
  const totalWeight = competitorsWithWeight.reduce((sum, c) => sum + c.weight, 0);

  // Distribute patients to competitors based on weighted signal strength
  const results = competitorsWithWeight.map((comp) => {
    const proportion = comp.weight / totalWeight;
    const eventsToCompetitor = Math.round(leakagePatients * proportion);
    const competitorLeakagePercent = (eventsToCompetitor / totalPatients * 100).toFixed(1);

    return {
      primaryAddress: 'Primary Location',
      destination: comp.address,
      totalPatients: totalPatients,
      retained: patientsRetained,
      eventsToCompetitor: eventsToCompetitor,
      leakagePercent: competitorLeakagePercent
    };
  });

  return {
    primaryAddress: results[0]?.primaryAddress || 'Primary Location',
    totalPatients: totalPatients,
    patientsRetained: patientsRetained,
    activeLeakagePercent: activeLeakagePercent,
    timePeriod: timePeriod,
    totalCompetitors: competitors.length,
    results: results
  };
}

// API Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Calculate events endpoint (replaces analyze-manual)
app.post('/api/calculate-events', async (req, res) => {
  try {
    const { primaryAddress, totalPatients, patientsRetained, timePeriod, competitors } = req.body;

    // Validate input
    if (!primaryAddress || totalPatients === undefined || patientsRetained === undefined || !timePeriod) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: primaryAddress, totalPatients, patientsRetained, timePeriod'
      });
    }

    if (!Array.isArray(competitors) || competitors.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'At least one competitor address is required'
      });
    }

    const total = parseInt(totalPatients);
    const retained = parseInt(patientsRetained);

    if (total <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Total Patients Served must be greater than 0'
      });
    }

    if (retained < 0 || retained > total) {
      return res.status(400).json({
        success: false,
        error: `Patients Retained must be between 0 and ${total}`
      });
    }

    if (timePeriod < 1 || timePeriod > 24) {
      return res.status(400).json({
        success: false,
        error: 'Time Period must be between 1 and 24 months'
      });
    }

    // Filter out empty competitor addresses
    const validCompetitors = competitors.filter(c => c.address && c.address.trim());

    if (validCompetitors.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'At least one valid competitor address is required'
      });
    }

    // Calculate leakage distribution
    const analysis = calculateLeakageAndDistribution(
      total,
      retained,
      timePeriod,
      validCompetitors
    );

    res.json({
      success: true,
      data: analysis
    });

  } catch (error) {
    console.error('Error in calculate events:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to calculate patient leakage',
      message: error.message
    });
  }
});


// Upload and analyze CSV
app.post('/api/analyze', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        error: 'No file uploaded' 
      });
    }

    const filePath = req.file.path;
    
    // Parse and analyze the CSV
    const results = await parseCSV(filePath);

    // Clean up uploaded file
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      data: results,
      summary: {
        totalPrimaryAddresses: results.length,
        totalVisits: results.reduce((sum, item) => sum + item.totalVisits, 0)
      }
    });

  } catch (error) {
    console.error('Error processing file:', error);
    
    // Clean up file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      error: 'Failed to process CSV file',
      message: error.message
    });
  }
});

// Geocode addresses (batch)
app.post('/api/geocode', async (req, res) => {
  try {
    const { addresses } = req.body;

    if (!Array.isArray(addresses) || addresses.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'addresses array is required'
      });
    }

    if (addresses.length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Maximum 100 addresses per request'
      });
    }

    // Geocode all addresses
    const results = await Promise.all(
      addresses.map(addr => geocodeAddress(addr))
    );

    res.json({
      success: true,
      data: results.filter(r => r !== null)
    });

  } catch (error) {
    console.error('Geocoding error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to geocode addresses',
      message: error.message
    });
  }
});

// Get visits by CBGs from Placer.ai
app.post('/api/placer/visits-by-cbgs', async (req, res) => {
  try {
    const { apiIds, startDate, endDate, location, granularity, trafficVolPct } = req.body;

    if (!apiIds || !Array.isArray(apiIds) || apiIds.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'apiIds is required and must be a non-empty array'
      });
    }

    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        error: 'startDate and endDate are required (format: YYYY-MM-DD)'
      });
    }

    if (apiIds.length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Maximum 100 apiIds allowed per request'
      });
    }

    // Fetch data from Placer.ai
    const cbgData = await getVisitsByCBGs(apiIds, startDate, endDate, {
      location,
      granularity,
      trafficVolPct
    });

    // Calculate total visits and breakdown
    const processedData = calculateTotalVisits(cbgData);

    res.json({
      success: true,
      data: processedData
    });

  } catch (error) {
    console.error('Error fetching Placer data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch visits data',
      message: error.message
    });
  }
});

// Get location visits with address matching
app.post('/api/placer/location-visits', async (req, res) => {
  try {
    const { locations, startDate, endDate, granularity } = req.body;

    if (!locations || !Array.isArray(locations)) {
      return res.status(400).json({
        success: false,
        error: 'locations array is required'
      });
    }

    // Extract apiIds from locations
    const apiIds = locations.map(loc => loc.apiId).filter(id => id);

    if (apiIds.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No valid apiIds found in locations'
      });
    }

    // Fetch CBG data
    const cbgData = await getVisitsByCBGs(apiIds, startDate, endDate, {
      granularity: granularity || 'week'
    });

    const processedData = calculateTotalVisits(cbgData);

    // Match with original location data
    const results = locations.map(location => {
      const visitData = processedData.summary.find(s => s.apiId === location.apiId);
      return {
        ...location,
        visits: visitData ? visitData.totalVisits : 0,
        topCBGs: visitData ? visitData.topCBGs : []
      };
    });

    res.json({
      success: true,
      data: results,
      summary: {
        totalLocations: results.length,
        totalVisits: results.reduce((sum, loc) => sum + (loc.visits || 0), 0)
      }
    });

  } catch (error) {
    console.error('Error fetching location visits:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch location visits',
      message: error.message
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      success: false,
      error: 'File upload error',
      message: error.message
    });
  }
  
  res.status(500).json({
    success: false,
    error: 'Server error',
    message: error.message
  });
});

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`\nAPI endpoints:`);
  console.log(`  - POST http://localhost:${PORT}/api/calculate-events`);
  console.log(`  - POST http://localhost:${PORT}/api/analyze`);
  console.log(`  - POST http://localhost:${PORT}/api/geocode`);
  console.log(`  - POST http://localhost:${PORT}/api/placer/visits-by-cbgs`);
  console.log(`  - POST http://localhost:${PORT}/api/placer/location-visits`);
  console.log(`\nSet PLACER_API_KEY environment variable to use Placer.ai features`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  process.exit(0);
});