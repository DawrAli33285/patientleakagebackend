const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const userModel = require('./user');
const axios = require('axios');
const authRoutes = require('./routes/auth');
const connection = require('./connection/connection');
const footDataRoutes=require('./routes/footdata')
const { Parser } = require('json2csv');

const app = express();
require('dotenv').config()

const PORT = process.env.PORT || 3001;


// Placer.ai API configuration
const PLACER_API_KEY = process.env.PLACER_API_KEY || 'your-api-key-here';
const PLACER_BASE_URL = 'https://papi.placer.ai/v1';

connection;

// Middleware
app.use(cors());
app.use(express.json());
app.use(authRoutes);
app.use(footDataRoutes)

// Configure multer for file uploads
const upload = multer({
  dest: '/tmp/public/files/images',
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'));
    }
  }
});


const HNMIConfig = Object.freeze({
  conservativeAdj: 0.45,  // 45% reduction for conservative estimate
  expectedAdj: 0.35,      // 35% reduction for expected value
  upperAdj: 0.25,         // 25% reduction for upper bound
  defaultD: 0.20,         // Device duplication factor
  defaultS: 0.12,         // Signal sampling factor
  defaultN: 0.03,         // Non-human activity factor
  minAdj: 0.0,            // Minimum allowed adjustment
  maxAdj: 0.90            // Maximum allowed adjustment (never exceed 90%)
});


function validateHNMIConfig() {
  if (HNMIConfig.conservativeAdj <= HNMIConfig.expectedAdj) {
    throw new Error('HNMI Config Error: Conservative adjustment must be greater than expected adjustment');
  }
  if (HNMIConfig.expectedAdj <= HNMIConfig.upperAdj) {
    throw new Error('HNMI Config Error: Expected adjustment must be greater than upper bound adjustment');
  }
  if (HNMIConfig.maxAdj > 0.90) {
    throw new Error('HNMI Config Error: Maximum adjustment cannot exceed 90%');
  }
  console.log('✅ HNMI Configuration validated successfully');
}

// Run validation immediately
validateHNMIConfig();
function clamp(value, lo, hi) {
  return Math.max(lo, Math.min(value, hi));
}

function hnmiFromTotalAdjustment(rmc, totalAdj, cfg = HNMIConfig) {
  const adj = clamp(totalAdj, cfg.minAdj, cfg.maxAdj);
  return Math.round(rmc * (1 - adj));
}

function hnmiTiers(rmc, cfg = HNMIConfig) {
  return {
    conservative: hnmiFromTotalAdjustment(rmc, cfg.conservativeAdj, cfg),
    expected: hnmiFromTotalAdjustment(rmc, cfg.expectedAdj, cfg),
    upper_bound: hnmiFromTotalAdjustment(rmc, cfg.upperAdj, cfg)
  };
}

function hnmiPayload(rmc, cfg = HNMIConfig) {
  // ✅ Validate input
  if (typeof rmc !== 'number' || rmc < 0) {
    console.warn(`Invalid HNMI input: ${rmc}, defaulting to 0`);
    rmc = 0;
  }
  
  // Round to integer
  rmc = Math.round(rmc);
  
  const tiers = hnmiTiers(rmc, cfg);
  const expVal = tiers.expected;
  const bandLo = Math.round(expVal * 0.97);
  const bandHi = Math.round(expVal * 1.03);

  return {
    hnmi: {
      conservative: tiers.conservative,
      expected: tiers.expected,
      upper_bound: tiers.upper_bound,
      label_text: `Approximately ${bandLo.toLocaleString()}–${bandHi.toLocaleString()} normalized behavioral signals for this location and period.`
    },
    disclaimer: "HNMI is a normalized behavioral signal and does not represent unique individuals."
  };
}


// ============================================================================
// PLACER.AI API HELPER FUNCTIONS
// ============================================================================

