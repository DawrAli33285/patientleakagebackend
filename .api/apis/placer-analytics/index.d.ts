import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core';
import Oas from 'oas';
import APICore from 'api/dist/core';
declare class SDK {
    spec: Oas;
    core: APICore;
    constructor();
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config: ConfigOptions): void;
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values: string[] | number[]): this;
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url: string, variables?: {}): void;
    /**
     * This service returns a list of Placer managed entities in a particular area. You can
     * search based on any combination of the following filter parameters:<br/> entities within
     * a specific location radius, entities associated with a specific group
     * category/category/sub category, entity name or type.<br/> The response lists the matched
     * entities, including address and location, zip code, group category, category
     * ,sub-category and a link to Placer dashboard.<br/> The service supports pagination using
     * the skip parameter. The first 1000 entities matching the criteria of the request are
     * available.<br/> For available categories, see <a
     * href=https://view-su2.highspot.com/viewer/87b4c810b4bc52f78f8fd2862fdf31dd>listed
     * categories</a>.</br></br> <b>Note</b> that when using the radius parameter, the actual
     * area being considered for searching POIs is the area within a square that is bounding
     * the circle, which is defined by the requested radius.</br> <b>Please note:</b> In case
     * you receive results where the isPermitted attribute is set to “false”, that means that
     * you are not permitted to run reports for those. In case you wish to extend your
     * permissions please contact <a href="mailto:support@placer.ai">customer support</a>.
     *
     * @summary Search for Placer Entities
     * @throws FetchError<400, types.GetV1PoiResponse400> 400 Bad Request
     * @throws FetchError<403, types.GetV1PoiResponse403> 403 Permission Denied
     * @throws FetchError<500, types.GetV1PoiResponse500> 500 Internal Server Error
     */
    getV1Poi(metadata?: types.GetV1PoiMetadataParam): Promise<FetchResponse<200, types.GetV1PoiResponse200>>;
    /**
     * Returns a list of sub-entities for given api ID. Sub-entities can be associated with
     * <<glossary:Complexes>>, <<glossary:Chains>> and <<glossary:Tags>> .
     * <<glossary:Complexes>> and <<glossary:Chains>> contain venues as their sub-entities
     * while <<glossary:Tags>>  may have venues, <<glossary:Complexes>> or
     * <<glossary:Chains>><br/><br/> <strong> &#10045; This service supports chain level
     * requests</strong>.
     *
     * @summary Get Sub-Entities for a complex, a chain or a tag
     * @throws FetchError<400, types.GetV1PoiIdEntitiesResponse400> 400 Bad Request
     * @throws FetchError<403, types.GetV1PoiIdEntitiesResponse403> 403 Permission Denied
     * @throws FetchError<404, types.GetV1PoiIdEntitiesResponse404> 404 Item not found
     * @throws FetchError<500, types.GetV1PoiIdEntitiesResponse500> 500 Internal Server Error
     */
    getV1PoiIdEntities(metadata: types.GetV1PoiIdEntitiesMetadataParam): Promise<FetchResponse<200, types.GetV1PoiIdEntitiesResponse200>>;
    /**
     * Returns a list of entities for a given account.The response will include all entities
     * which are under the Property tag (i.e. Portfolio).
     *
     * @summary Get Listed Entities for Account.
     * @throws FetchError<403, types.GetV1PoiMyPropertiesResponse403> 403 Permission Denied
     * @throws FetchError<500, types.GetV1PoiMyPropertiesResponse500> 500 Internal Server Error
     */
    getV1PoiMyProperties(): Promise<FetchResponse<200, types.GetV1PoiMyPropertiesResponse200>>;
    /**
     * Retrieves visitors and visits for a given list of entities. <br/>This endpoint supports
     * bulk requests up to 100 entities<br/><br/><strong>&#x21e1; This service supports bulk
     * request</strong><br/> When nearbyRadius is set, a report will be generated for the first
     * entity in the array <strong>only</strong>.<br/> <br/> &#x23F1; <strong>Average measured
     * processing time: 10 seconds </strong><br/> For more information on request retries best
     * practices and processing measurements you may visit <a
     * href=https://docs.placer.ai/reference/measurements> this</a> page<br/> <br/> &#128205;
     * This service supports the <<glossary:Nearby Activity report>>. Once setting a value to
     * the nearbyRadius parameter, the report will be generated based on the nearby activity
     * logic<br/><br/>
     *
     * @summary Visit Metrics Summary Report
     * @throws FetchError<400, types.PostV1ReportsVisitMetricsResponse400> 400 Bad Request
     * @throws FetchError<403, types.PostV1ReportsVisitMetricsResponse403> 403 Permission Denied
     * @throws FetchError<500, types.PostV1ReportsVisitMetricsResponse500> 500 Internal Server Error
     */
    postV1ReportsVisitMetrics(body: types.PostV1ReportsVisitMetricsBodyParam): Promise<FetchResponse<200, types.PostV1ReportsVisitMetricsResponse200> | FetchResponse<202, types.PostV1ReportsVisitMetricsResponse202> | FetchResponse<207, types.PostV1ReportsVisitMetricsResponse207>>;
    /**
     * Retrieves visits for a given entity(venue/complex) broken by the hours of the day and
     * its business opening hours.<br/> <br/>The response includes:<br/> <ul> <li>2 arrays:
     * <ol> <li>Hour of the day bins:
     * [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], where each represents
     * an hour in the day. (e.g. 11 = 11 am - 12 pm)</li> <li>Estimated foot traffic array:
     * Indicates the total visits for the POI during the selected date range for each of the
     * hour bins (correlated to the location in the Hour of the day array)</li> </ol> </li>
     * <li> Array of the business opening hours for each day of the week. </li> </ul> <br/>
     * &#x23F1; <strong>Average measured processing time: 0.79 seconds </strong><br/> For more
     * information on request retries best practices and processing measurements you may visit
     * <a href=https://docs.placer.ai/reference/measurements> this</a> page<br/><br/>
     * &#128205; This service supports the <<glossary:Nearby Activity report>>. Once setting a
     * value to the nearbyRadius parameter, the report will be generated based on the nearby
     * activity logic.
     *
     * @summary Visits by Hours Report
     * @throws FetchError<400, types.PostV1ReportsVisitMetricsHoursResponse400> 400 Bad Request
     * @throws FetchError<403, types.PostV1ReportsVisitMetricsHoursResponse403> 403 Permission Denied
     * @throws FetchError<500, types.PostV1ReportsVisitMetricsHoursResponse500> 500 Internal Server Error
     */
    postV1ReportsVisitMetricsHours(body: types.PostV1ReportsVisitMetricsHoursBodyParam): Promise<FetchResponse<200, types.PostV1ReportsVisitMetricsHoursResponse200> | FetchResponse<202, types.PostV1ReportsVisitMetricsHoursResponse202> | FetchResponse<204, types.PostV1ReportsVisitMetricsHoursResponse204> | FetchResponse<207, types.PostV1ReportsVisitMetricsHoursResponse207>>;
    /**
     * Retrieves visits for a given entity(venue/complex/billboard) broken by the days of the
     * week.<br/> <br/>The response includes 2 arrays:<br/> <ol> <li>Day of the week bins :
     * [0,1,2,3,4,5,6], where each represents a day of the week. (i.e. Mon.-Sun.).</li>
     * <li>Indicates the total visits for the POI during the selected date range for each of
     * the day of the week bins (correlated to the location in the Day of the week array)</li>
     * </ol> <br/> &#x23F1; <strong>Average measured processing time: 0.72 seconds
     * </strong><br/> For more information on request retries best practices and processing
     * measurements you may visit <a href=https://docs.placer.ai/reference/measurements>
     * this</a> page<br/><br/>
     * &#128205; This service supports the <<glossary:Nearby Activity report>>. Once setting a
     * value to the nearbyRadius parameter, the report will be generated based on the nearby
     * activity logic.
     *
     * @summary Visits by Days Report
     * @throws FetchError<400, types.PostV1ReportsVisitMetricsDaysResponse400> 400 Bad Request
     * @throws FetchError<403, types.PostV1ReportsVisitMetricsDaysResponse403> 403 Permission Denied
     * @throws FetchError<500, types.PostV1ReportsVisitMetricsDaysResponse500> 500 Internal Server Error
     */
    postV1ReportsVisitMetricsDays(body: types.PostV1ReportsVisitMetricsDaysBodyParam): Promise<FetchResponse<200, types.PostV1ReportsVisitMetricsDaysResponse200> | FetchResponse<202, types.PostV1ReportsVisitMetricsDaysResponse202> | FetchResponse<204, types.PostV1ReportsVisitMetricsDaysResponse204> | FetchResponse<207, types.PostV1ReportsVisitMetricsDaysResponse207>>;
    /**
     * Retrieves visits for a given entity(venue/complex) broken by dwell time periods.<br/>
     * <br/>The response includes:<br/> <ol> <li>Dwell time bins array:
     * [0,5,15,30,45,60,75,90,105,120,135,150] (I.e. 5 represents 5-14 minutes, 150 represents
     * all visits with dwell time higher than or equal to 150)</li> <li>Estimated foot traffic
     * array: Indicates the total visits for the POI during the selected date range for each of
     * the dwell time bins (correlated to the location in the dwell time bins array)</li>
     * <li>Average dwell time</li> <li>Median dwell time</li> </ol> <br/> &#x23F1;
     * <strong>Average measured processing time: 0.77 seconds </strong><br/> For more
     * information on request retries best practices and processing measurements you may visit
     * <a href=https://docs.placer.ai/reference/measurements> this</a> page<br/><br/>
     * &#128205; This service supports the <<glossary:Nearby Activity report>>. Once setting a
     * value to the nearbyRadius parameter, the report will be generated based on the nearby
     * activity logic.
     *
     * @summary Visits by Dwell Time Report
     * @throws FetchError<400, types.PostV1ReportsVisitMetricsDwellTimeResponse400> 400 Bad Request
     * @throws FetchError<403, types.PostV1ReportsVisitMetricsDwellTimeResponse403> 403 Permission Denied
     * @throws FetchError<500, types.PostV1ReportsVisitMetricsDwellTimeResponse500> 500 Internal Server Error
     */
    postV1ReportsVisitMetricsDwellTime(body: types.PostV1ReportsVisitMetricsDwellTimeBodyParam): Promise<FetchResponse<200, types.PostV1ReportsVisitMetricsDwellTimeResponse200> | FetchResponse<202, types.PostV1ReportsVisitMetricsDwellTimeResponse202> | FetchResponse<204, types.PostV1ReportsVisitMetricsDwellTimeResponse204> | FetchResponse<207, types.PostV1ReportsVisitMetricsDwellTimeResponse207>>;
    /**
     * This service populates a report of the CBGs that generate visitation to the properties
     * examined. You may assess visitations per each CBG. You may also determine the desired
     * data granularity.<br/><br/> <strong>&#x21e1; This service supports bulk
     * request</strong><br/><br/> <strong>&#128205; This service doesn't support custom POI.
     * </strong><br/><br/> * <strong>Please note</strong> that sparsely populated CBGs may not
     * be included in the feed to align with Placer's privacy policy.<br/><br/> For more
     * information on request retries best practices and  processing measurements you may visit
     * <a href=https://docs.placer.ai/reference/measurements> this</a> page
     *
     * @summary Visit by CBGs Report
     * @throws FetchError<400, types.PostV1ReportsVisitMetricsCbgsResponse400> 400 Bad Request
     * @throws FetchError<403, types.PostV1ReportsVisitMetricsCbgsResponse403> 403 Permission Denied
     * @throws FetchError<500, types.PostV1ReportsVisitMetricsCbgsResponse500> 500 Internal Server Error
     */
    postV1ReportsVisitMetricsCbgs(body: types.PostV1ReportsVisitMetricsCbgsBodyParam): Promise<FetchResponse<200, types.PostV1ReportsVisitMetricsCbgsResponse200> | FetchResponse<202, types.PostV1ReportsVisitMetricsCbgsResponse202>>;
    /**
     * Retrieves visitations for a given list of entities in daily, weekly or monthly
     * granularity.<br/><br/> <strong>&#x21e1; This service supports bulk
     * request</strong><br/><br/> <strong> &#10045; This service supports chain level
     * requests</strong><br/><br/> &#x23F1; <strong>Average measured processing time: 3.58
     * seconds </strong><br><br> <strong>&#128205; This service doesn't support custom POI. To
     * pull visits trend for custom POI please use <a
     * href=https://docs.placer.ai/reference/post_v1-reports-visit-trends-single>Visit Trends
     * Report for a Single Property </a> endpoint. </strong><br/><br/>
     * For more information on request retries best practices and   processing measurements you
     * may visit <a href=https://docs.placer.ai/reference/measurements> this</a> page
     *
     * @summary Visit Trends Report
     * @throws FetchError<400, types.PostV1ReportsVisitTrendsResponse400> 400 Bad Request
     * @throws FetchError<403, types.PostV1ReportsVisitTrendsResponse403> 403 Permission Denied
     * @throws FetchError<500, types.PostV1ReportsVisitTrendsResponse500> 500 Internal Server Error
     */
    postV1ReportsVisitTrends(body: types.PostV1ReportsVisitTrendsBodyParam): Promise<FetchResponse<200, types.PostV1ReportsVisitTrendsResponse200> | FetchResponse<202, types.PostV1ReportsVisitTrendsResponse202> | FetchResponse<207, types.PostV1ReportsVisitTrendsResponse207>>;
    /**
     * Retrieves visits for a given entity in daily, weekly or monthly granularity.<br/><br/>
     * For more information on request retries best practices and   processing measurements you
     * may visit <a href=https://docs.placer.ai/reference/measurements> this</a> page
     *
     * @summary Visit Trends Report for a Single Property
     * @throws FetchError<400, types.PostV1ReportsVisitTrendsSingleResponse400> 400 Bad Request
     * @throws FetchError<403, types.PostV1ReportsVisitTrendsSingleResponse403> 403 Permission Denied
     * @throws FetchError<500, types.PostV1ReportsVisitTrendsSingleResponse500> 500 Internal Server Error
     */
    postV1ReportsVisitTrendsSingle(body: types.PostV1ReportsVisitTrendsSingleBodyParam): Promise<FetchResponse<200, types.PostV1ReportsVisitTrendsSingleResponse200> | FetchResponse<202, types.PostV1ReportsVisitTrendsSingleResponse202>>;
    /**
     * This service enables you to learn about the frequency of visitations to the requested
     * POI.<br/> Insights are provided for all the below types of metrics, bucketed into
     * visitations frequency bins (i.e. 1, 2, 3, …30+  visits per visitor):<br/> <ul>
     * <li><strong>Visitors</strong> - The estimated number of unique visitors to the POI</li>
     * <li><strong>% of Visitors</strong> - The % of unique visitors that visited the POI</li>
     * <li><strong>Visits</strong> - The estimated number of visits to the POI</li>
     * <li><strong>% of Visits</strong> - The % of visits generated by visitors to the POI
     * </li> </ul> <br/><br/> &#128205; This service supports the <<glossary:Nearby Activity
     * report>>. Once setting a value to the nearbyRadius parameter, the report will be
     * generated based on the nearby activity logic.
     *
     * @summary Visits by Frequency Report
     * @throws FetchError<400, types.PostV1ReportsLoyaltyVisitsFrequencyResponse400> 400 Bad Request
     * @throws FetchError<403, types.PostV1ReportsLoyaltyVisitsFrequencyResponse403> 403 Permission Denied
     * @throws FetchError<500, types.PostV1ReportsLoyaltyVisitsFrequencyResponse500> 500 Internal Server Error
     */
    postV1ReportsLoyaltyVisitsFrequency(body: types.PostV1ReportsLoyaltyVisitsFrequencyBodyParam): Promise<FetchResponse<200, types.PostV1ReportsLoyaltyVisitsFrequencyResponse200> | FetchResponse<202, types.PostV1ReportsLoyaltyVisitsFrequencyResponse202>>;
    /**
     * True Trade Areas are calculated by the volume of traffic reaching the venue or complex .
     * For example, setting 'traffic vol' to 70% draws a polygon that represents 70% of the
     * visitors’ home location.<br/> <br/> &#x23F1; <strong>Average measured processing time:
     * 2.24 seconds </strong><br/> For more information on request retries best practices and
     * processing measurements you may visit <a
     * href=https://docs.placer.ai/reference/measurements> this</a> page<br/><br/>
     * &#128205; This service supports the <<glossary:Nearby Activity report>>. Once setting a
     * value to the nearbyRadius parameter, the report will be generated based on the nearby
     * activity logic.
     *
     * @summary Trade Area Report
     * @throws FetchError<400, types.PostV1ReportsTrueTradeAreaResponse400> 400 Bad Request
     * @throws FetchError<403, types.PostV1ReportsTrueTradeAreaResponse403> 403 Permission Denied
     * @throws FetchError<500, types.PostV1ReportsTrueTradeAreaResponse500> 500 Internal Server Error
     */
    postV1ReportsTrueTradeArea(body: types.PostV1ReportsTrueTradeAreaBodyParam): Promise<FetchResponse<200, types.PostV1ReportsTrueTradeAreaResponse200> | FetchResponse<202, types.PostV1ReportsTrueTradeAreaResponse202>>;
    /**
     * This service lets you retrieve the trade area polygon calculated for a specified drive
     * time.<br/><br/>
     * &#128205; This service supports the <<glossary:Nearby Activity report>>. Once setting a
     * value to the nearbyRadius parameter, the report will be generated based on the nearby
     * activity logic.
     *
     * @summary Trade Area by Drive Time Report
     * @throws FetchError<400, types.PostV1ReportsTradeAreaDriveTimeResponse400> 400 Bad Request
     * @throws FetchError<403, types.PostV1ReportsTradeAreaDriveTimeResponse403> 403 Permission Denied
     * @throws FetchError<500, types.PostV1ReportsTradeAreaDriveTimeResponse500> 500 Internal Server Error
     */
    postV1ReportsTradeAreaDriveTime(body: types.PostV1ReportsTradeAreaDriveTimeBodyParam): Promise<FetchResponse<200, types.PostV1ReportsTradeAreaDriveTimeResponse200> | FetchResponse<202, types.PostV1ReportsTradeAreaDriveTimeResponse202>>;
    /**
     * Returns the true trade area population (potential) demographics based on visitors' homes
     * CBGs.<br/> Supported datasets to use are:<br/> <ul> <li>Census (2023)</li> <li>STI:
     * Popstats (2024)</li> <li>STI: Landscape</li> <li>STI: Market Outlook</li> <li>STI:
     * Spending Patterns</li> <li>STI: Workplace</li> <li>Spatial.ai:PersonaLive</li>
     * <li>Spatial.ai:FollowGraph</li> <li>Experian:Mosaic</li> </ul> <br/>Datasets are
     * available based on your account's settings<br/><br/> &#x23F1; <strong>Average measured
     * processing time: 1.58 seconds </strong><br/> For more information on request retries
     * best practices and   processing measurements you may visit <a
     * href=https://docs.placer.ai/reference/measurements> this</a> page<br/><br/>
     * NOTE: <<glossary:Flagged entities>> will not be taken into consideration in the
     * resulting report<br/><br/>
     * &#128205; This service supports the <<glossary:Nearby Activity report>>. Once setting a
     * value to the nearbyRadius parameter, the report will be generated based on the nearby
     * activity logic.
     *
     * @summary Trade Area Demographics Profile Report
     * @throws FetchError<400, types.PostV1ReportsTradeAreaDemographicsResponse400> 400 Bad Request
     * @throws FetchError<401, types.PostV1ReportsTradeAreaDemographicsResponse401> 401 Unauthrized dataset error
     * @throws FetchError<403, types.PostV1ReportsTradeAreaDemographicsResponse403> 403 Permission Denied
     * @throws FetchError<500, types.PostV1ReportsTradeAreaDemographicsResponse500> 500 Internal Server Error
     */
    postV1ReportsTradeAreaDemographics(body: types.PostV1ReportsTradeAreaDemographicsBodyParam): Promise<FetchResponse<200, types.PostV1ReportsTradeAreaDemographicsResponse200> | FetchResponse<202, types.PostV1ReportsTradeAreaDemographicsResponse202> | FetchResponse<204, types.PostV1ReportsTradeAreaDemographicsResponse204>>;
    /**
     * This service returns the specific entity <<glossary:Ranking>> within a selected scope
     * :<br/> <ul> <li>Chain scope - compares the entity <<glossary:Ranking>> vs all other
     * chain’s entities</li> <li>Group category scope - compares the entity
     * <<glossary:Ranking>> vs all venues under the selected group category (Apparel, Leisure,
     * …).</li> <li>Category scope - compares the entity <<glossary:Ranking>> vs all venues
     * under the selected category (Regional Mall, Industrial, …).</li> </ul> </br> The
     * endpoint supports the option to have a custom date range (as well as pre-defined time
     * buckets) and <<glossary:Ranking>> within a local area ( 5,10,15 miles). <br/> &#x23F1;
     * <strong>Average measured processing time: 8.57 seconds </strong><br/> For more
     * information on request retries best practices and   processing measurements you may
     * visit <a href=https://docs.placer.ai/reference/measurements> this</a> page<br/><br/>
     * NOTE: <<glossary:Flagged entities>> will not be taken into consideration in the
     * resulting report.
     *
     * @summary Ranking Metrics for a Single Property
     * @throws FetchError<400, types.PostV1ReportsRankingOverviewResponse400> 400 Bad Request
     * @throws FetchError<403, types.PostV1ReportsRankingOverviewResponse403> 403 Permission Denied
     * @throws FetchError<500, types.PostV1ReportsRankingOverviewResponse500> 500 Internal Server Error
     */
    postV1ReportsRankingOverview(body: types.PostV1ReportsRankingOverviewBodyParam): Promise<FetchResponse<200, types.PostV1ReportsRankingOverviewResponse200> | FetchResponse<202, types.PostV1ReportsRankingOverviewResponse202>>;
    /**
     * Returns the <<glossary:Ranking>> for all the requested entities within a selected scope
     * :<br/> <ul> <li> Chain scope - compares each entity <<glossary:Ranking>> vs all other
     * chain’s entities.</li> <li>Group category scope - compares each entity
     * <<glossary:Ranking>> vs all venues under the selected group category (Apparel, Leisure,
     * …).</li> <li>Category scope - compares each entity <<glossary:Ranking>> vs all venues
     * under the selected category (Regional Mall, Industrial, …).</li> </ul> The service
     * supports <<glossary:Ranking>> based on pre-defined periods. (In case a custom date range
     * is required use /reports/ranking-overview endpoint).<br/><br/><strong>&#x21e1; This
     * service supports bulk request</strong><br/>
     *
     * &#x23F1; <strong>Average measured processing time: 3.58 seconds </strong><br/> For more
     * information on request retries best practices and   processing measurements you may
     * visit <a href=https://docs.placer.ai/reference/measurements> this</a> page<br/><br/>
     * NOTE: <<glossary:Flagged entities>> will not be taken into consideration in the
     * resulting report
     *
     * @summary Ranking Metrics For Multiple Properties
     * @throws FetchError<400, types.PostV1ReportsRankingOverviewMultiResponse400> 400 Bad Request
     * @throws FetchError<403, types.PostV1ReportsRankingOverviewMultiResponse403> 403 Permission Denied
     * @throws FetchError<500, types.PostV1ReportsRankingOverviewMultiResponse500> 500 Internal Server Error
     */
    postV1ReportsRankingOverviewMulti(body: types.PostV1ReportsRankingOverviewMultiBodyParam): Promise<FetchResponse<200, types.PostV1ReportsRankingOverviewMultiResponse200>>;
    /**
     * Generate a ranked list of properties relative to a benchmark based on the one of
     * following segments:<br/> <ul> <li>Within Chain - ability to reach all chain’s venues
     * ranked from the top most to the last using pagination.</li> <li>Within Category/Group
     * Category - ability to fetch up to 1000 top ranked properties within the same
     * Category/group category of the requested property.</li> </ul> Provides view by different
     * metrics and regions.<br/> Metrics<br/> <ul> <li>Visits: shows the <<glossary:Ranking>>
     * according to the estimated number of visits to the POI.</li> <li>Visits / Sq ft: shows
     * the <<glossary:Ranking>> according to the estimated number of visits relative to the
     * total square footage of a property.</li> </ul> Regions<br/> <ul> <li>nationwide: The
     * nationwide <<glossary:Ranking>> of a POI benchmarked against POIs from the same category
     * or chain.</li> <li>state/dma/cbsa: The ranking benchmarked against POIs from the same
     * category or chain in the POI's state/dma/cbsa.</li> <li>Specific distance: The POI’s
     * <<glossary:Ranking>> benchmarked against POIs from within a 5 / 10 / 15 / 30 / 50 miles
     * radius.</li> </ul><br/><br/> &#x23F1; <strong>Average measured processing time: 2.71
     * seconds </strong><br/> For more information on request retries best practices and
     * processing measurements you may visit <a
     * href=https://docs.placer.ai/reference/measurements> this</a> page<br/><br/>
     * NOTE: <<glossary:Flagged entities>> will not be taken into consideration in the
     * resulting report.
     *
     * @summary Ranking Index - Top Ranked
     * @throws FetchError<400, types.PostV1ReportsRankingIndexTopRankingResponse400> 400 Bad Request
     * @throws FetchError<403, types.PostV1ReportsRankingIndexTopRankingResponse403> 403 Permission Denied
     * @throws FetchError<500, types.PostV1ReportsRankingIndexTopRankingResponse500> 500 Internal Server Error
     */
    postV1ReportsRankingIndexTopRanking(body: types.PostV1ReportsRankingIndexTopRankingBodyParam): Promise<FetchResponse<200, types.PostV1ReportsRankingIndexTopRankingResponse200>>;
    /**
     * This endpoint generates a ranked list of properties relative to a benchmark based on the
     * one of following segments:<br/> <ul> <li>Within Chain - Provides other closely ranked
     * venues within the same chain.</li> <li>category - provides the <<glossary:Ranking>>
     * within the venue’s category</li> <li>Within Category/Group Category - Provides other
     * closely ranked venues within the same category/group category.</li> </ul> Provides view
     * by different metrics and regions.<br/> Metrics:<br/> <ul> <li>Visits: shows the
     * <<glossary:Ranking>> according to the estimated number of visits to the POI.</li>
     * <li>Visits / Sq ft: shows the <<glossary:Ranking>> according to the estimated number of
     * visits relative to the total square footage of a property.</li> </ul> </br>
     * Regions:</br> <ul> <li>nationwide: The nationwide <<glossary:Ranking>> of a POI
     * benchmarked against POIs from the same category or chain.</li>
     * <li>state/dma/cbsa: The Ranking benchmarked against POIs from the same category or chain
     * in the POI's state/dma/cbsa.</li>
     * <li>Specific distance: The POI’s Ranking benchmarked against POIs from within a 5 / 10 /
     * 15 / 30 / 50 miles radius.</li> </ul> You may define the total number of results to
     * display (up to 1000), whereby half of the results will reflect properties ranked higher
     * than the requested property and half of the results will reflects the ones ranked lower.
     * For example: if the requested POI is ranked 550 and <b>results amount</b> value is set
     * to 200 - then the response includes all properties ranked between 450 and 649 within the
     * indexed list.</br> The endpoint supports pre-defined time buckets and ranking
     * regions.</br><br/>
     * &#x23F1; <strong>Average measured processing time: 3.98 seconds </strong><br/> For more
     * information on request retries best practices and   processing measurements you may
     * visit <a href=https://docs.placer.ai/reference/measurements> this</a> page<br/><br/>
     * NOTE: Flagged entities will not be taken into consideration in the resulting report.
     *
     * @summary Ranking Index - Closely Ranked
     * @throws FetchError<400, types.PostV1ReportsRankingIndexCloselyRankedResponse400> 400 Bad Request
     * @throws FetchError<403, types.PostV1ReportsRankingIndexCloselyRankedResponse403> 403 Permission Denied
     * @throws FetchError<500, types.PostV1ReportsRankingIndexCloselyRankedResponse500> 500 Internal Server Error
     */
    postV1ReportsRankingIndexCloselyRanked(body: types.PostV1ReportsRankingIndexCloselyRankedBodyParam): Promise<FetchResponse<200, types.PostV1ReportsRankingIndexCloselyRankedResponse200>>;
    /**
     * Favorite Places provides a list of other places that visitors to your location have also
     * visited during the selected time frame (e.g., X% of visitors to My Venue also visited
     * Place A during the last X months).<br/>
     * You may choose specific categories to examine among the <a
     * href=https://view-su2.highspot.com/viewer/87b4c810b4bc52f78f8fd2862fdf31dd>listed
     * categories</a> and define the minimum visit frequency.<br/>
     * The response includes the top 50 properties matching the requested parameters.<br/><br/>
     * &#x23F1; <strong>Average measured processing time: 4.46 seconds </strong><br/> For more
     * information on request retries best practices and   processing measurements you may
     * visit <a href=https://docs.placer.ai/reference/measurements> this</a> page<br/><br/>
     * &#128205; This service supports the <<glossary:Nearby Activity report>>. Once setting a
     * value to the nearbyRadius parameter, the report will be generated based on the nearby
     * activity logic.
     *
     * @summary Visitor Journey - Favorite Places
     * @throws FetchError<400, types.PostV1ReportsFavoritesPlacesResponse400> 400 Bad Request
     * @throws FetchError<403, types.PostV1ReportsFavoritesPlacesResponse403> 403 Permission Denied
     * @throws FetchError<500, types.PostV1ReportsFavoritesPlacesResponse500> 500 Internal Server Error
     */
    postV1ReportsFavoritesPlaces(body: types.PostV1ReportsFavoritesPlacesBodyParam): Promise<FetchResponse<200, types.PostV1ReportsFavoritesPlacesResponse200>>;
    /**
     * Favorite <<glossary:Chains>> provides a list of other <<glossary:Chains>> that visitors
     * to your location have also visited during the selected time frame (e.g., X% of visitors
     * to My Venue also visited Chain A during the last X months).<br/>
     * You may choose specific categories to examine among the <a
     * href=https://view-su2.highspot.com/viewer/87b4c810b4bc52f78f8fd2862fdf31dd>listed
     * categories</a> and define the minimum visit frequency.<br/>
     * The response includes the top 50 properties matching the requested parameters.<br/><br/>
     * <br/><br/> &#x23F1; <strong>Average measured processing time: 4.46 seconds
     * </strong><br/> For more information on request retries best practices and   processing
     * measurements you may visit <a href=https://docs.placer.ai/reference/measurements>
     * this</a> page<br/><br/> &#128205; This service supports the <<glossary:Nearby Activity
     * report>>. Once setting a value to the nearbyRadius parameter, the report will be
     * generated based on the nearby activity logic.
     *
     * @summary Visitor Journey - Favorite Chains
     * @throws FetchError<400, types.PostV1ReportsFavoritesChainsResponse400> 400 Bad Request
     * @throws FetchError<403, types.PostV1ReportsFavoritesChainsResponse403> 403 Permission Denied
     * @throws FetchError<500, types.PostV1ReportsFavoritesChainsResponse500> 500 Internal Server Error
     */
    postV1ReportsFavoritesChains(body: types.PostV1ReportsFavoritesChainsBodyParam): Promise<FetchResponse<200, types.PostV1ReportsFavoritesChainsResponse200>>;
    /**
     * This service provides the insights about sales performance at each venue examined in the
     * report. Within the response of this service you will be receiving both the requested
     * insights based on the date range, granularity and type of metric, and the annual sales
     * for the past year-to-date and 3 last calendar years.<br/><br/>
     * <b>Note</b>: Retail sales data currently excludes online transactions and only pertains
     * to sales in brick and mortar locations. Transactions which occurred using the Buy Now
     * Pick Up In Store option may be reflected in the data, depending on the retailer
     * concerned. In the event that Retail Sales data is not available for the report’s entire
     * date range the response will provide the exact dates for which the data applies.
     *
     * @summary Retail Sales Trend Report
     * @throws FetchError<400, types.PostV1ReportsRetailSalesSalesTrendsResponse400> 400 Bad Request
     * @throws FetchError<403, types.PostV1ReportsRetailSalesSalesTrendsResponse403> 403 Permission Denied
     * @throws FetchError<500, types.PostV1ReportsRetailSalesSalesTrendsResponse500> 500 Internal Server Error
     */
    postV1ReportsRetailSalesSalesTrends(body: types.PostV1ReportsRetailSalesSalesTrendsBodyParam): Promise<FetchResponse<200, types.PostV1ReportsRetailSalesSalesTrendsResponse200>>;
    /**
     * This service provides the retail sales metrics overview for the entire requested
     * period.<br/><br/>
     * <b>Note</b>: Retail sales data currently excludes online transactions and only pertains
     * to sales in brick and mortar locations. Transactions which occurred using the Buy Now
     * Pick Up In Store option may be reflected in the data, depending on the retailer
     * concerned. In the event that Retail Sales data is not available for the report’s entire
     * date range the response will provide the exact dates for which the data applies.
     *
     * @summary Retail Sales Overview
     * @throws FetchError<400, types.PostV1ReportsRetailSalesOverviewResponse400> 400 Bad Request
     * @throws FetchError<403, types.PostV1ReportsRetailSalesOverviewResponse403> 403 Permission Denied
     * @throws FetchError<500, types.PostV1ReportsRetailSalesOverviewResponse500> 500 Internal Server Error
     */
    postV1ReportsRetailSalesOverview(body: types.PostV1ReportsRetailSalesOverviewBodyParam): Promise<FetchResponse<200, types.PostV1ReportsRetailSalesOverviewResponse200>>;
    /**
     * This service provides the retail sales metrics overview for the entire requested period
     * aggregated either by the day of the week or by weekdays/weekend. The insights are
     * available for various of metrics</b>: <ul> <li> <b>sales</b>: The dollar value (USD) of
     * all sales during your selected aggregation.</li> <li> <b>avg_sales</b>: The dollar value
     * (USD) of average sales per day during your selected aggregation.</li> <li>
     * <b>sales_pct</b>: The percentage of total sales which occurred during your selected
     * aggregation.</li> <li> <b>sales_sq_ft</b>: The total value of sales per square foot at
     * the venue examined, during your selected aggregation.</li> <li> <b>transactions</b>: The
     * total number of individual transactions which took place at the property examined during
     * your selected aggregation.</li> <li> <b>transactions_pct</b>:The percentage of total
     * transactions which occurred during your selected .aggregation.</li> <li>
     * <b>avg_ticket_size</b>: The average dollar amount of sales per transaction generated at
     * the venues in your report, per your selected aggregation.</li> </ul>
     * <b>Note</b>: Retail sales data currently excludes online transactions and only pertains
     * to sales in brick and mortar locations. Transactions which occurred using the Buy Now
     * Pick Up In Store option may be reflected in the data, depending on the retailer
     * concerned. In the event that Retail Sales data is not available for the report’s entire
     * date range the response will provide the exact dates for which the data applies.
     *
     * @summary Retail Sales Daily Trends
     * @throws FetchError<400, types.PostV1ReportsRetailSalesDaysResponse400> 400 Bad Request
     * @throws FetchError<403, types.PostV1ReportsRetailSalesDaysResponse403> 403 Permission Denied
     * @throws FetchError<500, types.PostV1ReportsRetailSalesDaysResponse500> 500 Internal Server Error
     */
    postV1ReportsRetailSalesDays(body: types.PostV1ReportsRetailSalesDaysBodyParam): Promise<FetchResponse<200, types.PostV1ReportsRetailSalesDaysResponse200>>;
    /**
     * The Transaction Trend presents the total number of transactions generated at the venues
     * in your report over time. You can compare the venue's transaction trend against its
     * category or chain average.<br/><br/>
     * <b>Note</b>: Retail sales data currently excludes online transactions and only pertains
     * to sales in brick and mortar locations. Transactions which occurred using the Buy Now
     * Pick Up In Store option may be reflected in the data, depending on the retailer
     * concerned. In the event that Retail Sales data is not available for the report’s entire
     * date range the response will provide the exact dates for which the data applies.
     *
     * @summary Retail Sales Transactions Trends Report
     * @throws FetchError<400, types.PostV1ReportsRetailSalesTransactionTrendsResponse400> 400 Bad Request
     * @throws FetchError<403, types.PostV1ReportsRetailSalesTransactionTrendsResponse403> 403 Permission Denied
     * @throws FetchError<500, types.PostV1ReportsRetailSalesTransactionTrendsResponse500> 500 Internal Server Error
     */
    postV1ReportsRetailSalesTransactionTrends(body: types.PostV1ReportsRetailSalesTransactionTrendsBodyParam): Promise<FetchResponse<200, types.PostV1ReportsRetailSalesTransactionTrendsResponse200>>;
    /**
     * Average Ticket Size report allows you to examine the average dollar amount of sales per
     * transaction generated at the venue in your report, during the selected date range. You
     * can compare the venue's average ticket size trend against its category
     * average.<br/><br/>
     * <b>Note</b>: Retail sales data currently excludes online transactions and only pertains
     * to sales in brick and mortar locations. Transactions which occurred using the Buy Now
     * Pick Up In Store option may be reflected in the data, depending on the retailer
     * concerned. In the event that Retail Sales data is not available for the report’s entire
     * date range the response will provide the exact dates for which the data applies.
     *
     * @summary Retail Sales Average Ticket Size Trend Report
     * @throws FetchError<400, types.PostV1ReportsRetailSalesAvgTicketSizeTrendsResponse400> 400 Bad Request
     * @throws FetchError<403, types.PostV1ReportsRetailSalesAvgTicketSizeTrendsResponse403> 403 Permission Denied
     * @throws FetchError<500, types.PostV1ReportsRetailSalesAvgTicketSizeTrendsResponse500> 500 Internal Server Error
     */
    postV1ReportsRetailSalesAvgTicketSizeTrends(body: types.PostV1ReportsRetailSalesAvgTicketSizeTrendsBodyParam): Promise<FetchResponse<200, types.PostV1ReportsRetailSalesAvgTicketSizeTrendsResponse200>>;
    /**
     * The create <<glossary:Custom POI>> endpoint can be used to generate custom POIs by
     * specifying the unique polygons to               analyze.<br/> The <<glossary:Custom
     * POI>> can be generated by either specifying the combination of centroid (lng, lat) and
     * mile radius to draw the POI's area, or by using GEOJson which includes a list of all
     * polygon GEO points (lng, lat).<br/> This endpoint runs duplication checks on each call
     * in order to ensure that the same <<glossary:Custom POI>> is not created more than once.
     * If a <<glossary:Custom POI>> is already created the return code will display a wrong
     * request (http-code=400) specifying the previously created API ID.</br> Please be aware
     * that creating custom POIs might take longer than 30 seconds, which falls within the
     * timeout window. During such occurrences, the HTTP response code will be 202 (i.e., In
     * progress), along with the apiId of the partially created POI. You can monitor the
     * creation status by querying the <a href=Get Custom POI Info > Get Custom POI</a>
     * endpoint.
     *
     * @summary Create Custom POI
     * @throws FetchError<400, types.PostV1PoiCustomPoiResponse400> 400 Bad Request
     * @throws FetchError<403, types.PostV1PoiCustomPoiResponse403> 403 Permission Denied
     * @throws FetchError<500, types.PostV1PoiCustomPoiResponse500> 500 Internal Server Error
     */
    postV1PoiCustomPoi(body: types.PostV1PoiCustomPoiBodyParam): Promise<FetchResponse<200, types.PostV1PoiCustomPoiResponse200>>;
    /**
     * The Get Custom POI Info service can be used to retrieve information regarding any of
     * your <<glossary:Custom POI>>s, by providing its id.</br> If the requested Custom POI is
     * newly created, this endpoint will respond with the following statuses:</br>
     * - **HTTP code = 200**: The full response for the Get Custom POI is provided.</br> -
     * **HTTP code = 202**: The creation process is still in progress.</br> - **HTTP code =
     * 404**: The POI does not exist, indicating a failure in the creation process. Please
     * retry creating the custom POI.</br> - **HTTP code = 500**: Server error.
     *
     * @summary Get Custom POI Info
     * @throws FetchError<400, types.GetV1PoiCustomPoiIdResponse400> 400 Bad Request
     * @throws FetchError<403, types.GetV1PoiCustomPoiIdResponse403> 403 Permission Denied
     * @throws FetchError<500, types.GetV1PoiCustomPoiIdResponse500> 500 Internal Server Error
     */
    getV1PoiCustomPoiId(metadata: types.GetV1PoiCustomPoiIdMetadataParam): Promise<FetchResponse<200, types.GetV1PoiCustomPoiIdResponse200>>;
    /**
     * The Update POI service can be used to update any of your <<glossary:Custom POI>>s, by
     * providing any combination of the following custom POI’s properties(at least one):<br/>
     * <ol> <li>Name - the POI’s name.</li> <li>Area - can be defined either by determining the
     * centroid (lng, lat) and the radius to create the POI area, or by a list of all polygon
     * GEO points (lng,lat).</li> <li>Sub-category (For available sub-categories, see <a
     * href=https://view-su2.highspot.com/viewer/87b4c810b4bc52f78f8fd2862fdf31dd>listed
     * categories</a>.</li> <li>Address - the consumer can change any of the following
     * properties: street address, city and/or zipcode.</li> </ol>
     *
     * @summary Update Custom POI
     * @throws FetchError<400, types.PutV1PoiCustomPoiIdResponse400> 400 Bad Request
     * @throws FetchError<403, types.PutV1PoiCustomPoiIdResponse403> 403 Permission Denied
     * @throws FetchError<500, types.PutV1PoiCustomPoiIdResponse500> 500 Internal Server Error
     */
    putV1PoiCustomPoiId(body: types.PutV1PoiCustomPoiIdBodyParam, metadata: types.PutV1PoiCustomPoiIdMetadataParam): Promise<FetchResponse<200, types.PutV1PoiCustomPoiIdResponse200>>;
    /**
     * This service allows developers to delete a custom POI by its apiId.
     *
     * @summary Delete Custom POI
     * @throws FetchError<400, types.DeleteV1PoiCustomPoiIdResponse400> 400 Bad Request
     * @throws FetchError<403, types.DeleteV1PoiCustomPoiIdResponse403> 403 Permission Denied
     * @throws FetchError<500, types.DeleteV1PoiCustomPoiIdResponse500> 500 Internal Server Error
     */
    deleteV1PoiCustomPoiId(metadata: types.DeleteV1PoiCustomPoiIdMetadataParam): Promise<FetchResponse<200, types.DeleteV1PoiCustomPoiIdResponse200>>;
    /**
     * Using this service, you have the capability to generate a fresh tag for organizing
     * entities according to your specific business needs.
     *
     * @summary Create a new tag
     * @throws FetchError<400, types.PostV1PoiTagsResponse400> 400 Bad Request
     * @throws FetchError<403, types.PostV1PoiTagsResponse403> 403 Permission Denied
     * @throws FetchError<500, types.PostV1PoiTagsResponse500> 500 Internal Server Error
     */
    postV1PoiTags(body: types.PostV1PoiTagsBodyParam): Promise<FetchResponse<200, types.PostV1PoiTagsResponse200>>;
    /**
     * This service can be used to attach entities to an existing tag.
     *
     * @summary Add POI List to an Existing Tag
     * @throws FetchError<400, types.PutV1PoiTagsResponse400> 400 Bad Request
     * @throws FetchError<403, types.PutV1PoiTagsResponse403> 403 Permission Denied
     * @throws FetchError<500, types.PutV1PoiTagsResponse500> 500 Internal Server Error
     */
    putV1PoiTags(body: types.PutV1PoiTagsBodyParam): Promise<FetchResponse<200, types.PutV1PoiTagsResponse200> | FetchResponse<207, types.PutV1PoiTagsResponse207>>;
    /**
     * This service can be used to detach entities from an existing tag.
     *
     * @summary Remove POI List From an Existing Tag
     * @throws FetchError<400, types.DeleteV1PoiTagsResponse400> 400 Bad Request
     * @throws FetchError<403, types.DeleteV1PoiTagsResponse403> 403 Permission Denied
     * @throws FetchError<500, types.DeleteV1PoiTagsResponse500> 500 Internal Server Error
     */
    deleteV1PoiTags(body: types.DeleteV1PoiTagsBodyParam): Promise<FetchResponse<200, types.DeleteV1PoiTagsResponse200> | FetchResponse<207, types.DeleteV1PoiTagsResponse207>>;
    /**
     * Retrieves the current API usage status for the requesting API key.<br> This endpoint
     * helps you monitor consumption and remaining quota. <strong>Running it 2–3 times per
     * week</strong> is recommended for optimal tracking usage patterns.<br>
     * <strong>Note:</strong>  <ul> <li>The weekly quote renewals occur every <strong>Sunday at
     * 12:00 a.m. UTC</strong>.</li> <li>There can be a discrepancy between usedQuota and the
     * sum of calls made to individual endpoints because only <a
     * href=https://docs.placer.ai/reference/faqs-1#q-what-api-calls-count-towards-my-quota><strong>successful
     * calls</strong> are counted</a>.</li> </ul>
     *
     * @summary Account Usage
     * @throws FetchError<403, types.GetV1AccountsKeysUsageStatusResponse403> 403 Permission Denied
     * @throws FetchError<500, types.GetV1AccountsKeysUsageStatusResponse500> 500 Internal Server Error
     */
    getV1AccountsKeysUsageStatus(): Promise<FetchResponse<200, types.GetV1AccountsKeysUsageStatusResponse200>>;
}
declare const createSDK: SDK;
export = createSDK;