// Helper: Retry logic for Placer.ai (handles 202 IN_PROGRESS responses)
async function fetchWithRetry(url, options, maxRetries = 10, delay = 3000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await axios(url, options);
      
      // 200 = Success with data
      if (response.status === 200) {
        return response.data;
      }
      
      // 202 = Report is being generated, retry
      if (response.status === 202) {
        console.log(`Report in progress, retry ${i + 1}/${maxRetries}...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      return response.data;
    } catch (error) {
      if (error.response?.status === 202) {
        console.log(`Report in progress (error branch), retry ${i + 1}/${maxRetries}...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  
  throw new Error('Report generation timeout - please try again later');
}

// Placer.ai: Search POI (GET /v1/poi)
async function searchPOI(options = {}) {
  try {
    const {
      query,
      lat,
      lng,
      radius = 1,
      category,
      subCategory,
      groupCategory,
      entityType = ['venue', 'complex'],
      limit = 10,
      skip = 0,
      includeFlaggedEntities = false
    } = options;

    // Build query parameters
    const params = new URLSearchParams();
    
    if (query) params.append('query', query);
    if (lat !== undefined) params.append('lat', lat);
    if (lng !== undefined) params.append('lng', lng);
    if (radius) params.append('radius', radius);
    if (category) params.append('category', category);
    if (subCategory) params.append('subCategory', subCategory);
    if (groupCategory) params.append('groupCategory', groupCategory);
    if (entityType && entityType.length > 0) {
      entityType.forEach(type => params.append('entityType', type));
    }
    if (limit) params.append('limit', limit);
    if (skip) params.append('skip', skip);
    if (includeFlaggedEntities) params.append('includeFlaggedEntities', 'true');

    const response = await axios.get(
      `${PLACER_BASE_URL}/poi?${params.toString()}`,
      {
        headers: {
          'x-api-key': PLACER_API_KEY
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('POI Search Error:', error.response?.data || error.message);
    throw new Error('Failed to search POI: ' + (error.response?.data?.message || error.message));
  }
}

// Placer.ai: Get Visit Trends (POST /v1/reports/visit-trends)
async function getVisitTrends(apiIds, startDate, endDate, granularity = 'week') {
  try {
    const data = await fetchWithRetry(
      `${PLACER_BASE_URL}/reports/visit-trends`,
      {
        method: 'POST',
        headers: {
          'x-api-key': PLACER_API_KEY,
          'Content-Type': 'application/json'
        },
        data: {
          apiIds: apiIds,
          startDate: startDate,
          endDate: endDate,
          granularity: granularity
        }
      }
    );
    
    return data;
  } catch (error) {
    console.error('Visit Trends Error:', error.response?.data || error.message);
    throw new Error('Failed to fetch visit trends: ' + (error.response?.data?.message || error.message));
  }
}

// Placer.ai: Get Visit Metrics Summary (POST /v1/reports/visit-metrics)
async function getVisitMetrics(apiIds, startDate, endDate, includeMetadata = false) {
  try {
    const data = await fetchWithRetry(
      `${PLACER_BASE_URL}/reports/visit-metrics`,
      {
        method: 'POST',
        headers: {
          'x-api-key': PLACER_API_KEY,
          'Content-Type': 'application/json'
        },
        data: {
          apiIds: apiIds,
          startDate: startDate,
          endDate: endDate,
          includeMetadata: includeMetadata
        }
      }
    );
    
    return data;
  } catch (error) {
    console.error('Visit Metrics Error:', error.response?.data || error.message);
    throw new Error('Failed to fetch visit metrics: ' + (error.response?.data?.message || error.message));
  }
}

// Placer.ai: Get Visits by CBGs (POST /v1/reports/visit-metrics-cbgs)
async function getVisitsByCBGs(apiIds, startDate, endDate, options = {}) {
  try {
    const data = await fetchWithRetry(
      `${PLACER_BASE_URL}/reports/visit-metrics-cbgs`,
      {
        method: 'POST',
        headers: {
          'x-api-key': PLACER_API_KEY,
          'Content-Type': 'application/json'
        },
        data: {
          apiIds: apiIds,
          startDate: startDate,
          endDate: endDate,
          location: options.location || 'Home',
          granularity: options.granularity || 'week',
          trafficVolPct: options.trafficVolPct || 70
        }
      }
    );
    
    return data;
  } catch (error) {
    console.error('Visits by CBGs Error:', error.response?.data || error.message);
    throw new Error('Failed to fetch CBG data: ' + (error.response?.data?.message || error.message));
  }
}

// Placer.ai: Get Favorite Places (POST /v1/reports/favorites-places)
async function getFavoritePlaces(apiId, startDate, endDate, options = {}) {
  try {
    const data = await fetchWithRetry(
      `${PLACER_BASE_URL}/reports/favorites-places`,
      {
        method: 'POST',
        headers: {
          'x-api-key': PLACER_API_KEY,
          'Content-Type': 'application/json'
        },
        data: {
          apiId: apiId,
          startDate: startDate,
          endDate: endDate,
          minVisitFrequency: options.minVisitFrequency || 1,
          category: options.category || undefined,
          subCategory: options.subCategory || undefined,
          groupCategory: options.groupCategory || undefined
        }
      }
    );
    
    return data;
  } catch (error) {
    console.error('Favorite Places Error:', error.response?.data || error.message);
    throw new Error('Failed to fetch favorite places: ' + (error.response?.data?.message || error.message));
  }
}

// Calculate visitor overlap using CBG data
// Calculate visitor overlap using CBG data
function calculateOverlapFromCBGs(primaryCBGData, competitorCBGData) {
  const primaryCBGs = new Map();
  const competitorCBGs = new Map();
  
  // Process primary location CBGs
  if (primaryCBGData.visitsByCBGs && primaryCBGData.visitsByCBGs[0]) {
    const primaryData = primaryCBGData.visitsByCBGs[0];
    if (primaryData.visitsByCBGsTrend) {
      primaryData.visitsByCBGsTrend.forEach(periodData => {
        periodData.forEach(cbg => {
          const current = primaryCBGs.get(cbg.CBGcode) || 0;
          primaryCBGs.set(cbg.CBGcode, current + (cbg.visits || 0));
        });
      });
    }
  }
  
  // Process competitor location CBGs
  if (competitorCBGData.visitsByCBGs && competitorCBGData.visitsByCBGs[0]) {
    const compData = competitorCBGData.visitsByCBGs[0];
    if (compData.visitsByCBGsTrend) {
      compData.visitsByCBGsTrend.forEach(periodData => {
        periodData.forEach(cbg => {
          const current = competitorCBGs.get(cbg.CBGcode) || 0;
          competitorCBGs.set(cbg.CBGcode, current + (cbg.visits || 0));
        });
      });
    }
  }
  
  // Calculate totals
  const primaryTotal = Array.from(primaryCBGs.values()).reduce((a, b) => a + b, 0);
  const competitorTotal = Array.from(competitorCBGs.values()).reduce((a, b) => a + b, 0);
  
  // Find overlapping CBGs
  let overlapVisits = 0;
  const sharedCBGs = [];
  
  primaryCBGs.forEach((primaryVisits, cbgCode) => {
    if (competitorCBGs.has(cbgCode)) {
      const competitorVisits = competitorCBGs.get(cbgCode);
      const overlap = Math.min(primaryVisits, competitorVisits);
      overlapVisits += overlap;
      sharedCBGs.push({
        cbgCode,
        primaryVisits,
        competitorVisits,
        overlapEstimate: overlap
      });
    }
  });
  
  // Calculate metrics
  const primaryOnlyVisits = primaryTotal - overlapVisits;
  const competitorOnlyVisits = competitorTotal - overlapVisits;
  
  const overlapPercent = primaryTotal > 0 ? (overlapVisits / primaryTotal * 100).toFixed(1) : 0;
  const primaryOnlyPercent = primaryTotal > 0 ? (primaryOnlyVisits / primaryTotal * 100).toFixed(1) : 0;
  const competitorOnlyPercent = competitorTotal > 0 ? (competitorOnlyVisits / competitorTotal * 100).toFixed(1) : 0;
  
  // ✅ Apply HNMI to all raw counts
  const primaryHNMI = hnmiPayload(Math.round(primaryTotal));
  const competitorHNMI = hnmiPayload(Math.round(competitorTotal));
  const overlapHNMI = hnmiPayload(Math.round(overlapVisits));
  const primaryOnlyHNMI = hnmiPayload(Math.round(primaryOnlyVisits));
  const competitorOnlyHNMI = hnmiPayload(Math.round(competitorOnlyVisits));

  // ✅ Return object with ONLY HNMI payloads, no raw counts
  return {
    // HNMI normalized values (what gets displayed)
    primaryTotal: primaryHNMI,
    competitorTotal: competitorHNMI,
    overlapSignals: overlapHNMI,
    primaryOnlySignals: primaryOnlyHNMI,
    competitorOnlySignals: competitorOnlyHNMI,
    
    // Percentages remain the same
    overlapPercent: parseFloat(overlapPercent),
    primaryOnlyPercent: parseFloat(primaryOnlyPercent),
    competitorOnlyPercent: parseFloat(competitorOnlyPercent),
    
    sharedCBGsCount: sharedCBGs.length,
    topSharedCBGs: sharedCBGs.sort((a, b) => b.overlapEstimate - a.overlapEstimate).slice(0, 10),
    
    // ✅ Add internal raw values object for directional flow calculation only
    _internal: {
      rawOverlap: Math.round(overlapVisits)
    }
  };
}


// ============================================================================
// NEW LOCATION COMPARE API ENDPOINTS
// ============================================================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Search POI endpoint
app.post('/api/placer/search-poi', async (req, res) => {
  try {
    const { 
      query,
      address,
      lat,
      lng,
      radius,
      category,
      subCategory,
      groupCategory,
      entityType,
      limit,
      skip,
      includeFlaggedEntities
    } = req.body;
    
    // If address is provided but no lat/lng, use query parameter
    const searchOptions = {
      query: query || address,
      lat,
      lng,
      radius: radius || 1,
      category,
      subCategory,
      groupCategory,
      entityType: entityType || ['venue', 'complex'],
      limit: limit || 10,
      skip: skip || 0,
      includeFlaggedEntities: includeFlaggedEntities || false
    };

    // Validate that at least one search parameter is provided
    if (!searchOptions.query && (lat === undefined || lng === undefined)) {
      return res.status(400).json({
        success: false,
        error: 'Either query/address or lat/lng coordinates are required'
      });
    }
    
    const results = await searchPOI(searchOptions);
    
    res.json({
      success: true,
      data: results.data || [],
      requestId: results.requestId
    });
    
  } catch (error) {
    console.error('Error searching POI:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search location',
      message: error.message
    });
  }
});

// Main Location Compare endpoint
app.post('/api/location-compare', async (req, res) => {
  try {
    const { 
      primaryLocation, 
      competitorLocations, 
      startDate, 
      endDate,
      granularity = 'week',
      dayOfWeek,
      timeOfDay
    } = req.body;
    
    // Validation
    if (!primaryLocation || !primaryLocation.apiId) {
      return res.status(400).json({
        success: false,
        error: 'Primary location with apiId is required'
      });
    }
    
    if (!Array.isArray(competitorLocations) || competitorLocations.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'At least one competitor location is required'
      });
    }
    
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        error: 'Start date and end date are required (format: YYYY-MM-DD)'
      });
    }
    
    const validCompetitors = competitorLocations.filter(c => c.apiId);
    if (validCompetitors.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No valid competitor locations with apiIds found'
      });
    }
    
    // Check for max 100 locations (Placer.ai limit)
    if (validCompetitors.length > 99) {
      return res.status(400).json({
        success: false,
        error: 'Maximum 99 competitors allowed (Placer.ai bulk limit is 100 including primary)'
      });
    }
    
    // Gather all apiIds
    const allApiIds = [primaryLocation.apiId, ...validCompetitors.map(c => c.apiId)];
    
    console.log('Fetching visit trends for all locations...');
    const visitTrends = await getVisitTrends(allApiIds, startDate, endDate, granularity);
    
    console.log('Fetching CBG data for primary location...');
    const primaryCBGData = await getVisitsByCBGs(
      [primaryLocation.apiId], 
      startDate, 
      endDate, 
      { granularity }
    );
    
    // Process each competitor
   // Fetch favorite places for primary location (to find Primary → Competitor flow)
console.log('Fetching favorite places for primary location...');
let primaryFavoritePlaces = null;
try {
  primaryFavoritePlaces = await getFavoritePlaces(
    primaryLocation.apiId,
    startDate,
    endDate,
    { minVisitFrequency: 1 }
  );
} catch (error) {
  console.warn('Could not fetch favorite places for primary:', error.message);
}

// Process each competitor
console.log('Processing competitors...');
const competitorAnalysis = await Promise.all(
  validCompetitors.map(async (competitor) => {
    try {
      // Get CBG data for this competitor
      const competitorCBGData = await getVisitsByCBGs(
        [competitor.apiId], 
        startDate, 
        endDate, 
        { granularity }
      );
      
      // Calculate overlap
      const overlap = calculateOverlapFromCBGs(primaryCBGData, competitorCBGData);
      
      // Extract visit trend data
      const competitorTrend = visitTrends.visitTrends?.find(
        t => t.apiId === competitor.apiId
      );
      
      // NEW: Fetch favorite places for competitor (to find Competitor → Primary flow)
      let competitorFavoritePlaces = null;
      try {
        competitorFavoritePlaces = await getFavoritePlaces(
          competitor.apiId,
          startDate,
          endDate,
          { minVisitFrequency: 1 }
        );
      } catch (error) {
        console.warn(`Could not fetch favorite places for ${competitor.name}:`, error.message);
      }
      
      // NEW: Calculate directional flow
     // Calculate raw overlap internally for directional flow

// NEW: Calculate directional flow
const directionalFlow = calculateDirectionalFlow(
  primaryLocation.apiId,
  competitor.apiId,
  primaryFavoritePlaces,
  competitorFavoritePlaces,
  overlap._internal.rawOverlap  // ✅ Access internal value
);
      
      return {
        location: competitor,
        signals: overlap.competitorTotal, // HNMI payload
        overlap: overlap,
        directionalFlow: directionalFlow,
        // ✅ Apply HNMI to competitor trend data
        trendData: competitorTrend?.trendData?.map(trend => ({
          date: trend.date,
          signals: hnmiPayload(trend.visits || 0)
        })) || []
      };
    } catch (error) {
      console.error(`Error analyzing competitor ${competitor.name}:`, error);
      return {
        location: competitor,
        error: error.message,
        signals:0,
        overlap: null,
        directionalFlow: null, // NEW
        trendData: []
      };
    }
  })
);

    // Extract primary location trend
    const primaryTrend = visitTrends.visitTrends?.find(
      t => t.apiId === primaryLocation.apiId
    );
    
    // Calculate primary total visits from CBG data
    let primaryTotalVisits = 0;
    if (primaryCBGData.visitsByCBGs && primaryCBGData.visitsByCBGs[0]) {
      const primaryData = primaryCBGData.visitsByCBGs[0];
      if (primaryData.visitsByCBGsTrend) {
        primaryData.visitsByCBGsTrend.forEach(periodData => {
          periodData.forEach(cbg => {
            primaryTotalVisits += cbg.visits || 0;
          });
        });
      }
    }
    
// Apply HNMI to primary total
const primaryHNMI = hnmiPayload(Math.round(primaryTotalVisits));
    
// Build response
const response = {
  success: true,
  data: {
    dateRange: {
      startDate,
      endDate,
      granularity,
      filters: {
        dayOfWeek: dayOfWeek || null,
        timeOfDay: timeOfDay || null
      }
    },
    primary: {
      location: primaryLocation,
      signals: primaryHNMI, // HNMI payload instead of totalVisits
      trendData: primaryTrend?.trendData?.map(trend => ({
        date: trend.date,
        signals: hnmiPayload(trend.visits || 0)
      })) || []
    },
    competitors: competitorAnalysis,
    summary: {
      totalCompetitors: validCompetitors.length,
      avgOverlapPercent: (
        competitorAnalysis
          .filter(c => c.overlap)
          .reduce((sum, c) => sum + c.overlap.overlapPercent, 0) / 
        Math.max(competitorAnalysis.filter(c => c.overlap).length, 1)
      ).toFixed(1),
      // Remove totalCompetitorVisits - violates HNMI requirements
    },
    disclaimer: "All signal counts are HNMI-normalized behavioral signals and do not represent unique individuals."
      }
    };
    
    res.json(response);
    
  } catch (error) {
    console.error('Error in location compare:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze locations',
      message: error.message
    });
  }
});


// Calculate directional visitor flow between two locations
function calculateDirectionalFlow(primaryApiId, competitorApiId, primaryFavorites, competitorFavorites, rawOverlap) {
  let primaryToCompetitor = null;
  let competitorToPrimary = null;
  
  // Check if competitor appears in primary's favorite places
  if (primaryFavorites && primaryFavorites.favoritePlaces) {
    const foundInPrimary = primaryFavorites.favoritePlaces.find(
      place => place.apiId === competitorApiId
    );
    
    if (foundInPrimary) {
      primaryToCompetitor = {
        signals: hnmiPayload(foundInPrimary.visits || 0),
        percentage: foundInPrimary.percentage || 0,
        rank: foundInPrimary.rank || null
      };
    }
  }
  
  // Check if primary appears in competitor's favorite places
  if (competitorFavorites && competitorFavorites.favoritePlaces) {
    const foundInCompetitor = competitorFavorites.favoritePlaces.find(
      place => place.apiId === primaryApiId
    );
    
    if (foundInCompetitor) {
      competitorToPrimary = {
        signals: hnmiPayload(foundInCompetitor.visits || 0),
        percentage: foundInCompetitor.percentage || 0,
        rank: foundInCompetitor.rank || null
      };
    }
  }
  
  return {
    primaryToCompetitor: primaryToCompetitor,
    competitorToPrimary: competitorToPrimary,
    bidirectional: primaryToCompetitor && competitorToPrimary,
    // ✅ Apply HNMI to shared signals instead of raw number
    totalSharedSignals: hnmiPayload(rawOverlap)
  };
}

// Export comparison to CSV
app.post('/api/location-compare/export', async (req, res) => {
  try {
    const { comparisonData, exportType = 'summary' } = req.body;
    
    if (!comparisonData) {
      return res.status(400).json({
        success: false,
        error: 'Comparison data is required'
      });
    }
    
    let csvData = [];
    
    if (exportType === 'summary') {
      comparisonData.competitors.forEach(comp => {
        if (comp.overlap) {
          csvData.push({
            date_range_start: comparisonData.dateRange.startDate,
            date_range_end: comparisonData.dateRange.endDate,
            primary_location_name: comparisonData.primary.location.name || 'Primary',
            primary_location_address: comparisonData.primary.location.address || '',
            competitor_location_name: comp.location.name || 'Competitor',
            competitor_location_address: comp.location.address || '',
            
            // ✅ HNMI normalized signals (all three tiers)
            primary_signals_conservative: comparisonData.primary.signals.hnmi.conservative,
            primary_signals_expected: comparisonData.primary.signals.hnmi.expected,
            primary_signals_upper: comparisonData.primary.signals.hnmi.upper_bound,
            
            competitor_signals_conservative: comp.signals.hnmi.conservative,
            competitor_signals_expected: comp.signals.hnmi.expected,
            competitor_signals_upper: comp.signals.hnmi.upper_bound,
            
            shared_signals_conservative: comp.overlap.overlapSignals.hnmi.conservative,
            shared_signals_expected: comp.overlap.overlapSignals.hnmi.expected,
            shared_signals_upper: comp.overlap.overlapSignals.hnmi.upper_bound,
            
            primary_only_signals_conservative: comp.overlap.primaryOnlySignals.hnmi.conservative,
            primary_only_signals_expected: comp.overlap.primaryOnlySignals.hnmi.expected,
            primary_only_signals_upper: comp.overlap.primaryOnlySignals.hnmi.upper_bound,
            
            competitor_only_signals_conservative: comp.overlap.competitorOnlySignals.hnmi.conservative,
            competitor_only_signals_expected: comp.overlap.competitorOnlySignals.hnmi.expected,
            competitor_only_signals_upper: comp.overlap.competitorOnlySignals.hnmi.upper_bound,
            
            // Percentages
            shared_signals_percent: comp.overlap.overlapPercent,
            shared_cbgs_count: comp.overlap.sharedCBGsCount,
            
            // ✅ Directional flow HNMI data
            primary_to_competitor_conservative: comp.directionalFlow?.primaryToCompetitor?.signals?.hnmi?.conservative || 'N/A',
            primary_to_competitor_expected: comp.directionalFlow?.primaryToCompetitor?.signals?.hnmi?.expected || 'N/A',
            primary_to_competitor_upper: comp.directionalFlow?.primaryToCompetitor?.signals?.hnmi?.upper_bound || 'N/A',
            
            competitor_to_primary_conservative: comp.directionalFlow?.competitorToPrimary?.signals?.hnmi?.conservative || 'N/A',
            competitor_to_primary_expected: comp.directionalFlow?.competitorToPrimary?.signals?.hnmi?.expected || 'N/A',
            competitor_to_primary_upper: comp.directionalFlow?.competitorToPrimary?.signals?.hnmi?.upper_bound || 'N/A',
            
            // ✅ Disclaimer
            disclaimer: "HNMI values are normalized behavioral signals and do not represent unique individuals"
          });
        }
      });
    }else if (exportType === 'detail') {
      const allTrendData = [];
      
      // Add primary trend data
      if (comparisonData.primary.trendData && comparisonData.primary.trendData.length > 0) {
        comparisonData.primary.trendData.forEach(trend => {
          allTrendData.push({
            date: trend.date,
            location_name: comparisonData.primary.location.name || 'Primary',
            location_address: comparisonData.primary.location.address || '',
            location_type: 'Primary',
            // ✅ HNMI ranges instead of single visits
            signals_conservative: trend.signals?.hnmi?.conservative || 0,
            signals_expected: trend.signals?.hnmi?.expected || 0,
            signals_upper: trend.signals?.hnmi?.upper_bound || 0,
            disclaimer: "HNMI normalized behavioral signals"
          });
        });
      }
      
      // Add competitor trend data
      comparisonData.competitors.forEach(comp => {
        if (comp.trendData && comp.trendData.length > 0) {
          comp.trendData.forEach(trend => {
            allTrendData.push({
              date: trend.date,
              location_name: comp.location.name || 'Competitor',
              location_address: comp.location.address || '',
              location_type: 'Competitor',
              // ✅ HNMI ranges
              signals_conservative: trend.signals?.hnmi?.conservative || 0,
              signals_expected: trend.signals?.hnmi?.expected || 0,
              signals_upper: trend.signals?.hnmi?.upper_bound || 0,
              disclaimer: "HNMI normalized behavioral signals"
            });
          });
        }
      });
      
      csvData = allTrendData;
    }
    
    if (csvData.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No data available for export'
      });
    }
    
    // Convert to CSV
    const parser = new Parser();
    const csv = parser.parse(csvData);
    
    // Set headers for download
    const timestamp = new Date().toISOString().split('T')[0];
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=location-comparison-${exportType}-${timestamp}.csv`);
    res.send(csv);
    
  } catch (error) {
    console.error('Error exporting CSV:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to export CSV',
      message: error.message
    });
  }
});

// ============================================================================
// ADDITIONAL PLACER.AI ENDPOINTS
// ============================================================================

// Get Visit Metrics Summary
app.post('/api/placer/visit-metrics', async (req, res) => {
  try {
    const { apiIds, startDate, endDate, includeMetadata } = req.body;
    
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
    
    const data = await getVisitMetrics(apiIds, startDate, endDate, includeMetadata || false);
    
    res.json({
      success: true,
      data: data
    });
    
  } catch (error) {
    console.error('Error fetching visit metrics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch visit metrics',
      message: error.message
    });
  }
});

// Get Favorite Places (Cross-shopping analysis)
app.post('/api/placer/favorite-places', async (req, res) => {
  try {
    const { apiId, startDate, endDate, minVisitFrequency, category, subCategory, groupCategory } = req.body;
    
    if (!apiId) {
      return res.status(400).json({
        success: false,
        error: 'apiId is required'
      });
    }
    
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        error: 'startDate and endDate are required (format: YYYY-MM-DD)'
      });
    }
    
    const data = await getFavoritePlaces(apiId, startDate, endDate, {
      minVisitFrequency: minVisitFrequency || 1,
      category,
      subCategory,
      groupCategory
    });
    
    res.json({
      success: true,
      data: data
    });
    
  } catch (error) {
    console.error('Error fetching favorite places:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch favorite places',
      message: error.message
    });
  }
});

// ============================================================================
// EXISTING LEGACY ENDPOINTS (PRESERVED)
// ============================================================================

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
              signals: hnmiPayload(count)  // ✅ HNMI PAYLOAD
            }))
            .sort((a, b) => b.signals.hnmi.expected - a.signals.hnmi.expected),
          totalSignals: hnmiPayload(Object.values(visits).reduce((a, b) => a + b, 0))  // ✅ HNMI PAYLOAD
        }));

        resolve(result);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

// Geocode address (fallback)
async function geocodeAddress(address) {
  try {
    const hash = Buffer.from(address).toString('base64').slice(0, 12);
    return { apiId: `api_${hash}`, address: address };
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

// Calculate total visits from CBG data
function calculateTotalVisits(cbgData) {
  if (!cbgData || !cbgData.visitsByCBGs) {
    return null;
  }

  const results = cbgData.visitsByCBGs.map(locationData => {
    let totalVisits = 0;  // ✅ ADD THIS BACK
    let cbgBreakdown = [];

    if (locationData.visitsByCBGsTrend) {
      locationData.visitsByCBGsTrend.forEach((periodData, index) => {
        periodData.forEach(cbg => {
          totalVisits += cbg.visits || 0;  // ✅ ADD THIS BACK
          
          let cbgEntry = cbgBreakdown.find(item => item.CBGcode === cbg.CBGcode);
          if (!cbgEntry) {
            cbgEntry = {
              CBGcode: cbg.CBGcode,
              visitsByPeriod: []
            };
            cbgBreakdown.push(cbgEntry);
          }
          
          cbgEntry.visitsByPeriod.push({
            date: locationData.dates[index],
            signals: hnmiPayload(cbg.visits || 0)  // ✅ ADD HNMI HERE
          });
        });
      });
    }

    // Remove this sort or sort by CBGcode instead
    // cbgBreakdown.sort((a, b) => b.totalVisits - a.totalVisits);

    const hnmiData = hnmiPayload(totalVisits);  // ✅ NOW THIS WORKS
    
    return {
      apiId: locationData.apiId,
      ...hnmiData,
      allCBGs: cbgBreakdown
    };
  });

  return {
    ...cbgData,
    summary: results
  };
}
// Calculate leakage and patient distribution
function calculateLeakageAndDistribution(totalPatients, patientsRetained, timePeriod, competitors) {
  const activeLeakagePercent = ((totalPatients - patientsRetained) / totalPatients * 100).toFixed(1);
  const leakagePatients = totalPatients - patientsRetained;

  const competitorsWithWeight = competitors.map((comp, index) => {
    const signal = comp.signalStrength ? parseFloat(comp.signalStrength) : 1;
    return {
      ...comp,
      weight: signal,
      index: index
    };
  });

  const totalWeight = competitorsWithWeight.reduce((sum, c) => sum + c.weight, 0);

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

// Calculate events endpoint
app.post('/api/calculate-events', async (req, res) => {
  try {
    const { primaryAddress, totalPatients, patientsRetained, timePeriod, competitors } = req.body;

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

    const validCompetitors = competitors.filter(c => c.address && c.address.trim());

    if (validCompetitors.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'At least one valid competitor address is required'
      });
    }

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
    const results = await parseCSV(filePath);
    fs.unlinkSync(filePath);

    res.json({
      success: true,
      data: results,
      summary: {
        totalPrimaryAddresses: results.length,
     
      }
    });

  } catch (error) {
    console.error('Error processing file:', error);
    
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

    const cbgData = await getVisitsByCBGs(apiIds, startDate, endDate, {
      location,
      granularity,
      trafficVolPct
    });

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

    const apiIds = locations.map(loc => loc.apiId).filter(id => id);

    if (apiIds.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'No valid apiIds found in locations'
      });
    }

    const cbgData = await getVisitsByCBGs(apiIds, startDate, endDate, {
      granularity: granularity || 'week'
    });

    const processedData = calculateTotalVisits(cbgData);

    const results = locations.map(location => {
      const visitData = processedData.summary.find(s => s.apiId === location.apiId);
      return {
        ...location,
        signals: visitData || null, // Full HNMI payload
       
      };
    });

    res.json({
      success: true,
      data: results,
      summary: {
        totalLocations: results.length
        // Removed totalVisits - violates HNMI requirements
      },
      disclaimer: "All signal counts are HNMI-normalized behavioral signals and do not represent unique individuals."
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
const uploadsDir = '/tmp/public/files/images';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Start server
app.listen(PORT, () => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`${'='.repeat(60)}\n`);
  
  console.log(`📍 LOCATION COMPARE API ENDPOINTS:`);
  console.log(`  POST /api/placer/search-poi`);
  console.log(`  POST /api/location-compare`);
  console.log(`  POST /api/location-compare/export\n`);
  
  console.log(`📊 PLACER.AI REPORTS:`);
  console.log(`  POST /api/placer/visit-metrics`);
  console.log(`  POST /api/placer/visits-by-cbgs`);
  console.log(`  POST /api/placer/favorite-places`);
  console.log(`  POST /api/placer/location-visits\n`);
  
  console.log(`🏥 LEGACY ENDPOINTS:`);
  console.log(`  POST /api/calculate-events`);
  console.log(`  POST /api/analyze`);
  console.log(`  POST /api/geocode\n`);
  
  console.log(`⚙️  SYSTEM:`);
  console.log(`  GET  /api/health\n`);
  
  console.log(`${'='.repeat(60)}`);
  console.log(`⚠️  Set PLACER_API_KEY environment variable`);
  console.log(`${'='.repeat(60)}\n`);
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