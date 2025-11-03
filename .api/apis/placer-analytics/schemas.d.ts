declare const DeleteV1PoiCustomPoiId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly examples: readonly ["complex:5f7a2d2dc2b5e82a0114cf62"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Placer API ID";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "Delete Custom POI Response";
            readonly type: "object";
            readonly required: readonly ["data"];
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly result: {
                            readonly type: "string";
                            readonly examples: readonly ["SUCCESS"];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrorBadRequest";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const DeleteV1PoiTags: {
    readonly body: {
        readonly title: "Delete tag members request";
        readonly type: "object";
        readonly required: readonly ["apiIds", "tagId"];
        readonly properties: {
            readonly apiIds: {
                readonly type: "array";
                readonly description: "The list of entities to remove from the specified tag";
                readonly items: {
                    readonly type: "string";
                    readonly description: "Placer API Entity Id";
                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                };
            };
            readonly tagId: {
                readonly type: "string";
                readonly description: "The Id of the tag to remove the list of entities from";
                readonly examples: readonly ["672be20c36e1d0ff18a13807"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly title: "Modify Tag Entities Response Success";
            readonly type: "object";
            readonly required: readonly ["data"];
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly result: {
                            readonly type: "string";
                            readonly examples: readonly ["SUCCESS"];
                        };
                        readonly tagId: {
                            readonly type: "string";
                            readonly examples: readonly ["672be20c36e1d0ff18a13807"];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "207": {
            readonly title: "Delete Entities From Tag Response Multi Status";
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly tagId: {
                            readonly type: "string";
                            readonly examples: readonly ["672be20c36e1d0ff18a13807"];
                        };
                    };
                };
                readonly items: {
                    readonly type: "array";
                    readonly items: {
                        readonly oneOf: readonly [{
                            readonly title: "Modify Tag Entities Response Success";
                            readonly type: "object";
                            readonly properties: {
                                readonly status: {
                                    readonly type: "string";
                                    readonly examples: readonly ["SUCCESS"];
                                };
                                readonly code: {
                                    readonly type: "integer";
                                    readonly examples: readonly [0];
                                };
                                readonly apiId: {
                                    readonly type: "string";
                                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                                };
                            };
                        }, {
                            readonly title: "Modify Tag Entities Response Failure";
                            readonly type: "object";
                            readonly properties: {
                                readonly status: {
                                    readonly type: "string";
                                    readonly examples: readonly ["FAILURE"];
                                };
                                readonly code: {
                                    readonly type: "integer";
                                    readonly examples: readonly [2002];
                                };
                                readonly details: {
                                    readonly type: "string";
                                    readonly examples: readonly ["INVALID_ARGUMENTS"];
                                };
                                readonly message: {
                                    readonly type: "string";
                                    readonly examples: readonly ["The apiId cannot be removed from the specified tag"];
                                };
                                readonly apiId: {
                                    readonly type: "string";
                                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                                };
                            };
                        }];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrorBadRequest";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetV1AccountsKeysUsageStatus: {
    readonly response: {
        readonly "200": {
            readonly title: "Usage Status Response";
            readonly type: "object";
            readonly properties: {
                readonly usedQuota: {
                    readonly type: "integer";
                    readonly description: "The number of API calls your account has actually <strong>used</strong> during the <strong>current weekly quota period.<strong> This reflects your current API call consumption.";
                };
                readonly queriedPOIs: {
                    readonly type: "integer";
                    readonly description: "The total number of <strong>unique Points of Interest (POIs)</strong> queried through any POI-related endpoints in the <strong>current weekly quota period</strong>. This helps track how many distinct POIs have been requested.";
                };
                readonly weeklyUsageByEndpoint: {
                    readonly description: "The weekly usage per each utilized endpoint";
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly endpoint: {
                                readonly type: "string";
                                readonly description: "Endpoint's method and URI";
                            };
                            readonly numOfCalls: {
                                readonly type: "integer";
                                readonly description: "The number of calls to the endpoint on the current week.";
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetV1Poi: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly lat: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly minimum: -90;
                    readonly maximum: 90;
                    readonly description: "Latitude of query location, if specified then response will not include <<glossary:Chains>>";
                    readonly examples: readonly [37.52];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly lng: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly minimum: -180;
                    readonly maximum: 180;
                    readonly description: "Longitude of query location, if specified then response will not include chains";
                    readonly examples: readonly [-121.98];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly query: {
                    readonly type: "string";
                    readonly minLength: 1;
                    readonly maxLength: 256;
                    readonly examples: readonly ["Walmart"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "String included in the entity name";
                };
                readonly radius: {
                    readonly type: "number";
                    readonly minimum: 0.01;
                    readonly maximum: 2000;
                    readonly default: 1;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter results by radius in miles. default value 0.01 miles";
                };
                readonly category: {
                    readonly type: "string";
                    readonly examples: readonly ["Superstores"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter specific category";
                };
                readonly subCategory: {
                    readonly type: "string";
                    readonly examples: readonly ["Big Box Store"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter specific sub category";
                };
                readonly groupCategory: {
                    readonly type: "string";
                    readonly examples: readonly ["Superstores"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter specific group category i.e. Search POIs by business domains (e.g. Apparel,Dining, ....)";
                };
                readonly entityType: {
                    readonly type: "array";
                    readonly default: readonly ["venue", "complex", "chain"];
                    readonly items: {
                        readonly type: "string";
                        readonly enum: readonly ["venue", "complex", "chain"];
                    };
                    readonly examples: readonly ["venue"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Filter out specific entity type in search result. If this is not provided, all entity types will be returned";
                };
                readonly limit: {
                    readonly type: "integer";
                    readonly minimum: 1;
                    readonly maximum: 100;
                    readonly default: 10;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Search result limit";
                };
                readonly skip: {
                    readonly type: "number";
                    readonly minimum: 0;
                    readonly default: 0;
                    readonly maximum: 999;
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                };
                readonly includeFlaggedEntities: {
                    readonly type: "boolean";
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "If the parameter is set to true, the response will also include flagged entities";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly required: readonly ["data", "requestId"];
            readonly title: "POI Search Results";
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly title: "POI Info Object";
                        readonly type: "object";
                        readonly properties: {
                            readonly placerUrl: {
                                readonly type: "string";
                                readonly examples: readonly ["https://staging-analytics.placer.team/#!/admin/insights/venues/7d55054520e387813d764b03/overview"];
                            };
                            readonly parentChains: {
                                readonly type: "object";
                                readonly additionalProperties: true;
                            };
                            readonly parentTags: {
                                readonly type: "object";
                                readonly additionalProperties: true;
                            };
                            readonly isPermitted: {
                                readonly type: "boolean";
                                readonly description: "This flag indicates whether the account is permitted to generate/request reports on this entity or not.";
                                readonly examples: readonly [true];
                            };
                            readonly regionType: {
                                readonly type: "string";
                                readonly description: "The regions which the entity is associated with. Supported regions are: 'nationwide', 'state', 'dma' & 'cbsa'. Relevant only for chain.";
                                readonly examples: readonly ["dma"];
                            };
                            readonly regionCode: {
                                readonly type: "string";
                                readonly description: "The code defining the region (e.g. The state of Arizona -> 'AZ', nationwide -> 'US'). Relevant only for chain.";
                                readonly examples: readonly ["11010"];
                            };
                            readonly apiId: {
                                readonly type: "string";
                                readonly description: "Placer API Entity Id";
                                readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly description: "Entity Name";
                                readonly examples: readonly ["Walmart"];
                            };
                            readonly entityId: {
                                readonly type: "string";
                                readonly description: "Entity ID";
                                readonly examples: readonly ["7d55054520e387813d764b03"];
                            };
                            readonly entityType: {
                                readonly type: "string";
                                readonly enum: readonly ["venue", "complex", "chain"];
                                readonly description: "Entity Type (i.e. venue, complex etc.)\n\n`venue` `complex` `chain`";
                                readonly examples: readonly ["venue"];
                            };
                            readonly categoryInfo: {
                                readonly type: "object";
                                readonly description: "Property’s categorization";
                                readonly properties: {
                                    readonly category: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Fast Food & QSR"];
                                    };
                                    readonly group: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Dining"];
                                    };
                                    readonly subCategory: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Pizze Place"];
                                    };
                                };
                            };
                            readonly address: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly city: {
                                        readonly type: "string";
                                        readonly description: "Entity City";
                                        readonly examples: readonly ["Milpitas"];
                                    };
                                    readonly state: {
                                        readonly type: "string";
                                        readonly description: "Entity State";
                                        readonly examples: readonly ["California"];
                                    };
                                    readonly countryCode: {
                                        readonly type: "string";
                                        readonly description: "Entity Country Code";
                                        readonly examples: readonly ["US"];
                                    };
                                    readonly streetName: {
                                        readonly type: "string";
                                        readonly description: "Entity Street Name";
                                        readonly examples: readonly ["Ranch Dr"];
                                    };
                                    readonly formattedAddress: {
                                        readonly type: "string";
                                        readonly description: "Entity Address";
                                        readonly examples: readonly ["301 Ranch Dr, Milpitas, CA, United States"];
                                    };
                                    readonly shortFormattedAddress: {
                                        readonly type: "string";
                                        readonly description: "Entity Address";
                                        readonly examples: readonly ["Ranch Dr, Milpitas, CA"];
                                    };
                                    readonly zipCode: {
                                        readonly type: "string";
                                        readonly description: "Entity Zip Code";
                                        readonly examples: readonly ["95035"];
                                    };
                                };
                            };
                            readonly isFlagged: {
                                readonly type: "boolean";
                                readonly description: "The Entity Data Is Incomplete";
                                readonly examples: readonly [false];
                            };
                            readonly regions: {
                                readonly type: "object";
                                readonly description: "The regions in which the property is included";
                                readonly properties: {
                                    readonly dma: {
                                        readonly type: "object";
                                        readonly description: "The Entity Designated Market Area";
                                        readonly properties: {
                                            readonly code: {
                                                readonly type: "string";
                                                readonly examples: readonly [807];
                                            };
                                            readonly name: {
                                                readonly type: "string";
                                                readonly examples: readonly ["San Francisco-Oakland-San Jose, CA"];
                                            };
                                        };
                                    };
                                    readonly state: {
                                        readonly type: "object";
                                        readonly description: "Entity State";
                                        readonly properties: {
                                            readonly code: {
                                                readonly type: "string";
                                                readonly examples: readonly ["CA"];
                                            };
                                            readonly name: {
                                                readonly type: "string";
                                                readonly examples: readonly ["California"];
                                            };
                                        };
                                    };
                                    readonly cbsa: {
                                        readonly type: "object";
                                        readonly description: "The Entity Core-Based Statistical Areas";
                                        readonly properties: {
                                            readonly code: {
                                                readonly type: "string";
                                                readonly examples: readonly ["41940"];
                                            };
                                            readonly name: {
                                                readonly type: "string";
                                                readonly examples: readonly ["San Jose-Sunnyvale-Santa Clara, CA Metro Area"];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrorBadRequest";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetV1PoiCustomPoiId: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly examples: readonly ["complex:5f7a2d2dc2b5e82a0114cf62"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Placer API ID";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "POI By ID Info Object";
            readonly type: "object";
            readonly properties: {
                readonly apiId: {
                    readonly type: "string";
                    readonly description: "Placer API Entity Id";
                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                };
                readonly name: {
                    readonly type: "string";
                    readonly description: "Entity Name";
                    readonly examples: readonly ["Walmart"];
                };
                readonly entityId: {
                    readonly type: "string";
                    readonly description: "Entity ID";
                    readonly examples: readonly ["7d55054520e387813d764b03"];
                };
                readonly entityType: {
                    readonly type: "string";
                    readonly enum: readonly ["venue", "complex", "chain"];
                    readonly description: "Entity Type (i.e. venue, complex etc.)\n\n`venue` `complex` `chain`";
                    readonly examples: readonly ["venue"];
                };
                readonly categoryInfo: {
                    readonly type: "object";
                    readonly description: "Property’s categorization";
                    readonly properties: {
                        readonly category: {
                            readonly type: "string";
                            readonly examples: readonly ["Fast Food & QSR"];
                        };
                        readonly group: {
                            readonly type: "string";
                            readonly examples: readonly ["Dining"];
                        };
                        readonly subCategory: {
                            readonly type: "string";
                            readonly examples: readonly ["Pizze Place"];
                        };
                    };
                };
                readonly address: {
                    readonly type: "object";
                    readonly properties: {
                        readonly city: {
                            readonly type: "string";
                            readonly description: "Entity City";
                            readonly examples: readonly ["Milpitas"];
                        };
                        readonly state: {
                            readonly type: "string";
                            readonly description: "Entity State";
                            readonly examples: readonly ["California"];
                        };
                        readonly countryCode: {
                            readonly type: "string";
                            readonly description: "Entity Country Code";
                            readonly examples: readonly ["US"];
                        };
                        readonly streetName: {
                            readonly type: "string";
                            readonly description: "Entity Street Name";
                            readonly examples: readonly ["Ranch Dr"];
                        };
                        readonly formattedAddress: {
                            readonly type: "string";
                            readonly description: "Entity Address";
                            readonly examples: readonly ["301 Ranch Dr, Milpitas, CA, United States"];
                        };
                        readonly shortFormattedAddress: {
                            readonly type: "string";
                            readonly description: "Entity Address";
                            readonly examples: readonly ["Ranch Dr, Milpitas, CA"];
                        };
                        readonly zipCode: {
                            readonly type: "string";
                            readonly description: "Entity Zip Code";
                            readonly examples: readonly ["95035"];
                        };
                    };
                };
                readonly isFlagged: {
                    readonly type: "boolean";
                    readonly description: "The Entity Data Is Incomplete";
                    readonly examples: readonly [false];
                };
                readonly regions: {
                    readonly type: "object";
                    readonly description: "The regions in which the property is included";
                    readonly properties: {
                        readonly dma: {
                            readonly type: "object";
                            readonly description: "The Entity Designated Market Area";
                            readonly properties: {
                                readonly code: {
                                    readonly type: "string";
                                    readonly examples: readonly [807];
                                };
                                readonly name: {
                                    readonly type: "string";
                                    readonly examples: readonly ["San Francisco-Oakland-San Jose, CA"];
                                };
                            };
                        };
                        readonly state: {
                            readonly type: "object";
                            readonly description: "Entity State";
                            readonly properties: {
                                readonly code: {
                                    readonly type: "string";
                                    readonly examples: readonly ["CA"];
                                };
                                readonly name: {
                                    readonly type: "string";
                                    readonly examples: readonly ["California"];
                                };
                            };
                        };
                        readonly cbsa: {
                            readonly type: "object";
                            readonly description: "The Entity Core-Based Statistical Areas";
                            readonly properties: {
                                readonly code: {
                                    readonly type: "string";
                                    readonly examples: readonly ["41940"];
                                };
                                readonly name: {
                                    readonly type: "string";
                                    readonly examples: readonly ["San Jose-Sunnyvale-Santa Clara, CA Metro Area"];
                                };
                            };
                        };
                    };
                };
                readonly placerUrl: {
                    readonly type: "string";
                    readonly examples: readonly ["https://staging-analytics.placer.team/#!/admin/insights/venues/7d55054520e387813d764b03/overview"];
                };
                readonly parentChains: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
                readonly parentTags: {
                    readonly type: "object";
                    readonly additionalProperties: true;
                };
                readonly isPermitted: {
                    readonly type: "boolean";
                    readonly description: "This flag indicates whether the account is permitted to generate/request reports on this entity or not.";
                    readonly examples: readonly [true];
                };
                readonly regionType: {
                    readonly type: "string";
                    readonly description: "The regions which the entity is associated with. Supported regions are: 'nationwide', 'state', 'dma' & 'cbsa'. Relevant only for chain.";
                    readonly examples: readonly ["dma"];
                };
                readonly regionCode: {
                    readonly type: "string";
                    readonly description: "The code defining the region (e.g. The state of Arizona -> 'AZ', nationwide -> 'US'). Relevant only for chain.";
                    readonly examples: readonly ["11010"];
                };
                readonly storeId: {
                    readonly type: "string";
                    readonly description: "The identification of a venue. Relevant only for chain's venues.";
                    readonly examples: readonly [1401];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrorBadRequest";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetV1PoiIdEntities: {
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly examples: readonly ["chain:58ef64a9173f5601f92d8f0e"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Placer entity API ID (i.e. ID of a <strong>chain</strong>, a <strong>complex</strong> or a <strong>tag</strong>)";
                };
            };
            readonly required: readonly ["id"];
        }, {
            readonly type: "object";
            readonly properties: {
                readonly includeRegionalChains: {
                    readonly type: "boolean";
                    readonly examples: readonly [true];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Set this parameter to True for pulling regional chains(under the parent chain requested) as well as all other sub entities.";
                };
            };
            readonly required: readonly [];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "Sub Entities Response";
            readonly required: readonly ["data", "requestId"];
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly title: "Placer Entity Info";
                        readonly properties: {
                            readonly apiId: {
                                readonly type: "string";
                                readonly description: "Placer API Entity Id";
                                readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly description: "Entity name";
                                readonly examples: readonly ["Walmart"];
                            };
                            readonly entityId: {
                                readonly type: "string";
                                readonly description: "Entity ID";
                                readonly examples: readonly ["7d55054520e387813d764b03"];
                            };
                            readonly entityType: {
                                readonly type: "string";
                                readonly enum: readonly ["venue", "complex", "chain"];
                                readonly description: "Entity Type (i.e. venue, complex etc.)\n\n`venue` `complex` `chain`";
                                readonly examples: readonly ["venue"];
                            };
                            readonly flagged: {
                                readonly type: "boolean";
                                readonly description: "Flagging status for entity";
                            };
                            readonly storeId: {
                                readonly type: "string";
                                readonly description: "The identification of a venue. Relevant only for chain’s venues";
                                readonly examples: readonly ["1401"];
                            };
                            readonly regionType: {
                                readonly type: "string";
                                readonly description: "Optional string for region type";
                                readonly examples: readonly ["state"];
                            };
                            readonly regionCode: {
                                readonly type: "string";
                                readonly description: "Optional string for region code";
                                readonly examples: readonly ["WV"];
                            };
                        };
                        readonly type: "object";
                    };
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrInvalidArguments";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "404": {
            readonly title: "ErrorNotFound";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const GetV1PoiMyProperties: {
    readonly response: {
        readonly "200": {
            readonly title: "MyProperties Response";
            readonly required: readonly ["data", "requestId"];
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "array";
                    readonly items: {
                        readonly title: "POI Info Object";
                        readonly type: "object";
                        readonly properties: {
                            readonly placerUrl: {
                                readonly type: "string";
                                readonly examples: readonly ["https://staging-analytics.placer.team/#!/admin/insights/venues/7d55054520e387813d764b03/overview"];
                            };
                            readonly parentChains: {
                                readonly type: "object";
                                readonly additionalProperties: true;
                            };
                            readonly parentTags: {
                                readonly type: "object";
                                readonly additionalProperties: true;
                            };
                            readonly isPermitted: {
                                readonly type: "boolean";
                                readonly description: "This flag indicates whether the account is permitted to generate/request reports on this entity or not.";
                                readonly examples: readonly [true];
                            };
                            readonly regionType: {
                                readonly type: "string";
                                readonly description: "The regions which the entity is associated with. Supported regions are: 'nationwide', 'state', 'dma' & 'cbsa'. Relevant only for chain.";
                                readonly examples: readonly ["dma"];
                            };
                            readonly regionCode: {
                                readonly type: "string";
                                readonly description: "The code defining the region (e.g. The state of Arizona -> 'AZ', nationwide -> 'US'). Relevant only for chain.";
                                readonly examples: readonly ["11010"];
                            };
                            readonly apiId: {
                                readonly type: "string";
                                readonly description: "Placer API Entity Id";
                                readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly description: "Entity Name";
                                readonly examples: readonly ["Walmart"];
                            };
                            readonly entityId: {
                                readonly type: "string";
                                readonly description: "Entity ID";
                                readonly examples: readonly ["7d55054520e387813d764b03"];
                            };
                            readonly entityType: {
                                readonly type: "string";
                                readonly enum: readonly ["venue", "complex", "chain"];
                                readonly description: "Entity Type (i.e. venue, complex etc.)\n\n`venue` `complex` `chain`";
                                readonly examples: readonly ["venue"];
                            };
                            readonly categoryInfo: {
                                readonly type: "object";
                                readonly description: "Property’s categorization";
                                readonly properties: {
                                    readonly category: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Fast Food & QSR"];
                                    };
                                    readonly group: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Dining"];
                                    };
                                    readonly subCategory: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Pizze Place"];
                                    };
                                };
                            };
                            readonly address: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly city: {
                                        readonly type: "string";
                                        readonly description: "Entity City";
                                        readonly examples: readonly ["Milpitas"];
                                    };
                                    readonly state: {
                                        readonly type: "string";
                                        readonly description: "Entity State";
                                        readonly examples: readonly ["California"];
                                    };
                                    readonly countryCode: {
                                        readonly type: "string";
                                        readonly description: "Entity Country Code";
                                        readonly examples: readonly ["US"];
                                    };
                                    readonly streetName: {
                                        readonly type: "string";
                                        readonly description: "Entity Street Name";
                                        readonly examples: readonly ["Ranch Dr"];
                                    };
                                    readonly formattedAddress: {
                                        readonly type: "string";
                                        readonly description: "Entity Address";
                                        readonly examples: readonly ["301 Ranch Dr, Milpitas, CA, United States"];
                                    };
                                    readonly shortFormattedAddress: {
                                        readonly type: "string";
                                        readonly description: "Entity Address";
                                        readonly examples: readonly ["Ranch Dr, Milpitas, CA"];
                                    };
                                    readonly zipCode: {
                                        readonly type: "string";
                                        readonly description: "Entity Zip Code";
                                        readonly examples: readonly ["95035"];
                                    };
                                };
                            };
                            readonly isFlagged: {
                                readonly type: "boolean";
                                readonly description: "The Entity Data Is Incomplete";
                                readonly examples: readonly [false];
                            };
                            readonly regions: {
                                readonly type: "object";
                                readonly description: "The regions in which the property is included";
                                readonly properties: {
                                    readonly dma: {
                                        readonly type: "object";
                                        readonly description: "The Entity Designated Market Area";
                                        readonly properties: {
                                            readonly code: {
                                                readonly type: "string";
                                                readonly examples: readonly [807];
                                            };
                                            readonly name: {
                                                readonly type: "string";
                                                readonly examples: readonly ["San Francisco-Oakland-San Jose, CA"];
                                            };
                                        };
                                    };
                                    readonly state: {
                                        readonly type: "object";
                                        readonly description: "Entity State";
                                        readonly properties: {
                                            readonly code: {
                                                readonly type: "string";
                                                readonly examples: readonly ["CA"];
                                            };
                                            readonly name: {
                                                readonly type: "string";
                                                readonly examples: readonly ["California"];
                                            };
                                        };
                                    };
                                    readonly cbsa: {
                                        readonly type: "object";
                                        readonly description: "The Entity Core-Based Statistical Areas";
                                        readonly properties: {
                                            readonly code: {
                                                readonly type: "string";
                                                readonly examples: readonly ["41940"];
                                            };
                                            readonly name: {
                                                readonly type: "string";
                                                readonly examples: readonly ["San Jose-Sunnyvale-Santa Clara, CA Metro Area"];
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostV1PoiCustomPoi: {
    readonly body: {
        readonly title: "Create custom POI request";
        readonly description: "Creating <<glossary:Custom POI>> by given name, sub category and polygon/centroid + radius";
        readonly type: "object";
        readonly required: readonly ["name", "subCategory"];
        readonly properties: {
            readonly name: {
                readonly type: "string";
                readonly examples: readonly ["Some Custom POI Name"];
            };
            readonly subCategory: {
                readonly type: "string";
                readonly examples: readonly ["Pizza Place"];
            };
            readonly tagId: {
                readonly type: "string";
                readonly description: "The Id of the tag that the <<glossary:Custom POI>> is requested to be associated with. If no value is provided, the new POI will not be associated with any tag.";
                readonly examples: readonly ["672be20c36e1d0ff18a13807"];
            };
            readonly centroid: {
                readonly type: "array";
                readonly description: "List of 2 values that represents the GEO location of the POI center";
                readonly items: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly minimum: -200;
                    readonly maximum: 80;
                };
                readonly examples: readonly [-78.519444, 36.61636];
            };
            readonly radius: {
                readonly type: "number";
                readonly format: "float";
                readonly minimum: 0.007;
                readonly maximum: 0.21;
                readonly default: 0.1;
                readonly description: "Radius (in miles) with which the polygon is constructed when the center of the polygon is the centroid";
            };
            readonly polygon: {
                readonly type: "array";
                readonly description: "List of pairs ([lng, lat]) that represents the POI polygon";
                readonly items: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "number";
                        readonly format: "float";
                        readonly minimum: -3.402823669209385e+38;
                        readonly maximum: 3.402823669209385e+38;
                    };
                };
            };
            readonly address: {
                readonly type: "object";
                readonly properties: {
                    readonly address: {
                        readonly type: "string";
                        readonly description: "Entity Address";
                        readonly examples: readonly ["301 Ranch Dr"];
                    };
                    readonly city: {
                        readonly type: "string";
                        readonly description: "Entity City";
                        readonly examples: readonly ["Milpitas"];
                    };
                    readonly zipCode: {
                        readonly type: "string";
                        readonly description: "Entity Zip Code";
                        readonly examples: readonly ["95035"];
                    };
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly title: "Custom POI Response";
            readonly type: "object";
            readonly required: readonly ["data"];
            readonly properties: {
                readonly data: {
                    readonly title: "Custom POI Info Object";
                    readonly type: "object";
                    readonly properties: {
                        readonly result: {
                            readonly type: "string";
                            readonly examples: readonly ["SUCCESS"];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly examples: readonly ["Name to be used to identify the <<glossary:Custom POI>>"];
                        };
                        readonly apiId: {
                            readonly type: "string";
                            readonly examples: readonly ["complex:8d22ae197ee335c5074a67ff"];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrorBadRequest";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostV1PoiTags: {
    readonly body: {
        readonly title: "Add a new tag request";
        readonly type: "object";
        readonly required: readonly ["tagName"];
        readonly properties: {
            readonly tagName: {
                readonly type: "string";
                readonly description: "The new tag name";
                readonly maxLength: 150;
                readonly examples: readonly ["My Shop"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly title: "Create New Tag Response Success";
            readonly type: "object";
            readonly required: readonly ["data"];
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly result: {
                            readonly type: "string";
                            readonly examples: readonly ["SUCCESS"];
                        };
                        readonly tagId: {
                            readonly type: "string";
                            readonly examples: readonly ["672be20c36e1d0ff18a13807"];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrorBadRequest";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostV1ReportsFavoritesChains: {
    readonly body: {
        readonly title: "Favorites Request";
        readonly type: "object";
        readonly required: readonly ["startDate", "endDate", "apiId"];
        readonly properties: {
            readonly startDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data start date. Format YYYY-MM-DD";
                readonly examples: readonly ["2020-12-01"];
            };
            readonly endDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data end date. Format YYYY-MM-DD";
                readonly examples: readonly ["2021-05-31"];
            };
            readonly apiId: {
                readonly type: "string";
                readonly description: "Placer API Entity Id";
                readonly examples: readonly ["venue:7d55054520e387813d764b03"];
            };
            readonly categories: {
                readonly type: "array";
                readonly description: "Array of categories to which the resulted favorite places are associated. “all” will be used as default.<br/> NOTE: please select the specific categories from the <a href=https://view-su2.highspot.com/viewer/87b4c810b4bc52f78f8fd2862fdf31dd>listed categories</a>.<br/> If a list of categories is provided yet only some categories are recognized, results will reflect only the recognized categories. In case no category is recognized the results will reflect all categories.";
                readonly items: {
                    readonly type: "string";
                };
                readonly examples: readonly ["gas stations & convenience stores", "airport facilities"];
            };
            readonly minimalVisitFrequency: {
                readonly type: "integer";
                readonly default: 1;
                readonly minimum: 0;
                readonly maximum: 99;
                readonly description: "The minimal visits frequency requested in the other places/<<glossary:chains>>. 1 will be used as default.";
            };
            readonly limit: {
                readonly type: "integer";
                readonly default: 50;
                readonly minimum: 0;
                readonly maximum: 50;
                readonly description: "The number of expected results. Default is set to 50.";
            };
            readonly filters: {
                readonly description: "Filtering options for the report results.";
                readonly type: "object";
                readonly properties: {
                    readonly audienceType: {
                        readonly description: "If provided - metrics will be calculated based only on the specified types of audience.";
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                            readonly enum: readonly ["visitors", "employees", "residents"];
                        };
                        readonly examples: readonly ["visitors"];
                    };
                    readonly dwellTime: {
                        readonly description: "Metrics will be calculated considering the requested dwell time range.";
                        readonly type: "object";
                        readonly properties: {
                            readonly operator: {
                                readonly description: "Less than (<) to Greater Equal (>=)";
                                readonly type: "string";
                                readonly enum: readonly ["<", ">="];
                                readonly examples: readonly ["<"];
                            };
                            readonly value: {
                                readonly description: "The wanted dwell time";
                                readonly type: "integer";
                                readonly examples: readonly [150];
                            };
                        };
                    };
                    readonly hoursRange: {
                        readonly description: "Filter the report’s results based on visits hours range. The filter is defined by 2 strings:<br/> 1. The starting hour to filter the reports results from (Format HH:MM XM, for example: 08:00 am).<br/> 2. The end hour to filter the reports results(Format HH:MM XM, for example: 11:59 pm) .";
                        readonly type: "object";
                        readonly required: readonly ["fromHour", "toHour"];
                        readonly properties: {
                            readonly fromHour: {
                                readonly type: "string";
                                readonly examples: readonly ["03:00 am"];
                            };
                            readonly toHour: {
                                readonly type: "string";
                                readonly examples: readonly ["11:59 pm"];
                            };
                        };
                    };
                    readonly daysOfWeek: {
                        readonly description: "Filter visit calculation based on days of the week. Results will contain only requested days. Days are represented by using numbers where Monday=1 and Sunday=7. For example: in order to retrieve weekend days use the following [ 6, 7 ].";
                        readonly type: "array";
                        readonly items: {
                            readonly enum: readonly [1, 2, 3, 4, 5, 6, 7];
                        };
                        readonly examples: readonly [6, 7];
                    };
                    readonly distance: {
                        readonly description: "Filter visits by distance in miles from home <strong>or</strong> work<br/> where only visits in a given radius will be used in metrics calculation.";
                        readonly type: "object";
                        readonly properties: {
                            readonly from: {
                                readonly description: "The origin from where the distance will be measured.";
                                readonly type: "string";
                                readonly enum: readonly ["home", "work"];
                                readonly examples: readonly ["home"];
                            };
                            readonly values: {
                                readonly description: "Object representation of the distance range<br/>lt - less than<br/>le - less than or equal to<br/>eq - equal to<br/>ge - greater than or equal to<br/>gt - greater than.";
                                readonly type: "object";
                                readonly properties: {
                                    readonly le: {
                                        readonly type: "number";
                                        readonly examples: readonly [100];
                                    };
                                    readonly ge: {
                                        readonly type: "number";
                                    };
                                    readonly lt: {
                                        readonly type: "number";
                                        readonly examples: readonly [250];
                                    };
                                    readonly gt: {
                                        readonly type: "number";
                                        readonly examples: readonly [10];
                                    };
                                    readonly eq: {
                                        readonly type: "number";
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly nearbyRadius: {
                readonly type: "integer";
                readonly enum: readonly [100, 250, 500, 750, 1000];
                readonly description: "The radius requested for nearby activity report generation.</br> <strong>Note</strong>: When a value is populated for this attribute - the report will be calculated as per the <<glossary:Nearby Activity report>> logic.";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly requestedCategories: {
                    readonly type: "array";
                    readonly description: "The list of requested categories";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly examples: readonly ["gas stations & convenience stores", "airport facilities"];
                };
                readonly nearbyRadius: {
                    readonly type: "integer";
                    readonly enum: readonly [100, 250, 500, 750, 1000];
                    readonly description: "The radius requested for nearby activity report generation.</br> <strong>Note</strong>: When a value is populated for this attribute - the report will be calculated as per the <<glossary:Nearby Activity report>> logic.\n\n`100` `250` `500` `750` `1000`";
                };
                readonly filters: {
                    readonly type: "object";
                    readonly properties: {
                        readonly audienceType: {
                            readonly description: "The list of audiences that is specified in the request filter.";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                                readonly enum: readonly ["visitors", "employees", "residents"];
                                readonly description: "`visitors` `employees` `residents`";
                            };
                            readonly examples: readonly ["visitors"];
                        };
                        readonly dwellTime: {
                            readonly description: "The dwell time filter specified in the request, in case it was utilized.<br/> For example: “< 100” or “>= 10”";
                            readonly type: "object";
                            readonly properties: {
                                readonly operator: {
                                    readonly description: "Represents the operator used for defining the dwell time range for filtering the report data\n\n`<` `>=`";
                                    readonly type: "string";
                                    readonly enum: readonly ["<", ">="];
                                    readonly examples: readonly ["<"];
                                };
                                readonly value: {
                                    readonly description: "Represents the number of minutes referred to when defining the dwell time range for filtering the report data";
                                    readonly type: "integer";
                                    readonly examples: readonly [150];
                                };
                            };
                        };
                        readonly hoursRange: {
                            readonly description: "The hours range that is specified in the request filter.";
                            readonly type: "object";
                            readonly properties: {
                                readonly fromHour: {
                                    readonly description: "Start visits hour (Format HH:MM XM, for example: 08:00 am)";
                                    readonly type: "string";
                                    readonly examples: readonly ["03:00 am"];
                                };
                                readonly toHour: {
                                    readonly description: "End visitation hour (Format HH:MM XM, for example: 08:00 am)";
                                    readonly type: "string";
                                    readonly examples: readonly ["11:59 pm"];
                                };
                            };
                        };
                        readonly daysOfWeek: {
                            readonly description: "A list of days represented by integers (Monday=1, Sunday=7) as specified in the request filter, which was used in the report calculation.";
                            readonly type: "array";
                            readonly items: {
                                readonly enum: readonly [1, 2, 3, 4, 5, 6, 7];
                            };
                            readonly examples: readonly [6, 7];
                        };
                        readonly distance: {
                            readonly description: "The visits considered for the report calculation by distance in miles from home <strong>or</strong> work as specified in the request filter.";
                            readonly type: "object";
                            readonly properties: {
                                readonly from: {
                                    readonly description: "The origin from where the distance will be measured.\n\n`home` `work`";
                                    readonly type: "string";
                                    readonly enum: readonly ["home", "work"];
                                    readonly examples: readonly ["home"];
                                };
                                readonly values: {
                                    readonly description: "Object representation of the distance range<br/>lt - less than<br/>le - less than or equal to<br/>eq - equal to<br/>ge - greater than or equal to<br/>gt - greater than.";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly le: {
                                            readonly type: "number";
                                            readonly examples: readonly [100];
                                        };
                                        readonly ge: {
                                            readonly type: "number";
                                        };
                                        readonly lt: {
                                            readonly type: "number";
                                            readonly examples: readonly [250];
                                        };
                                        readonly gt: {
                                            readonly type: "number";
                                            readonly examples: readonly [10];
                                        };
                                        readonly eq: {
                                            readonly type: "number";
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                readonly visitDurationSegmentation: {
                    readonly description: "The default visit duration segmentation is returned when the report calculation uses the default segmentation duration.\n\n`under10Min` `10MinOrLonger` `allVisits` `mixedSegments`";
                    readonly title: "Visit Duration Segmentation";
                    readonly type: "string";
                    readonly enum: readonly ["under10Min", "10MinOrLonger", "allVisits", "mixedSegments"];
                    readonly examples: readonly ["10MinOrLonger"];
                };
                readonly favoritesChainsArray: {
                    readonly description: "The list of most visited chains by the visitors to the requested POI";
                    readonly type: "array";
                    readonly items: {
                        readonly title: "Favorite Chains Entity Info";
                        readonly type: "object";
                        readonly properties: {
                            readonly regionType: {
                                readonly type: "string";
                                readonly examples: readonly ["nationwide"];
                            };
                            readonly apiId: {
                                readonly type: "string";
                                readonly description: "Placer API Entity Id";
                                readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly description: "Entity Name";
                                readonly examples: readonly ["Walmart"];
                            };
                            readonly entityId: {
                                readonly type: "string";
                                readonly description: "Entity ID";
                                readonly examples: readonly ["7d55054520e387813d764b03"];
                            };
                            readonly entityType: {
                                readonly type: "string";
                                readonly enum: readonly ["venue", "complex", "chain"];
                                readonly description: "Entity Type (i.e. venue, complex etc.)\n\n`venue` `complex` `chain`";
                                readonly examples: readonly ["venue"];
                            };
                            readonly categoryInfo: {
                                readonly type: "object";
                                readonly description: "Property’s categorization";
                                readonly properties: {
                                    readonly category: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Fast Food & QSR"];
                                    };
                                    readonly group: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Dining"];
                                    };
                                    readonly subCategory: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Pizze Place"];
                                    };
                                };
                            };
                            readonly estimatedNumberOfCustomers: {
                                readonly type: "integer";
                                readonly description: "Estimated foot traffic during the requested period, when associated with visitation to the queried POI";
                                readonly examples: readonly [1234];
                            };
                            readonly percentage: {
                                readonly type: "number";
                                readonly format: "float";
                                readonly description: "The percentage of visitors to the requested venue also visited this property during the requested period";
                                readonly examples: readonly [48.92];
                                readonly minimum: -3.402823669209385e+38;
                                readonly maximum: 3.402823669209385e+38;
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrorBadRequest";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostV1ReportsFavoritesPlaces: {
    readonly body: {
        readonly title: "Favorites Request";
        readonly type: "object";
        readonly required: readonly ["startDate", "endDate", "apiId"];
        readonly properties: {
            readonly startDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data start date. Format YYYY-MM-DD";
                readonly examples: readonly ["2020-12-01"];
            };
            readonly endDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data end date. Format YYYY-MM-DD";
                readonly examples: readonly ["2021-05-31"];
            };
            readonly apiId: {
                readonly type: "string";
                readonly description: "Placer API Entity Id";
                readonly examples: readonly ["venue:7d55054520e387813d764b03"];
            };
            readonly categories: {
                readonly type: "array";
                readonly description: "Array of categories to which the resulted favorite places are associated. “all” will be used as default.<br/> NOTE: please select the specific categories from the <a href=https://view-su2.highspot.com/viewer/87b4c810b4bc52f78f8fd2862fdf31dd>listed categories</a>.<br/> If a list of categories is provided yet only some categories are recognized, results will reflect only the recognized categories. In case no category is recognized the results will reflect all categories.";
                readonly items: {
                    readonly type: "string";
                };
                readonly examples: readonly ["gas stations & convenience stores", "airport facilities"];
            };
            readonly minimalVisitFrequency: {
                readonly type: "integer";
                readonly default: 1;
                readonly minimum: 0;
                readonly maximum: 99;
                readonly description: "The minimal visits frequency requested in the other places/<<glossary:chains>>. 1 will be used as default.";
            };
            readonly limit: {
                readonly type: "integer";
                readonly default: 50;
                readonly minimum: 0;
                readonly maximum: 50;
                readonly description: "The number of expected results. Default is set to 50.";
            };
            readonly filters: {
                readonly description: "Filtering options for the report results.";
                readonly type: "object";
                readonly properties: {
                    readonly audienceType: {
                        readonly description: "If provided - metrics will be calculated based only on the specified types of audience.";
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                            readonly enum: readonly ["visitors", "employees", "residents"];
                        };
                        readonly examples: readonly ["visitors"];
                    };
                    readonly dwellTime: {
                        readonly description: "Metrics will be calculated considering the requested dwell time range.";
                        readonly type: "object";
                        readonly properties: {
                            readonly operator: {
                                readonly description: "Less than (<) to Greater Equal (>=)";
                                readonly type: "string";
                                readonly enum: readonly ["<", ">="];
                                readonly examples: readonly ["<"];
                            };
                            readonly value: {
                                readonly description: "The wanted dwell time";
                                readonly type: "integer";
                                readonly examples: readonly [150];
                            };
                        };
                    };
                    readonly hoursRange: {
                        readonly description: "Filter the report’s results based on visits hours range. The filter is defined by 2 strings:<br/> 1. The starting hour to filter the reports results from (Format HH:MM XM, for example: 08:00 am).<br/> 2. The end hour to filter the reports results(Format HH:MM XM, for example: 11:59 pm) .";
                        readonly type: "object";
                        readonly required: readonly ["fromHour", "toHour"];
                        readonly properties: {
                            readonly fromHour: {
                                readonly type: "string";
                                readonly examples: readonly ["03:00 am"];
                            };
                            readonly toHour: {
                                readonly type: "string";
                                readonly examples: readonly ["11:59 pm"];
                            };
                        };
                    };
                    readonly daysOfWeek: {
                        readonly description: "Filter visit calculation based on days of the week. Results will contain only requested days. Days are represented by using numbers where Monday=1 and Sunday=7. For example: in order to retrieve weekend days use the following [ 6, 7 ].";
                        readonly type: "array";
                        readonly items: {
                            readonly enum: readonly [1, 2, 3, 4, 5, 6, 7];
                        };
                        readonly examples: readonly [6, 7];
                    };
                    readonly distance: {
                        readonly description: "Filter visits by distance in miles from home <strong>or</strong> work<br/> where only visits in a given radius will be used in metrics calculation.";
                        readonly type: "object";
                        readonly properties: {
                            readonly from: {
                                readonly description: "The origin from where the distance will be measured.";
                                readonly type: "string";
                                readonly enum: readonly ["home", "work"];
                                readonly examples: readonly ["home"];
                            };
                            readonly values: {
                                readonly description: "Object representation of the distance range<br/>lt - less than<br/>le - less than or equal to<br/>eq - equal to<br/>ge - greater than or equal to<br/>gt - greater than.";
                                readonly type: "object";
                                readonly properties: {
                                    readonly le: {
                                        readonly type: "number";
                                        readonly examples: readonly [100];
                                    };
                                    readonly ge: {
                                        readonly type: "number";
                                    };
                                    readonly lt: {
                                        readonly type: "number";
                                        readonly examples: readonly [250];
                                    };
                                    readonly gt: {
                                        readonly type: "number";
                                        readonly examples: readonly [10];
                                    };
                                    readonly eq: {
                                        readonly type: "number";
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly nearbyRadius: {
                readonly type: "integer";
                readonly enum: readonly [100, 250, 500, 750, 1000];
                readonly description: "The radius requested for nearby activity report generation.</br> <strong>Note</strong>: When a value is populated for this attribute - the report will be calculated as per the <<glossary:Nearby Activity report>> logic.";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly requestedCategories: {
                    readonly type: "array";
                    readonly description: "The list of requested categories";
                    readonly items: {
                        readonly type: "string";
                    };
                    readonly examples: readonly ["gas stations & convenience stores", "airport facilities"];
                };
                readonly nearbyRadius: {
                    readonly type: "integer";
                    readonly enum: readonly [100, 250, 500, 750, 1000];
                    readonly description: "The radius requested for nearby activity report generation.</br> <strong>Note</strong>: When a value is populated for this attribute - the report will be calculated as per the <<glossary:Nearby Activity report>> logic.\n\n`100` `250` `500` `750` `1000`";
                };
                readonly filters: {
                    readonly type: "object";
                    readonly properties: {
                        readonly audienceType: {
                            readonly description: "The list of audiences that is specified in the request filter.";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                                readonly enum: readonly ["visitors", "employees", "residents"];
                                readonly description: "`visitors` `employees` `residents`";
                            };
                            readonly examples: readonly ["visitors"];
                        };
                        readonly dwellTime: {
                            readonly description: "The dwell time filter specified in the request, in case it was utilized.<br/> For example: “< 100” or “>= 10”";
                            readonly type: "object";
                            readonly properties: {
                                readonly operator: {
                                    readonly description: "Represents the operator used for defining the dwell time range for filtering the report data\n\n`<` `>=`";
                                    readonly type: "string";
                                    readonly enum: readonly ["<", ">="];
                                    readonly examples: readonly ["<"];
                                };
                                readonly value: {
                                    readonly description: "Represents the number of minutes referred to when defining the dwell time range for filtering the report data";
                                    readonly type: "integer";
                                    readonly examples: readonly [150];
                                };
                            };
                        };
                        readonly hoursRange: {
                            readonly description: "The hours range that is specified in the request filter.";
                            readonly type: "object";
                            readonly properties: {
                                readonly fromHour: {
                                    readonly description: "Start visits hour (Format HH:MM XM, for example: 08:00 am)";
                                    readonly type: "string";
                                    readonly examples: readonly ["03:00 am"];
                                };
                                readonly toHour: {
                                    readonly description: "End visitation hour (Format HH:MM XM, for example: 08:00 am)";
                                    readonly type: "string";
                                    readonly examples: readonly ["11:59 pm"];
                                };
                            };
                        };
                        readonly daysOfWeek: {
                            readonly description: "A list of days represented by integers (Monday=1, Sunday=7) as specified in the request filter, which was used in the report calculation.";
                            readonly type: "array";
                            readonly items: {
                                readonly enum: readonly [1, 2, 3, 4, 5, 6, 7];
                            };
                            readonly examples: readonly [6, 7];
                        };
                        readonly distance: {
                            readonly description: "The visits considered for the report calculation by distance in miles from home <strong>or</strong> work as specified in the request filter.";
                            readonly type: "object";
                            readonly properties: {
                                readonly from: {
                                    readonly description: "The origin from where the distance will be measured.\n\n`home` `work`";
                                    readonly type: "string";
                                    readonly enum: readonly ["home", "work"];
                                    readonly examples: readonly ["home"];
                                };
                                readonly values: {
                                    readonly description: "Object representation of the distance range<br/>lt - less than<br/>le - less than or equal to<br/>eq - equal to<br/>ge - greater than or equal to<br/>gt - greater than.";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly le: {
                                            readonly type: "number";
                                            readonly examples: readonly [100];
                                        };
                                        readonly ge: {
                                            readonly type: "number";
                                        };
                                        readonly lt: {
                                            readonly type: "number";
                                            readonly examples: readonly [250];
                                        };
                                        readonly gt: {
                                            readonly type: "number";
                                            readonly examples: readonly [10];
                                        };
                                        readonly eq: {
                                            readonly type: "number";
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                readonly visitDurationSegmentation: {
                    readonly description: "The default visit duration segmentation is returned when the report calculation uses the default segmentation duration.\n\n`under10Min` `10MinOrLonger` `allVisits` `mixedSegments`";
                    readonly title: "Visit Duration Segmentation";
                    readonly type: "string";
                    readonly enum: readonly ["under10Min", "10MinOrLonger", "allVisits", "mixedSegments"];
                    readonly examples: readonly ["10MinOrLonger"];
                };
                readonly favoritesPlacesArray: {
                    readonly description: "The list of most visited places by the visitors to the requested POI";
                    readonly type: "array";
                    readonly items: {
                        readonly title: "Favorite Places Entity Info";
                        readonly type: "object";
                        readonly properties: {
                            readonly address: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly city: {
                                        readonly type: "string";
                                        readonly description: "Entity City";
                                        readonly examples: readonly ["Milpitas"];
                                    };
                                    readonly state: {
                                        readonly type: "string";
                                        readonly description: "Entity State";
                                        readonly examples: readonly ["California"];
                                    };
                                    readonly countryCode: {
                                        readonly type: "string";
                                        readonly description: "Entity Country Code";
                                        readonly examples: readonly ["US"];
                                    };
                                    readonly streetName: {
                                        readonly type: "string";
                                        readonly description: "Entity Street Name";
                                        readonly examples: readonly ["Ranch Dr"];
                                    };
                                    readonly formattedAddress: {
                                        readonly type: "string";
                                        readonly description: "Entity Address";
                                        readonly examples: readonly ["301 Ranch Dr, Milpitas, CA, United States"];
                                    };
                                    readonly shortFormattedAddress: {
                                        readonly type: "string";
                                        readonly description: "Entity Address";
                                        readonly examples: readonly ["Ranch Dr, Milpitas, CA"];
                                    };
                                    readonly zipCode: {
                                        readonly type: "string";
                                        readonly description: "Entity Zip Code";
                                        readonly examples: readonly ["95035"];
                                    };
                                };
                            };
                            readonly isFlagged: {
                                readonly type: "boolean";
                                readonly description: "The Entity Data Is Incomplete";
                                readonly examples: readonly [false];
                            };
                            readonly regions: {
                                readonly type: "object";
                                readonly description: "The regions in which the property is included";
                                readonly properties: {
                                    readonly dma: {
                                        readonly type: "object";
                                        readonly description: "The Entity Designated Market Area";
                                        readonly properties: {
                                            readonly code: {
                                                readonly type: "string";
                                                readonly examples: readonly [807];
                                            };
                                            readonly name: {
                                                readonly type: "string";
                                                readonly examples: readonly ["San Francisco-Oakland-San Jose, CA"];
                                            };
                                        };
                                    };
                                    readonly state: {
                                        readonly type: "object";
                                        readonly description: "Entity State";
                                        readonly properties: {
                                            readonly code: {
                                                readonly type: "string";
                                                readonly examples: readonly ["CA"];
                                            };
                                            readonly name: {
                                                readonly type: "string";
                                                readonly examples: readonly ["California"];
                                            };
                                        };
                                    };
                                    readonly cbsa: {
                                        readonly type: "object";
                                        readonly description: "The Entity Core-Based Statistical Areas";
                                        readonly properties: {
                                            readonly code: {
                                                readonly type: "string";
                                                readonly examples: readonly ["41940"];
                                            };
                                            readonly name: {
                                                readonly type: "string";
                                                readonly examples: readonly ["San Jose-Sunnyvale-Santa Clara, CA Metro Area"];
                                            };
                                        };
                                    };
                                };
                            };
                            readonly apiId: {
                                readonly type: "string";
                                readonly description: "Placer API Entity Id";
                                readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                            };
                            readonly name: {
                                readonly type: "string";
                                readonly description: "Entity Name";
                                readonly examples: readonly ["Walmart"];
                            };
                            readonly entityId: {
                                readonly type: "string";
                                readonly description: "Entity ID";
                                readonly examples: readonly ["7d55054520e387813d764b03"];
                            };
                            readonly entityType: {
                                readonly type: "string";
                                readonly enum: readonly ["venue", "complex", "chain"];
                                readonly description: "Entity Type (i.e. venue, complex etc.)\n\n`venue` `complex` `chain`";
                                readonly examples: readonly ["venue"];
                            };
                            readonly categoryInfo: {
                                readonly type: "object";
                                readonly description: "Property’s categorization";
                                readonly properties: {
                                    readonly category: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Fast Food & QSR"];
                                    };
                                    readonly group: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Dining"];
                                    };
                                    readonly subCategory: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Pizze Place"];
                                    };
                                };
                            };
                            readonly estimatedNumberOfCustomers: {
                                readonly type: "integer";
                                readonly description: "Estimated foot traffic during the requested period, when associated with visitation to the queried POI";
                                readonly examples: readonly [1234];
                            };
                            readonly percentage: {
                                readonly type: "number";
                                readonly format: "float";
                                readonly description: "The percentage of visitors to the requested venue also visited this property during the requested period";
                                readonly examples: readonly [48.92];
                                readonly minimum: -3.402823669209385e+38;
                                readonly maximum: 3.402823669209385e+38;
                            };
                            readonly distanceInMiles: {
                                readonly type: "number";
                                readonly format: "float";
                                readonly description: "The distance between this property to the queried POI in Miles.";
                                readonly examples: readonly [12.43];
                                readonly minimum: -3.402823669209385e+38;
                                readonly maximum: 3.402823669209385e+38;
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrorBadRequest";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostV1ReportsLoyaltyVisitsFrequency: {
    readonly body: {
        readonly title: "Visits Frequency Request";
        readonly type: "object";
        readonly required: readonly ["startDate", "endDate", "apiId"];
        readonly properties: {
            readonly startDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data start date. Format YYYY-MM-DD";
                readonly examples: readonly ["2020-12-01"];
            };
            readonly endDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data end date. Format YYYY-MM-DD";
                readonly examples: readonly ["2021-05-31"];
            };
            readonly apiId: {
                readonly type: "string";
                readonly description: "Placer API Entity Id";
                readonly examples: readonly ["venue:7d55054520e387813d764b03"];
            };
            readonly filter: {
                readonly description: "Filtering options for the report results.";
                readonly type: "object";
                readonly properties: {
                    readonly audienceType: {
                        readonly description: "If provided - metrics will be calculated based only on the specified types of audience.";
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                            readonly enum: readonly ["visitors", "employees", "residents"];
                        };
                        readonly examples: readonly ["visitors"];
                    };
                    readonly dwellTime: {
                        readonly description: "Metrics will be calculated considering the requested dwell time range.";
                        readonly type: "object";
                        readonly properties: {
                            readonly operator: {
                                readonly description: "Less than (<) to Greater Equal (>=)";
                                readonly type: "string";
                                readonly enum: readonly ["<", ">="];
                                readonly examples: readonly ["<"];
                            };
                            readonly value: {
                                readonly description: "The wanted dwell time";
                                readonly type: "integer";
                                readonly examples: readonly [150];
                            };
                        };
                    };
                    readonly hoursRange: {
                        readonly description: "Filter the report’s results based on visits hours range. The filter is defined by 2 strings:<br/> 1. The starting hour to filter the reports results from (Format HH:MM XM, for example: 08:00 am).<br/> 2. The end hour to filter the reports results(Format HH:MM XM, for example: 11:59 pm) .";
                        readonly type: "object";
                        readonly required: readonly ["fromHour", "toHour"];
                        readonly properties: {
                            readonly fromHour: {
                                readonly type: "string";
                                readonly examples: readonly ["03:00 am"];
                            };
                            readonly toHour: {
                                readonly type: "string";
                                readonly examples: readonly ["11:59 pm"];
                            };
                        };
                    };
                    readonly daysOfWeek: {
                        readonly description: "Filter visit calculation based on days of the week. Results will contain only requested days. Days are represented by using numbers where Monday=1 and Sunday=7. For example: in order to retrieve weekend days use the following [ 6, 7 ].";
                        readonly type: "array";
                        readonly items: {
                            readonly enum: readonly [1, 2, 3, 4, 5, 6, 7];
                        };
                        readonly examples: readonly [6, 7];
                    };
                    readonly distance: {
                        readonly description: "Filter visits by distance in miles from home <strong>or</strong> work<br/> where only visits in a given radius will be used in metrics calculation.";
                        readonly type: "object";
                        readonly properties: {
                            readonly from: {
                                readonly description: "The origin from where the distance will be measured.";
                                readonly type: "string";
                                readonly enum: readonly ["home", "work"];
                                readonly examples: readonly ["home"];
                            };
                            readonly values: {
                                readonly description: "Object representation of the distance range<br/>lt - less than<br/>le - less than or equal to<br/>eq - equal to<br/>ge - greater than or equal to<br/>gt - greater than.";
                                readonly type: "object";
                                readonly properties: {
                                    readonly le: {
                                        readonly type: "number";
                                        readonly examples: readonly [100];
                                    };
                                    readonly ge: {
                                        readonly type: "number";
                                    };
                                    readonly lt: {
                                        readonly type: "number";
                                        readonly examples: readonly [250];
                                    };
                                    readonly gt: {
                                        readonly type: "number";
                                        readonly examples: readonly [10];
                                    };
                                    readonly eq: {
                                        readonly type: "number";
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly nearbyRadius: {
                readonly type: "integer";
                readonly enum: readonly [100, 250, 500, 750, 1000];
                readonly description: "The radius requested for nearby activity report generation.</br> <strong>Note</strong>: When a value is populated for this attribute - the report will be calculated as per the <<glossary:Nearby Activity report>> logic.";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly title: "Base Response";
            readonly type: "object";
            readonly required: readonly ["requestId"];
            readonly properties: {
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
                readonly data: {
                    readonly title: "Base Report Request";
                    readonly type: "object";
                    readonly required: readonly ["startDate", "endDate", "apiId"];
                    readonly properties: {
                        readonly startDate: {
                            readonly type: "string";
                            readonly format: "date";
                            readonly description: "Queried data start date. Format YYYY-MM-DD";
                            readonly examples: readonly ["2020-12-01"];
                        };
                        readonly endDate: {
                            readonly type: "string";
                            readonly format: "date";
                            readonly description: "Queried data end date. Format YYYY-MM-DD";
                            readonly examples: readonly ["2021-05-31"];
                        };
                        readonly apiId: {
                            readonly type: "string";
                            readonly description: "Placer API Entity Id";
                            readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                        };
                        readonly avgVisitsPerCustomer: {
                            readonly type: "number";
                            readonly format: "float";
                            readonly description: "The average number of visits for per visitor to the POI";
                            readonly examples: readonly [1.88];
                            readonly minimum: -3.402823669209385e+38;
                            readonly maximum: 3.402823669209385e+38;
                        };
                        readonly medianVisitsPerCustomer: {
                            readonly type: "integer";
                            readonly description: "The median number of visits for per visitor to the POI";
                            readonly examples: readonly [1];
                        };
                        readonly bins: {
                            readonly type: "array";
                            readonly description: "The array represents bins for the number of visits. Each bin represents visits with frequency value between current bin value and the next. E.g. Bin #2 has a value of 2 and bin #3 has a value of 3. So in bin #2 represent the visits that occurred exactly 2 times. But bin #10 has the value of 10, and bin #11 has the value of 15. So bin #10 will include all the visits that occurred 10 times or more, but less than 15 times. The last bin is unbounded.";
                            readonly items: {
                                readonly type: "integer";
                            };
                            readonly examples: readonly [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 30];
                        };
                        readonly visitors: {
                            readonly type: "array";
                            readonly description: "The estimated number of unique visitors to the POI correlated with the bins array.";
                            readonly items: {
                                readonly type: "integer";
                            };
                            readonly examples: readonly [195397, 42348, 20053, 9578, 6046, 3337, 2013, 1394, 1282, 3195, 1163, 385, 219];
                        };
                        readonly visitorsPercentage: {
                            readonly type: "array";
                            readonly description: "The % of unique visitors that visited the POI correlated with the bins array.";
                            readonly items: {
                                readonly type: "number";
                                readonly format: "float";
                                readonly minimum: -3.402823669209385e+38;
                                readonly maximum: 3.402823669209385e+38;
                            };
                            readonly examples: readonly [68.22, 14.79, 7, 3.34, 2.11, 1.17, 0.7, 0.49, 0.45, 1.12, 0.41, 0.13, 0.08];
                        };
                        readonly visits: {
                            readonly type: "array";
                            readonly description: "The estimated number of visits to the POI correlated with the bins array.";
                            readonly items: {
                                readonly type: "integer";
                            };
                            readonly examples: readonly [195397, 84696, 60159, 38311, 30230, 20025, 14089, 11151, 11534, 35719, 19090, 8790, 10029];
                        };
                        readonly visitsPercentage: {
                            readonly type: "array";
                            readonly description: "The % of visits that visited the POI correlated with the bins array.";
                            readonly items: {
                                readonly type: "number";
                                readonly format: "float";
                                readonly minimum: -3.402823669209385e+38;
                                readonly maximum: 3.402823669209385e+38;
                            };
                            readonly examples: readonly [36.24, 15.71, 11.16, 7.1, 5.61, 3.71, 2.61, 2.07, 2.14, 6.62, 3.54, 1.63, 1.86];
                        };
                        readonly nearbyRadius: {
                            readonly type: "integer";
                            readonly enum: readonly [100, 250, 500, 750, 1000];
                            readonly description: "The radius requested for nearby activity report generation.</br> <strong>Note</strong>: When a value is populated for this attribute - the report will be calculated as per the <<glossary:Nearby Activity report>> logic.\n\n`100` `250` `500` `750` `1000`";
                        };
                    };
                };
                readonly filters: {
                    readonly type: "object";
                    readonly properties: {
                        readonly audienceType: {
                            readonly description: "The list of audiences that is specified in the request filter.";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                                readonly enum: readonly ["visitors", "employees", "residents"];
                                readonly description: "`visitors` `employees` `residents`";
                            };
                            readonly examples: readonly ["visitors"];
                        };
                        readonly dwellTime: {
                            readonly description: "The dwell time filter specified in the request, in case it was utilized.<br/> For example: “< 100” or “>= 10”";
                            readonly type: "object";
                            readonly properties: {
                                readonly operator: {
                                    readonly description: "Represents the operator used for defining the dwell time range for filtering the report data\n\n`<` `>=`";
                                    readonly type: "string";
                                    readonly enum: readonly ["<", ">="];
                                    readonly examples: readonly ["<"];
                                };
                                readonly value: {
                                    readonly description: "Represents the number of minutes referred to when defining the dwell time range for filtering the report data";
                                    readonly type: "integer";
                                    readonly examples: readonly [150];
                                };
                            };
                        };
                        readonly hoursRange: {
                            readonly description: "The hours range that is specified in the request filter.";
                            readonly type: "object";
                            readonly properties: {
                                readonly fromHour: {
                                    readonly description: "Start visits hour (Format HH:MM XM, for example: 08:00 am)";
                                    readonly type: "string";
                                    readonly examples: readonly ["03:00 am"];
                                };
                                readonly toHour: {
                                    readonly description: "End visitation hour (Format HH:MM XM, for example: 08:00 am)";
                                    readonly type: "string";
                                    readonly examples: readonly ["11:59 pm"];
                                };
                            };
                        };
                        readonly daysOfWeek: {
                            readonly description: "A list of days represented by integers (Monday=1, Sunday=7) as specified in the request filter, which was used in the report calculation.";
                            readonly type: "array";
                            readonly items: {
                                readonly enum: readonly [1, 2, 3, 4, 5, 6, 7];
                            };
                            readonly examples: readonly [6, 7];
                        };
                        readonly distance: {
                            readonly description: "The visits considered for the report calculation by distance in miles from home <strong>or</strong> work as specified in the request filter.";
                            readonly type: "object";
                            readonly properties: {
                                readonly from: {
                                    readonly description: "The origin from where the distance will be measured.\n\n`home` `work`";
                                    readonly type: "string";
                                    readonly enum: readonly ["home", "work"];
                                    readonly examples: readonly ["home"];
                                };
                                readonly values: {
                                    readonly description: "Object representation of the distance range<br/>lt - less than<br/>le - less than or equal to<br/>eq - equal to<br/>ge - greater than or equal to<br/>gt - greater than.";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly le: {
                                            readonly type: "number";
                                            readonly examples: readonly [100];
                                        };
                                        readonly ge: {
                                            readonly type: "number";
                                        };
                                        readonly lt: {
                                            readonly type: "number";
                                            readonly examples: readonly [250];
                                        };
                                        readonly gt: {
                                            readonly type: "number";
                                            readonly examples: readonly [10];
                                        };
                                        readonly eq: {
                                            readonly type: "number";
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                readonly visitDurationSegmentation: {
                    readonly description: "The default visit duration segmentation is returned when the report calculation uses the default segmentation duration.\n\n`under10Min` `10MinOrLonger` `allVisits` `mixedSegments`";
                    readonly title: "Visit Duration Segmentation";
                    readonly type: "string";
                    readonly enum: readonly ["under10Min", "10MinOrLonger", "allVisits", "mixedSegments"];
                    readonly examples: readonly ["10MinOrLonger"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "202": {
            readonly title: "InProgress";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrorBadRequest";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostV1ReportsRankingIndexCloselyRanked: {
    readonly body: {
        readonly title: "Ranking Index Closely Ranked Request";
        readonly type: "object";
        readonly required: readonly ["apiId", "metric", "period", "region", "scope"];
        readonly properties: {
            readonly apiId: {
                readonly type: "string";
                readonly description: "Placer API Entity Id";
                readonly examples: readonly ["venue:7d55054520e387813d764b03"];
            };
            readonly region: {
                readonly enum: readonly ["5", "10", "15", "30", "50", "nationwide", "state", "dma", "cbsa"];
                readonly default: 15;
                readonly description: "Region to be set for ranking index";
            };
            readonly period: {
                readonly description: "The time period for which the <<glossary:Ranking>> will be calculated. Cannot be used along with startDate and endDate";
                readonly title: "period";
                readonly type: "string";
                readonly enum: readonly ["last3Months", "last6Months", "last12Months", "lastWeek", "lastMonth", "lastQuarter", "yearToDate", "year2018", "year2019", "year2020", "year2021", "year2022", "year2023", "year2024"];
                readonly examples: readonly ["lastWeek"];
            };
            readonly scope: {
                readonly type: "string";
                readonly enum: readonly ["chain", "category", "groupCategory"];
                readonly default: "category";
                readonly examples: readonly ["category"];
            };
            readonly metric: {
                readonly type: "string";
                readonly enum: readonly ["visitsPerSqft", "visits"];
                readonly default: "visits";
                readonly examples: readonly ["visits"];
            };
            readonly resultsAmount: {
                readonly type: "integer";
                readonly minimum: 1;
                readonly maximum: 1000;
                readonly default: 100;
                readonly description: "The amount of results returned in the response - half of the results are the properties which are ranked higher than the requested property, and half are ranked lower. By default 100 results will be retrieved.";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly oneOf: readonly [{
                readonly type: "object";
                readonly properties: {
                    readonly totalRanked: {
                        readonly description: "The total number of properties within the scope and region selected, from which the <<glossary:Ranking>> will be conducted. For example: the requested property is ranked 550 out of 7500 (= total number of records) properties within the same chain(= scope) in the same state(= region).";
                        readonly type: "integer";
                        readonly examples: readonly [123];
                    };
                    readonly rank: {
                        readonly description: "The rank of the requested POI";
                        readonly type: "integer";
                        readonly examples: readonly [65];
                    };
                    readonly region: {
                        readonly description: "The requested region";
                    };
                    readonly scope: {
                        readonly description: "The requested scope";
                        readonly type: "string";
                        readonly examples: readonly ["category"];
                    };
                    readonly metricType: {
                        readonly description: "The requested metric";
                        readonly type: "string";
                        readonly examples: readonly ["visits"];
                    };
                    readonly visits: {
                        readonly description: "The estimated foot traffic at the requested property per the requested parameters";
                        readonly type: "number";
                        readonly examples: readonly [12000];
                    };
                    readonly rankingIndexArray: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly properties: {
                                readonly apiId: {
                                    readonly type: "string";
                                    readonly description: "Placer API Entity Id";
                                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                                };
                                readonly name: {
                                    readonly type: "string";
                                    readonly examples: readonly ["entity name"];
                                };
                                readonly address: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly city: {
                                            readonly type: "string";
                                            readonly description: "Entity City";
                                            readonly examples: readonly ["Milpitas"];
                                        };
                                        readonly state: {
                                            readonly type: "string";
                                            readonly description: "Entity State";
                                            readonly examples: readonly ["California"];
                                        };
                                        readonly countryCode: {
                                            readonly type: "string";
                                            readonly description: "Entity Country Code";
                                            readonly examples: readonly ["US"];
                                        };
                                        readonly streetName: {
                                            readonly type: "string";
                                            readonly description: "Entity Street Name";
                                            readonly examples: readonly ["Ranch Dr"];
                                        };
                                        readonly formattedAddress: {
                                            readonly type: "string";
                                            readonly description: "Entity Address";
                                            readonly examples: readonly ["301 Ranch Dr, Milpitas, CA, United States"];
                                        };
                                        readonly shortFormattedAddress: {
                                            readonly type: "string";
                                            readonly description: "Entity Address";
                                            readonly examples: readonly ["Ranch Dr, Milpitas, CA"];
                                        };
                                        readonly zipCode: {
                                            readonly type: "string";
                                            readonly description: "Entity Zip Code";
                                            readonly examples: readonly ["95035"];
                                        };
                                        readonly country: {
                                            readonly type: "string";
                                            readonly description: "Entity Country";
                                            readonly examples: readonly ["United States"];
                                        };
                                        readonly address: {
                                            readonly type: "string";
                                            readonly description: "Entity Address";
                                            readonly examples: readonly ["301 Ranch Dr"];
                                        };
                                    };
                                };
                                readonly rank: {
                                    readonly type: "integer";
                                    readonly examples: readonly [90];
                                };
                                readonly visits: {
                                    readonly type: "number";
                                    readonly examples: readonly [105463];
                                };
                            };
                        };
                    };
                    readonly visitDurationSegmentation: {
                        readonly description: "Represents the requested visit duration segmentation.<br> If the default visit duration segmentation is requested, the visitDurationSegmentation will display the actual segment.<br>\nIn cases where the default segment was requested for a chain, in which the list of entities used different default segments for the report calculation, the visitDurationSegmentation will be set to 'mixedSegments'.\n\n`under10Min` `10MinOrLonger` `allVisits` `mixedSegments`";
                        readonly title: "Visit Duration Segmentation";
                        readonly type: "string";
                        readonly enum: readonly ["under10Min", "10MinOrLonger", "allVisits", "mixedSegments"];
                        readonly examples: readonly ["10MinOrLonger"];
                    };
                };
            }, {
                readonly properties: {
                    readonly region: {
                        readonly description: "The requested region";
                    };
                    readonly scope: {
                        readonly description: "The requested scope";
                        readonly type: "string";
                        readonly examples: readonly ["category"];
                    };
                    readonly metricType: {
                        readonly description: "The requested metric";
                        readonly type: "string";
                        readonly examples: readonly ["visits"];
                    };
                    readonly rankError: {
                        readonly type: "string";
                        readonly description: "The error that was occuerd while trying to get <<glossary:Ranking>> for that entity";
                        readonly examples: readonly ["The ranking is unavailable for this entity with the specified parameters."];
                    };
                };
                readonly type: "object";
            }];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrorBadRequest";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostV1ReportsRankingIndexTopRanking: {
    readonly body: {
        readonly title: "Ranking Index Top Ranking Request";
        readonly type: "object";
        readonly required: readonly ["apiId", "metric", "period", "region", "scope"];
        readonly properties: {
            readonly apiId: {
                readonly type: "string";
                readonly description: "Placer API Entity Id";
                readonly examples: readonly ["venue:7d55054520e387813d764b03"];
            };
            readonly region: {
                readonly enum: readonly ["5", "10", "15", "30", "50", "nationwide", "state", "dma", "cbsa"];
                readonly default: 15;
                readonly description: "Region to be set for ranking index";
            };
            readonly period: {
                readonly description: "The time period for which the <<glossary:Ranking>> will be calculated. Cannot be used along with startDate and endDate";
                readonly title: "period";
                readonly type: "string";
                readonly enum: readonly ["last3Months", "last6Months", "last12Months", "lastWeek", "lastMonth", "lastQuarter", "yearToDate", "year2018", "year2019", "year2020", "year2021", "year2022", "year2023", "year2024"];
                readonly examples: readonly ["lastWeek"];
            };
            readonly scope: {
                readonly type: "string";
                readonly enum: readonly ["chain", "category", "groupCategory"];
                readonly default: "category";
                readonly examples: readonly ["category"];
            };
            readonly metric: {
                readonly type: "string";
                readonly enum: readonly ["visitsPerSqft", "visits"];
                readonly default: "visits";
                readonly examples: readonly ["visits"];
            };
            readonly limit: {
                readonly type: "integer";
                readonly minimum: 0;
                readonly maximum: 1000;
                readonly default: 100;
                readonly description: "Number of records to be fetched";
            };
            readonly skip: {
                readonly type: "integer";
                readonly minimum: 0;
                readonly default: 0;
                readonly description: "Relevant for the chain scope only. Contains 0 in the first call, and the offset for pagination in next calls, default set to 0.";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly oneOf: readonly [{
                readonly type: "object";
                readonly properties: {
                    readonly totalRanked: {
                        readonly description: "The total number of properties within the scope and region selected, from which the <<glossary:Ranking>> will be conducted. For example: the requested property is ranked 550 out of 7500 (= total number of records) properties within the same chain(= scope) in the same state(= region).";
                        readonly type: "integer";
                        readonly examples: readonly [123];
                    };
                    readonly rank: {
                        readonly description: "The rank of the requested POI";
                        readonly type: "integer";
                        readonly examples: readonly [65];
                    };
                    readonly region: {
                        readonly description: "The requested region";
                    };
                    readonly scope: {
                        readonly description: "The requested scope";
                        readonly type: "string";
                        readonly examples: readonly ["category"];
                    };
                    readonly metricType: {
                        readonly description: "The requested metric";
                        readonly type: "string";
                        readonly examples: readonly ["visits"];
                    };
                    readonly visits: {
                        readonly description: "The estimated foot traffic at the requested property per the requested parameters";
                        readonly type: "number";
                        readonly examples: readonly [12000];
                    };
                    readonly rankingIndexArray: {
                        readonly type: "array";
                        readonly items: {
                            readonly type: "object";
                            readonly properties: {
                                readonly apiId: {
                                    readonly type: "string";
                                    readonly description: "Placer API Entity Id";
                                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                                };
                                readonly name: {
                                    readonly type: "string";
                                    readonly examples: readonly ["entity name"];
                                };
                                readonly address: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly city: {
                                            readonly type: "string";
                                            readonly description: "Entity City";
                                            readonly examples: readonly ["Milpitas"];
                                        };
                                        readonly state: {
                                            readonly type: "string";
                                            readonly description: "Entity State";
                                            readonly examples: readonly ["California"];
                                        };
                                        readonly countryCode: {
                                            readonly type: "string";
                                            readonly description: "Entity Country Code";
                                            readonly examples: readonly ["US"];
                                        };
                                        readonly streetName: {
                                            readonly type: "string";
                                            readonly description: "Entity Street Name";
                                            readonly examples: readonly ["Ranch Dr"];
                                        };
                                        readonly formattedAddress: {
                                            readonly type: "string";
                                            readonly description: "Entity Address";
                                            readonly examples: readonly ["301 Ranch Dr, Milpitas, CA, United States"];
                                        };
                                        readonly shortFormattedAddress: {
                                            readonly type: "string";
                                            readonly description: "Entity Address";
                                            readonly examples: readonly ["Ranch Dr, Milpitas, CA"];
                                        };
                                        readonly zipCode: {
                                            readonly type: "string";
                                            readonly description: "Entity Zip Code";
                                            readonly examples: readonly ["95035"];
                                        };
                                        readonly country: {
                                            readonly type: "string";
                                            readonly description: "Entity Country";
                                            readonly examples: readonly ["United States"];
                                        };
                                        readonly address: {
                                            readonly type: "string";
                                            readonly description: "Entity Address";
                                            readonly examples: readonly ["301 Ranch Dr"];
                                        };
                                    };
                                };
                                readonly rank: {
                                    readonly type: "integer";
                                    readonly examples: readonly [90];
                                };
                                readonly visits: {
                                    readonly type: "number";
                                    readonly examples: readonly [105463];
                                };
                            };
                        };
                    };
                    readonly visitDurationSegmentation: {
                        readonly description: "Represents the requested visit duration segmentation.<br> If the default visit duration segmentation is requested, the visitDurationSegmentation will display the actual segment.<br>\nIn cases where the default segment was requested for a chain, in which the list of entities used different default segments for the report calculation, the visitDurationSegmentation will be set to 'mixedSegments'.\n\n`under10Min` `10MinOrLonger` `allVisits` `mixedSegments`";
                        readonly title: "Visit Duration Segmentation";
                        readonly type: "string";
                        readonly enum: readonly ["under10Min", "10MinOrLonger", "allVisits", "mixedSegments"];
                        readonly examples: readonly ["10MinOrLonger"];
                    };
                };
            }, {
                readonly properties: {
                    readonly region: {
                        readonly description: "The requested region";
                    };
                    readonly scope: {
                        readonly description: "The requested scope";
                        readonly type: "string";
                        readonly examples: readonly ["category"];
                    };
                    readonly metricType: {
                        readonly description: "The requested metric";
                        readonly type: "string";
                        readonly examples: readonly ["visits"];
                    };
                    readonly rankError: {
                        readonly type: "string";
                        readonly description: "The error that was occuerd while trying to get <<glossary:Ranking>> for that entity";
                        readonly examples: readonly ["The ranking is unavailable for this entity with the specified parameters."];
                    };
                };
                readonly type: "object";
            }];
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrorBadRequest";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostV1ReportsRankingOverview: {
    readonly body: {
        readonly title: "Ranking Request";
        readonly description: "The endpoint return the nationwide, state, CBSA, DMA and the local distance <<glossary:Ranking>> as selected in the query params.";
        readonly type: "object";
        readonly required: readonly ["apiId", "metric", "scope"];
        readonly properties: {
            readonly apiId: {
                readonly type: "string";
                readonly description: "Placer API Entity Id";
                readonly examples: readonly ["venue:7d55054520e387813d764b03"];
            };
            readonly startDate: {
                readonly description: "The start date of the time period for which the <<glossary:Ranking>> will be calculated. Cannot be used along with period param";
                readonly type: "string";
                readonly format: "date";
                readonly examples: readonly ["2020-12-01"];
            };
            readonly endDate: {
                readonly description: "The end date of the time period for which the <<glossary:Ranking>> will be calculated. Cannot be used along with period param";
                readonly type: "string";
                readonly format: "date";
                readonly examples: readonly ["2020-12-31"];
            };
            readonly distanceMiles: {
                readonly type: "integer";
                readonly enum: readonly [5, 10, 15, 30, 50];
                readonly default: 15;
                readonly examples: readonly [15];
            };
            readonly period: {
                readonly description: "The time period for which the <<glossary:Ranking>> will be calculated. Cannot be used along with startDate and endDate";
                readonly title: "period";
                readonly type: "string";
                readonly enum: readonly ["last3Months", "last6Months", "last12Months", "lastWeek", "lastMonth", "lastQuarter", "yearToDate", "year2018", "year2019", "year2020", "year2021", "year2022", "year2023", "year2024"];
                readonly examples: readonly ["lastWeek"];
            };
            readonly scope: {
                readonly type: "string";
                readonly enum: readonly ["chain", "category", "groupCategory"];
                readonly default: "category";
                readonly examples: readonly ["category"];
            };
            readonly metric: {
                readonly type: "string";
                readonly enum: readonly ["visitsPerSqft", "visits"];
                readonly default: "visits";
                readonly examples: readonly ["visits"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly apiId: {
                    readonly type: "string";
                    readonly description: "Placer API Entity Id";
                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                };
                readonly metricType: {
                    readonly type: "string";
                    readonly examples: readonly ["visits"];
                };
                readonly info: {
                    readonly type: "object";
                    readonly properties: {
                        readonly name: {
                            readonly type: "string";
                            readonly description: "Entity name";
                            readonly examples: readonly ["Walmart"];
                        };
                        readonly entityId: {
                            readonly type: "string";
                            readonly description: "Entity ID";
                            readonly examples: readonly ["7d55054520e387813d764b03"];
                        };
                        readonly entityType: {
                            readonly type: "string";
                            readonly enum: readonly ["venue", "complex", "chain"];
                            readonly description: "Entity Type (i.e. venue, complex etc.)\n\n`venue` `complex` `chain`";
                            readonly examples: readonly ["venue"];
                        };
                        readonly flagged: {
                            readonly type: "boolean";
                            readonly description: "Flagging status for entity";
                        };
                        readonly rankedBy: {
                            readonly type: "string";
                            readonly description: "the scope which the <<glossary:Ranking>> has been ranked by";
                            readonly examples: readonly ["chain"];
                        };
                        readonly categoryInfo: {
                            readonly type: "object";
                            readonly properties: {
                                readonly category: {
                                    readonly type: "string";
                                    readonly examples: readonly ["Fast Food & QSR"];
                                };
                                readonly group: {
                                    readonly type: "string";
                                    readonly examples: readonly ["Dining"];
                                };
                                readonly subCategory: {
                                    readonly type: "string";
                                    readonly examples: readonly ["Pizze Place"];
                                };
                            };
                            readonly description: "Property’s categorization";
                        };
                        readonly parentChain: {
                            readonly type: "string";
                            readonly description: "The name of the chain that entity belongs to";
                        };
                    };
                };
                readonly ranking: {
                    readonly oneOf: readonly [{
                        readonly type: "object";
                        readonly description: "<<glossary:Ranking>> info for a property";
                        readonly properties: {
                            readonly nationwide: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly rank: {
                                        readonly type: "integer";
                                        readonly examples: readonly [4];
                                    };
                                    readonly percentile: {
                                        readonly type: "integer";
                                        readonly examples: readonly [85];
                                    };
                                    readonly rankedOutOf: {
                                        readonly type: "integer";
                                        readonly examples: readonly [1850];
                                    };
                                    readonly regionCode: {
                                        readonly type: "string";
                                        readonly examples: readonly ["US"];
                                    };
                                };
                            };
                            readonly state: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly rank: {
                                        readonly type: "integer";
                                        readonly examples: readonly [4];
                                    };
                                    readonly percentile: {
                                        readonly type: "integer";
                                        readonly examples: readonly [85];
                                    };
                                    readonly rankedOutOf: {
                                        readonly type: "integer";
                                        readonly examples: readonly [1850];
                                    };
                                    readonly regionCode: {
                                        readonly type: "string";
                                        readonly examples: readonly ["CA"];
                                    };
                                };
                            };
                            readonly dma: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly rank: {
                                        readonly type: "integer";
                                        readonly examples: readonly [4];
                                    };
                                    readonly percentile: {
                                        readonly type: "integer";
                                        readonly examples: readonly [85];
                                    };
                                    readonly rankedOutOf: {
                                        readonly type: "integer";
                                        readonly examples: readonly [1850];
                                    };
                                    readonly regionCode: {
                                        readonly type: "string";
                                        readonly examples: readonly ["510"];
                                    };
                                };
                            };
                            readonly cbsa: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly rank: {
                                        readonly type: "integer";
                                        readonly examples: readonly [4];
                                    };
                                    readonly percentile: {
                                        readonly type: "integer";
                                        readonly examples: readonly [85];
                                    };
                                    readonly rankedOutOf: {
                                        readonly type: "integer";
                                        readonly examples: readonly [1850];
                                    };
                                    readonly regionCode: {
                                        readonly type: "string";
                                        readonly examples: readonly ["34980"];
                                    };
                                };
                            };
                            readonly local: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly rank: {
                                        readonly type: "integer";
                                        readonly examples: readonly [4];
                                    };
                                    readonly percentile: {
                                        readonly type: "integer";
                                        readonly examples: readonly [85];
                                    };
                                    readonly rankedOutOf: {
                                        readonly type: "integer";
                                        readonly examples: readonly [1850];
                                    };
                                    readonly radiusMiles: {
                                        readonly type: "integer";
                                        readonly examples: readonly [15];
                                    };
                                };
                            };
                        };
                    }, {
                        readonly type: "object";
                        readonly properties: {
                            readonly rankError: {
                                readonly type: "string";
                                readonly description: "The error that was occuerd while trying to get <<glossary:Ranking>> for that entity";
                                readonly examples: readonly ["This entity if flagged/unverified"];
                            };
                        };
                    }];
                };
                readonly visitDurationSegmentation: {
                    readonly description: "Represents the requested visit duration segmentation.<br> If the default visit duration segmentation is requested, the visitDurationSegmentation will display the actual segment.<br>\nIn cases where the default segment was requested for a chain, in which the list of entities used different default segments for the report calculation, the visitDurationSegmentation will be set to 'mixedSegments'.\n\n`under10Min` `10MinOrLonger` `allVisits` `mixedSegments`";
                    readonly title: "Visit Duration Segmentation";
                    readonly type: "string";
                    readonly enum: readonly ["under10Min", "10MinOrLonger", "allVisits", "mixedSegments"];
                    readonly examples: readonly ["10MinOrLonger"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "202": {
            readonly title: "InProgress";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrorBadRequest";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostV1ReportsRankingOverviewMulti: {
    readonly body: {
        readonly title: "Ranking Request";
        readonly description: "Returns the <<glossary:Ranking>> metrics for given property in all regions.";
        readonly type: "object";
        readonly required: readonly ["apiIds", "metric", "period", "scope"];
        readonly properties: {
            readonly apiIds: {
                readonly type: "array";
                readonly minItems: 1;
                readonly maxItems: 100;
                readonly items: {
                    readonly type: "string";
                    readonly description: "Placer API Entity Id";
                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                };
            };
            readonly period: {
                readonly description: "The time period for which the <<glossary:Ranking>> will be calculated. Cannot be used along with startDate and endDate";
                readonly title: "period";
                readonly type: "string";
                readonly enum: readonly ["last3Months", "last6Months", "last12Months", "lastWeek", "lastMonth", "lastQuarter", "yearToDate", "year2018", "year2019", "year2020", "year2021", "year2022", "year2023", "year2024"];
                readonly examples: readonly ["lastWeek"];
            };
            readonly scope: {
                readonly type: "string";
                readonly enum: readonly ["chain", "category", "groupCategory"];
                readonly default: "category";
                readonly examples: readonly ["category"];
            };
            readonly metric: {
                readonly type: "string";
                readonly enum: readonly ["visitsPerSqft", "visits"];
                readonly default: "visits";
                readonly examples: readonly ["visits"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly apiId: {
                        readonly type: "string";
                        readonly description: "Placer API Entity Id";
                        readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                    };
                    readonly metricType: {
                        readonly type: "string";
                        readonly examples: readonly ["visits"];
                    };
                    readonly info: {
                        readonly type: "object";
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                                readonly description: "Entity name";
                                readonly examples: readonly ["Walmart"];
                            };
                            readonly entityId: {
                                readonly type: "string";
                                readonly description: "Entity ID";
                                readonly examples: readonly ["7d55054520e387813d764b03"];
                            };
                            readonly entityType: {
                                readonly type: "string";
                                readonly enum: readonly ["venue", "complex", "chain"];
                                readonly description: "Entity Type (i.e. venue, complex etc.)\n\n`venue` `complex` `chain`";
                                readonly examples: readonly ["venue"];
                            };
                            readonly flagged: {
                                readonly type: "boolean";
                                readonly description: "Flagging status for entity";
                            };
                            readonly rankedBy: {
                                readonly type: "string";
                                readonly description: "the scope which the <<glossary:Ranking>> has been ranked by";
                                readonly examples: readonly ["chain"];
                            };
                            readonly categoryInfo: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly category: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Fast Food & QSR"];
                                    };
                                    readonly group: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Dining"];
                                    };
                                    readonly subCategory: {
                                        readonly type: "string";
                                        readonly examples: readonly ["Pizze Place"];
                                    };
                                };
                                readonly description: "Property’s categorization";
                            };
                            readonly parentChain: {
                                readonly type: "string";
                                readonly description: "The name of the chain that entity belongs to";
                            };
                        };
                    };
                    readonly ranking: {
                        readonly oneOf: readonly [{
                            readonly type: "object";
                            readonly description: "<<glossary:Ranking>> info for a property";
                            readonly properties: {
                                readonly nationwide: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly rank: {
                                            readonly type: "integer";
                                            readonly examples: readonly [4];
                                        };
                                        readonly percentile: {
                                            readonly type: "integer";
                                            readonly examples: readonly [85];
                                        };
                                        readonly rankedOutOf: {
                                            readonly type: "integer";
                                            readonly examples: readonly [1850];
                                        };
                                        readonly regionCode: {
                                            readonly type: "string";
                                            readonly examples: readonly ["US"];
                                        };
                                    };
                                };
                                readonly state: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly rank: {
                                            readonly type: "integer";
                                            readonly examples: readonly [4];
                                        };
                                        readonly percentile: {
                                            readonly type: "integer";
                                            readonly examples: readonly [85];
                                        };
                                        readonly rankedOutOf: {
                                            readonly type: "integer";
                                            readonly examples: readonly [1850];
                                        };
                                        readonly regionCode: {
                                            readonly type: "string";
                                            readonly examples: readonly ["CA"];
                                        };
                                    };
                                };
                                readonly dma: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly rank: {
                                            readonly type: "integer";
                                            readonly examples: readonly [4];
                                        };
                                        readonly percentile: {
                                            readonly type: "integer";
                                            readonly examples: readonly [85];
                                        };
                                        readonly rankedOutOf: {
                                            readonly type: "integer";
                                            readonly examples: readonly [1850];
                                        };
                                        readonly regionCode: {
                                            readonly type: "string";
                                            readonly examples: readonly ["510"];
                                        };
                                    };
                                };
                                readonly cbsa: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly rank: {
                                            readonly type: "integer";
                                            readonly examples: readonly [4];
                                        };
                                        readonly percentile: {
                                            readonly type: "integer";
                                            readonly examples: readonly [85];
                                        };
                                        readonly rankedOutOf: {
                                            readonly type: "integer";
                                            readonly examples: readonly [1850];
                                        };
                                        readonly regionCode: {
                                            readonly type: "string";
                                            readonly examples: readonly ["34980"];
                                        };
                                    };
                                };
                            };
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly rankError: {
                                    readonly type: "string";
                                    readonly description: "The error that was occuerd while trying to get <<glossary:Ranking>> for that entity";
                                    readonly examples: readonly ["This entity if flagged/unverified"];
                                };
                            };
                        }];
                    };
                    readonly visitDurationSegmentation: {
                        readonly description: "Represents the requested visit duration segmentation.<br> If the default visit duration segmentation is requested, the visitDurationSegmentation will display the actual segment.<br>\nIn cases where the default segment was requested for a chain, in which the list of entities used different default segments for the report calculation, the visitDurationSegmentation will be set to 'mixedSegments'.\n\n`under10Min` `10MinOrLonger` `allVisits` `mixedSegments`";
                        readonly title: "Visit Duration Segmentation";
                        readonly type: "string";
                        readonly enum: readonly ["under10Min", "10MinOrLonger", "allVisits", "mixedSegments"];
                        readonly examples: readonly ["10MinOrLonger"];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrorBadRequest";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostV1ReportsRetailSalesAvgTicketSizeTrends: {
    readonly body: {
        readonly title: "Average Ticket Size Trend Request";
        readonly type: "object";
        readonly required: readonly ["startDate", "endDate", "apiId"];
        readonly properties: {
            readonly startDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data start date. Format YYYY-MM-DD";
                readonly examples: readonly ["2020-12-01"];
            };
            readonly endDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data end date. Format YYYY-MM-DD";
                readonly examples: readonly ["2021-05-31"];
            };
            readonly apiId: {
                readonly type: "string";
                readonly description: "Placer API Entity Id";
                readonly examples: readonly ["venue:7d55054520e387813d764b03"];
            };
            readonly compareType: {
                readonly description: "The chain or category trend to compare with. Can be one of:<br/> <ul> <li>None</li> <li>avg_category_in_state</li> <li>avg_category_nationwide</li>";
                readonly enum: readonly ["avg_category_in_state", "avg_category_nationwide"];
            };
            readonly granularity: {
                readonly description: "The aggregation of data requested for the report. Can be one of month, week or day.";
                readonly enum: readonly ["day", "week", "month"];
                readonly default: "month";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly title: "Avg Ticket Size Response";
            readonly type: "object";
            readonly required: readonly ["requestId"];
            readonly properties: {
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
                readonly data: {
                    readonly title: "Base Report Request";
                    readonly type: "object";
                    readonly required: readonly ["startDate", "endDate", "apiId"];
                    readonly properties: {
                        readonly startDate: {
                            readonly type: "string";
                            readonly format: "date";
                            readonly description: "Queried data start date. Format YYYY-MM-DD";
                            readonly examples: readonly ["2020-12-01"];
                        };
                        readonly endDate: {
                            readonly type: "string";
                            readonly format: "date";
                            readonly description: "Queried data end date. Format YYYY-MM-DD";
                            readonly examples: readonly ["2021-05-31"];
                        };
                        readonly apiId: {
                            readonly type: "string";
                            readonly description: "Placer API Entity Id";
                            readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                        };
                        readonly compareType: {
                            readonly description: "The chain or category trend to compare with. Can be one of:<br/> <ul> <li>None</li> <li>avg_category_in_state</li> <li>avg_category_nationwide</li>";
                            readonly enum: readonly ["avg_category_in_state", "avg_category_nationwide"];
                        };
                        readonly granularity: {
                            readonly description: "The aggregation of data requested for the report. Can be one of month, week or day.";
                            readonly enum: readonly ["day", "week", "month"];
                            readonly default: "month";
                        };
                        readonly trend: {
                            readonly type: "object";
                            readonly description: "Presents the average ticket size trends for the requested POI during the requested period based on the selected granularity.";
                            readonly properties: {
                                readonly bins: {
                                    readonly type: "array";
                                    readonly description: "Presents the sales average ticket size trends in bins based on the requested granularity (e.g. in <strong>month</strong> granularity each bin will present the first date of the month, for <strong>day</strong> granularity each bin will present each day of the report date range)";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                    readonly examples: readonly ["2022-08-01", "2022-09-01", "2022-10-01"];
                                };
                                readonly values: {
                                    readonly type: "array";
                                    readonly description: "Correlated average ticket size info values to the bins array";
                                    readonly items: {
                                        readonly type: "number";
                                        readonly examples: readonly [60222003.71, 58126656.69, 67245632.21];
                                    };
                                };
                            };
                        };
                        readonly compare: {
                            readonly type: "object";
                            readonly description: "Presents the sales average ticket size comparison trends.";
                            readonly properties: {
                                readonly bins: {
                                    readonly type: "array";
                                    readonly description: "Presents the sales in bins based on the requested granularity (e.g. in <b>month</b> granularity each bin will present the first date of the month, for <b>day</b> granularity each bin will present each day of the report date range)";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                    readonly examples: readonly ["2022-08-01", "2022-09-01", "2022-10-01"];
                                };
                                readonly values: {
                                    readonly type: "array";
                                    readonly description: "Correlated sales info values to the bins array";
                                    readonly items: {
                                        readonly type: "number";
                                    };
                                    readonly examples: readonly [60222523.71, 56326656.69, 47654112.81];
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrorBadRequest";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostV1ReportsRetailSalesDays: {
    readonly body: {
        readonly title: "Sales Days Trends Request";
        readonly type: "object";
        readonly required: readonly ["startDate", "endDate", "apiId"];
        readonly properties: {
            readonly startDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data start date. Format YYYY-MM-DD";
                readonly examples: readonly ["2020-12-01"];
            };
            readonly endDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data end date. Format YYYY-MM-DD";
                readonly examples: readonly ["2021-05-31"];
            };
            readonly apiId: {
                readonly type: "string";
                readonly description: "Placer API Entity Id";
                readonly examples: readonly ["venue:7d55054520e387813d764b03"];
            };
            readonly aggregation: {
                readonly type: "string";
                readonly enum: readonly ["full_week", "weekday_weekend"];
                readonly default: "full_week";
                readonly description: "For the day of week insights you can choose any of the following aggregation options:<br/> <ul> <li> full_week - The aggregation is done per each day of the week</li> <li>weekday_weekend - The aggregation is done for the weekdays altogether and the weekend altogether.</li> </ul>";
                readonly examples: readonly ["full_week"];
            };
            readonly metricType: {
                readonly type: "string";
                readonly enum: readonly ["sales", "avg_sales", "sales_pct", "sales_sq_ft", "transactions", "transactions_pct", "avg_ticket_size"];
                readonly default: "sales";
                readonly description: "The metric for which you wish to get the day of week aggregation for:<br/> <ul> <li> sales: The dollar value (USD) of all sales during your selected aggregation.</li> <li> avg_sales: The dollar value (USD) of average sales per day during your selected aggregation.</li> <li> sales_pct: The percentage of total sales which occurred during your selected aggregation.</li> <li> sales_sq_ft: The total value of sales per square foot at the venue examined, during your selected aggregation.</li> <li> transactions: The total number of individual transactions which took place at the property examined during your selected aggregation.</li> <li> transactions_pct:The percentage of total transactions which occurred during your selected .aggregation.</li> <li> avg_ticket_size: The average dollar amount of sales per transaction generated at the venues in your report, per your selected aggregation.</li> </ul>";
                readonly examples: readonly ["sales"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly title: "Sales Days Trends Response";
            readonly type: "object";
            readonly required: readonly ["requestId"];
            readonly properties: {
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
                readonly data: {
                    readonly title: "Base Report Request";
                    readonly type: "object";
                    readonly required: readonly ["startDate", "endDate", "apiId"];
                    readonly properties: {
                        readonly startDate: {
                            readonly type: "string";
                            readonly format: "date";
                            readonly description: "Queried data start date. Format YYYY-MM-DD";
                            readonly examples: readonly ["2020-12-01"];
                        };
                        readonly endDate: {
                            readonly type: "string";
                            readonly format: "date";
                            readonly description: "Queried data end date. Format YYYY-MM-DD";
                            readonly examples: readonly ["2021-05-31"];
                        };
                        readonly apiId: {
                            readonly type: "string";
                            readonly description: "Placer API Entity Id";
                            readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                        };
                        readonly aggregation: {
                            readonly type: "string";
                            readonly enum: readonly ["full_week", "weekday_weekend"];
                            readonly default: "full_week";
                            readonly description: "For the day of week insights you can choose any of the following aggregation options:<br/> <ul> <li> full_week - The aggregation is done per each day of the week</li> <li>weekday_weekend - The aggregation is done for the weekdays altogether and the weekend altogether.</li> </ul>\n\n`full_week` `weekday_weekend`";
                            readonly examples: readonly ["full_week"];
                        };
                        readonly metricType: {
                            readonly type: "string";
                            readonly enum: readonly ["sales", "avg_sales", "sales_pct", "sales_sq_ft", "transactions", "transactions_pct", "avg_ticket_size"];
                            readonly default: "sales";
                            readonly description: "The metric for which you wish to get the day of week aggregation for:<br/> <ul> <li> sales: The dollar value (USD) of all sales during your selected aggregation.</li> <li> avg_sales: The dollar value (USD) of average sales per day during your selected aggregation.</li> <li> sales_pct: The percentage of total sales which occurred during your selected aggregation.</li> <li> sales_sq_ft: The total value of sales per square foot at the venue examined, during your selected aggregation.</li> <li> transactions: The total number of individual transactions which took place at the property examined during your selected aggregation.</li> <li> transactions_pct:The percentage of total transactions which occurred during your selected .aggregation.</li> <li> avg_ticket_size: The average dollar amount of sales per transaction generated at the venues in your report, per your selected aggregation.</li> </ul>\n\n`sales` `avg_sales` `sales_pct` `sales_sq_ft` `transactions` `transactions_pct` `avg_ticket_size`";
                            readonly examples: readonly ["sales"];
                        };
                        readonly dayOfWeek: {
                            readonly type: "object";
                            readonly properties: {
                                readonly bins: {
                                    readonly type: "array";
                                    readonly description: "This array defines the relevant bins based on the aggregation requested.<br/> Either Monday-Sunday or weekday/weekend.";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                    readonly examples: readonly ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
                                };
                                readonly values: {
                                    readonly type: "array";
                                    readonly description: "The corresponding values to the bins (array index based).";
                                    readonly items: {
                                        readonly type: "number";
                                    };
                                    readonly examples: readonly [23332019.04, 20430526.44, 20256899.97, 24597150.08, 30653813.68, 30801899.86, 27723322.83];
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrorBadRequest";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostV1ReportsRetailSalesOverview: {
    readonly body: {
        readonly title: "Base Report Request";
        readonly type: "object";
        readonly required: readonly ["startDate", "endDate", "apiId"];
        readonly properties: {
            readonly startDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data start date. Format YYYY-MM-DD";
                readonly examples: readonly ["2020-12-01"];
            };
            readonly endDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data end date. Format YYYY-MM-DD";
                readonly examples: readonly ["2021-05-31"];
            };
            readonly apiId: {
                readonly type: "string";
                readonly description: "Placer API Entity Id";
                readonly examples: readonly ["venue:7d55054520e387813d764b03"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly title: "Sales Overview Response";
            readonly type: "object";
            readonly required: readonly ["requestId"];
            readonly properties: {
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
                readonly data: {
                    readonly title: "Base Report Request";
                    readonly type: "object";
                    readonly required: readonly ["startDate", "endDate", "apiId"];
                    readonly properties: {
                        readonly startDate: {
                            readonly type: "string";
                            readonly format: "date";
                            readonly description: "Queried data start date. Format YYYY-MM-DD";
                            readonly examples: readonly ["2020-12-01"];
                        };
                        readonly endDate: {
                            readonly type: "string";
                            readonly format: "date";
                            readonly description: "Queried data end date. Format YYYY-MM-DD";
                            readonly examples: readonly ["2021-05-31"];
                        };
                        readonly apiId: {
                            readonly type: "string";
                            readonly description: "Placer API Entity Id";
                            readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                        };
                        readonly salesOverview: {
                            readonly type: "array";
                            readonly description: "In this array the following overview of various sales metrics calculated for the whole period.";
                            readonly items: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly valueType: {
                                        readonly type: "string";
                                        readonly enum: readonly ["currency", "number"];
                                        readonly description: "The type of the value provided either 'currency' or 'number'\n\n`currency` `number`";
                                    };
                                    readonly metricName: {
                                        readonly type: "string";
                                        readonly description: "This will include any of the following values for each array instance:<br/> ● sales: Total sales for the requested period<br/> ● sales_sq_ft: Total sales per SQ FT for the requested period<br/> ● transactions: Total number of transactions done during the requested period<br/> ● avg_daily_unique_customers: Average daily unique visitors amount for the requested period<br/> ● avg_monthly_unique_customers: Average monthly unique visitors amount for the requested period<br/> ● avg_weekly_unique_customers: Average weekly unique visitors amount for the requested period<br/> ● avg_ticket_size: Average ticket size for the requested period";
                                    };
                                    readonly value: {
                                        readonly description: "The relevant metric value calculated for the whole period.";
                                        readonly type: "number";
                                        readonly format: "float";
                                        readonly minimum: -3.402823669209385e+38;
                                        readonly maximum: 3.402823669209385e+38;
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrorBadRequest";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostV1ReportsRetailSalesSalesTrends: {
    readonly body: {
        readonly title: "Sales Trend Request";
        readonly type: "object";
        readonly required: readonly ["startDate", "endDate", "apiId"];
        readonly properties: {
            readonly startDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data start date. Format YYYY-MM-DD";
                readonly examples: readonly ["2020-12-01"];
            };
            readonly endDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data end date. Format YYYY-MM-DD";
                readonly examples: readonly ["2021-05-31"];
            };
            readonly apiId: {
                readonly type: "string";
                readonly description: "Placer API Entity Id";
                readonly examples: readonly ["venue:7d55054520e387813d764b03"];
            };
            readonly metric: {
                readonly description: "The metric requested for the report. Can be one of the following:</br> <strong>sales </strong>- The total  dollar value (USD) of all sales generated for the requested venue.</br> <strong>sales_sq_ft</strong> - The total dollar value (USD) of sales per SQ FT generated for the requested venue.";
                readonly enum: readonly ["sales", "sales_sq_ft"];
                readonly default: "sales";
            };
            readonly granularity: {
                readonly description: "The aggregation of data requested for the report. Can be one of month, week or day.";
                readonly enum: readonly ["day", "week", "month"];
                readonly default: "month";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly title: "Sales Trend Response";
            readonly type: "object";
            readonly required: readonly ["requestId"];
            readonly properties: {
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
                readonly data: {
                    readonly title: "Base Report Request";
                    readonly type: "object";
                    readonly required: readonly ["startDate", "endDate", "apiId"];
                    readonly properties: {
                        readonly startDate: {
                            readonly type: "string";
                            readonly format: "date";
                            readonly description: "Queried data start date. Format YYYY-MM-DD";
                            readonly examples: readonly ["2020-12-01"];
                        };
                        readonly endDate: {
                            readonly type: "string";
                            readonly format: "date";
                            readonly description: "Queried data end date. Format YYYY-MM-DD";
                            readonly examples: readonly ["2021-05-31"];
                        };
                        readonly apiId: {
                            readonly type: "string";
                            readonly description: "Placer API Entity Id";
                            readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                        };
                        readonly metric: {
                            readonly description: "The metric requested for the report. Can be one of the following:</br> <strong>sales </strong>- The total  dollar value (USD) of all sales generated for the requested venue.</br> <strong>sales_sq_ft</strong> - The total dollar value (USD) of sales per SQ FT generated for the requested venue.";
                            readonly enum: readonly ["sales", "sales_sq_ft"];
                            readonly default: "sales";
                        };
                        readonly granularity: {
                            readonly description: "The aggregation of data requested for the report. Can be one of month, week or day.";
                            readonly enum: readonly ["day", "week", "month"];
                            readonly default: "month";
                        };
                        readonly annualSales: {
                            readonly description: "Presents the annual sales in bins  per year including last 3 years and last 12 months.";
                            readonly type: "object";
                            readonly properties: {
                                readonly bins: {
                                    readonly type: "array";
                                    readonly description: "Array of bins specifying the years which the sales info in the values array refer to";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                    readonly examples: readonly ["2021", "2022", "2023", "1y"];
                                };
                                readonly values: {
                                    readonly type: "array";
                                    readonly description: "Correlated sales info values to the bins array";
                                    readonly items: {
                                        readonly type: "number";
                                    };
                                    readonly examples: readonly [60222003.71, 58126656.69, 54654112.81, 67245632.21];
                                };
                            };
                        };
                        readonly trend: {
                            readonly description: "Presents the sales divided into bins based on the requested granularity.";
                            readonly type: "object";
                            readonly properties: {
                                readonly bins: {
                                    readonly type: "array";
                                    readonly description: "Presents the sales in bins based on the requested granularity (e.g. in <b>month</b> granularity each bin will present the first date of the month, for <b>day</b> granularity each bin will present each day of the report date range)";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                    readonly examples: readonly ["2022-08-01", "2022-09-01", "2022-10-01"];
                                };
                                readonly values: {
                                    readonly type: "array";
                                    readonly description: "Correlated sales info values to the bins array";
                                    readonly items: {
                                        readonly type: "number";
                                    };
                                    readonly examples: readonly [60222003.71, 58126656.69, 54654112.81];
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrorBadRequest";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostV1ReportsRetailSalesTransactionTrends: {
    readonly body: {
        readonly title: "Transaction Trend Request";
        readonly type: "object";
        readonly required: readonly ["startDate", "endDate", "apiId"];
        readonly properties: {
            readonly startDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data start date. Format YYYY-MM-DD";
                readonly examples: readonly ["2020-12-01"];
            };
            readonly endDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data end date. Format YYYY-MM-DD";
                readonly examples: readonly ["2021-05-31"];
            };
            readonly apiId: {
                readonly type: "string";
                readonly description: "Placer API Entity Id";
                readonly examples: readonly ["venue:7d55054520e387813d764b03"];
            };
            readonly compareType: {
                readonly description: "The chain or category trend to compare with<br/> <ul> <li>None</il> <li>avg_chain_in_state</li> <li>avg_chain_nationwide</li> <li>avg_category_in_state</li> <li>avg_category_nationwide</li> </ul>";
                readonly enum: readonly ["avg_chain_in_state", "avg_chain_nationwide", "avg_category_in_state", "avg_category_nationwide"];
            };
            readonly granularity: {
                readonly description: "The aggregation of data requested for the report. Can be one of month, week or day.";
                readonly enum: readonly ["day", "week", "month"];
                readonly default: "month";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly title: "Transaction Trend Response";
            readonly type: "object";
            readonly required: readonly ["requestId"];
            readonly properties: {
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
                readonly data: {
                    readonly title: "Base Report Request";
                    readonly type: "object";
                    readonly required: readonly ["startDate", "endDate", "apiId"];
                    readonly properties: {
                        readonly startDate: {
                            readonly type: "string";
                            readonly format: "date";
                            readonly description: "Queried data start date. Format YYYY-MM-DD";
                            readonly examples: readonly ["2020-12-01"];
                        };
                        readonly endDate: {
                            readonly type: "string";
                            readonly format: "date";
                            readonly description: "Queried data end date. Format YYYY-MM-DD";
                            readonly examples: readonly ["2021-05-31"];
                        };
                        readonly apiId: {
                            readonly type: "string";
                            readonly description: "Placer API Entity Id";
                            readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                        };
                        readonly compareType: {
                            readonly description: "The chain or category trend to compare with<br/> <ul> <li>None</il> <li>avg_chain_in_state</li> <li>avg_chain_nationwide</li> <li>avg_category_in_state</li> <li>avg_category_nationwide</li> </ul>";
                            readonly enum: readonly ["avg_chain_in_state", "avg_chain_nationwide", "avg_category_in_state", "avg_category_nationwide"];
                        };
                        readonly granularity: {
                            readonly description: "The aggregation of data requested for the report. Can be one of month, week or day.";
                            readonly enum: readonly ["day", "week", "month"];
                            readonly default: "month";
                        };
                        readonly trend: {
                            readonly type: "object";
                            readonly properties: {
                                readonly bins: {
                                    readonly type: "array";
                                    readonly description: "Presents the transactions trends for the requested POI during the requested period based on the selected granularity.";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                    readonly examples: readonly ["2022-08-01", "2022-09-01", "2022-10-01"];
                                };
                                readonly values: {
                                    readonly type: "array";
                                    readonly description: "Presents the sales transactions in bins based on the requested granularity (e.g. in <b>month</b> granularity each bin will present the first date of the month, for <b>day</b> granularity each bin will present each day of the report date range)";
                                    readonly items: {
                                        readonly type: "number";
                                    };
                                    readonly examples: readonly [138915.39, 139320.64, 136581.83];
                                };
                            };
                        };
                        readonly compare: {
                            readonly type: "object";
                            readonly properties: {
                                readonly bins: {
                                    readonly type: "array";
                                    readonly description: "Presents the sales transactions in bins based on the requested granularity (e.g. in <b>month</b> granularity each bin will present the first date of the month, for <b>day</b> granularity each bin will present each day of the report date range)";
                                    readonly items: {
                                        readonly type: "string";
                                    };
                                    readonly examples: readonly ["2022-08-01", "2022-09-01", "2022-10-01"];
                                };
                                readonly values: {
                                    readonly type: "array";
                                    readonly description: "Correlated sales info values to the bins array";
                                    readonly items: {
                                        readonly type: "number";
                                    };
                                    readonly examples: readonly [138915.39, 139320.64, 136581.83];
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrorBadRequest";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostV1ReportsTradeAreaDemographics: {
    readonly body: {
        readonly title: "Trade Area Demographics Request";
        readonly description: "Trade Area Demographics returns the demographic accounted for x percentage of the visits from a given dataset and template";
        readonly type: "object";
        readonly required: readonly ["startDate", "endDate", "apiId"];
        readonly properties: {
            readonly startDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data start date. Format YYYY-MM-DD";
                readonly examples: readonly ["2020-12-01"];
            };
            readonly endDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data end date. Format YYYY-MM-DD";
                readonly examples: readonly ["2021-05-31"];
            };
            readonly apiId: {
                readonly type: "string";
                readonly description: "Placer API Entity Id";
                readonly examples: readonly ["venue:7d55054520e387813d764b03"];
            };
            readonly method: {
                readonly description: "The Method for including the block groups in the TA <br/> tta - Determine block groups using intersection with TTA polygon. Requires the setting of the trafficVolPct param as well.<br/> mileRing - Use the block groups within a mile ring.<br/> driveTime - Use the block groups within the trade area defined by the trip duration (in minutes) required for visitors to arrive to the property.";
                readonly type: "string";
                readonly enum: readonly ["tta", "mileRing", "driveTime"];
                readonly default: "tta";
                readonly examples: readonly ["tta"];
            };
            readonly benchmarkScope: {
                readonly type: "string";
                readonly enum: readonly ["nationwide", "state"];
                readonly description: "Benchmark scope";
                readonly default: "nationwide";
                readonly examples: readonly ["nationwide"];
            };
            readonly allocationType: {
                readonly type: "string";
                readonly enum: readonly ["weightedCentroid", "centroid"];
                readonly default: "weightedCentroid";
                readonly description: "The method for including the block group in the TA <br/> **Weighted centroid** - the centroid is adjusted per the block’s group population. if it falls within the polygon the BG is included <br/> **Centroid** - A block group’s data is included when the center of the block group falls within the trade area boundaries";
                readonly examples: readonly ["weightedCentroid"];
            };
            readonly trafficVolPct: {
                readonly description: "Required only when method parameter is set to “tta”.<br/> The threshold for the volume of traffic coming to the property. For example - setting a 'traffic vol' of 70% will draw a polygon that includes at least 70% of the visitors’ home location.";
                readonly type: "integer";
                readonly default: 70;
                readonly minimum: 1;
                readonly maximum: 99;
            };
            readonly driveTime: {
                readonly description: "The max drive time duration in minutes to determine the trade area";
                readonly type: "integer";
                readonly minimum: 1;
                readonly maximum: 200;
            };
            readonly withinRadius: {
                readonly type: "number";
                readonly format: "float";
                readonly minimum: 1;
                readonly maximum: 300;
                readonly default: 15;
                readonly description: "The max ‘home distance’ threshold for trade area calculation in miles; i.e. will exclude any visitor beyond this value. For TTA only";
            };
            readonly ringRadius: {
                readonly type: "number";
                readonly format: "float";
                readonly minimum: 0.2;
                readonly maximum: 250;
                readonly default: 3;
                readonly description: "The max distance for trade area calculation in miles; i.e. will exclude any visitor beyond this value. For mileRing only";
            };
            readonly dataset: {
                readonly description: "The dataset characteristics. One of the following: census (<i>Default</i>), popstats, landscape, marketOutlook, spendingPatterns, workplace";
                readonly type: "string";
                readonly enum: readonly ["census", "sti_popstats", "sti_landscape", "sti_market_outlook", "sti_spending_patterns", "sti_workplace", "spatial_ai_personalive", "spatial_ai_followgraph", "experian_mosaic"];
                readonly default: "census";
                readonly examples: readonly ["census"];
            };
            readonly template: {
                readonly description: "The template to parse the demographics data with.<br> <strong>census</strong> - default<br> <strong>sti_popstats</strong> - default, 5_years_forecast, 10_years_forecast<br> <strong>sti_landscape</strong> - overview, households, population<br> <strong>sti_market_outlook</strong> - by_businesses, by_product_line<br> <strong>sti_workplace</strong> - default, demographics<br> <strong>sti_spending_patterns</strong> -  default, food, transportation, healthcare,<br> housing, entertainment, alcoholic_beverages, personal_care<br> <strong>spatial_ai_personalive</strong> - overview, segments<br> <strong>spatial_ai_followgraph</strong> - brands, interests, celebrities_and_influencers, media_channels<br> <strong>experian_mosaic</strong> - overview, hh_default, pop_default<br>";
            };
            readonly filters: {
                readonly description: "Filtering options for the report results.";
                readonly type: "object";
                readonly properties: {
                    readonly audienceType: {
                        readonly description: "If provided - metrics will be calculated based only on the specified types of audience.";
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                            readonly enum: readonly ["visitors", "employees", "residents"];
                        };
                        readonly examples: readonly ["visitors"];
                    };
                    readonly dwellTime: {
                        readonly description: "Metrics will be calculated considering the requested dwell time range.";
                        readonly type: "object";
                        readonly properties: {
                            readonly operator: {
                                readonly description: "Less than (<) to Greater Equal (>=)";
                                readonly type: "string";
                                readonly enum: readonly ["<", ">="];
                                readonly examples: readonly ["<"];
                            };
                            readonly value: {
                                readonly description: "The wanted dwell time";
                                readonly type: "integer";
                                readonly examples: readonly [150];
                            };
                        };
                    };
                    readonly hoursRange: {
                        readonly description: "Filter the report’s results based on visits hours range. The filter is defined by 2 strings:<br/> 1. The starting hour to filter the reports results from (Format HH:MM XM, for example: 08:00 am).<br/> 2. The end hour to filter the reports results(Format HH:MM XM, for example: 11:59 pm) .";
                        readonly type: "object";
                        readonly required: readonly ["fromHour", "toHour"];
                        readonly properties: {
                            readonly fromHour: {
                                readonly type: "string";
                                readonly examples: readonly ["03:00 am"];
                            };
                            readonly toHour: {
                                readonly type: "string";
                                readonly examples: readonly ["11:59 pm"];
                            };
                        };
                    };
                    readonly daysOfWeek: {
                        readonly description: "Filter visit calculation based on days of the week. Results will contain only requested days. Days are represented by using numbers where Monday=1 and Sunday=7. For example: in order to retrieve weekend days use the following [ 6, 7 ].";
                        readonly type: "array";
                        readonly items: {
                            readonly enum: readonly [1, 2, 3, 4, 5, 6, 7];
                        };
                        readonly examples: readonly [6, 7];
                    };
                    readonly distance: {
                        readonly description: "Filter visits by distance in miles from home <strong>or</strong> work<br/> where only visits in a given radius will be used in metrics calculation.";
                        readonly type: "object";
                        readonly properties: {
                            readonly from: {
                                readonly description: "The origin from where the distance will be measured.";
                                readonly type: "string";
                                readonly enum: readonly ["home", "work"];
                                readonly examples: readonly ["home"];
                            };
                            readonly values: {
                                readonly description: "Object representation of the distance range<br/>lt - less than<br/>le - less than or equal to<br/>eq - equal to<br/>ge - greater than or equal to<br/>gt - greater than.";
                                readonly type: "object";
                                readonly properties: {
                                    readonly le: {
                                        readonly type: "number";
                                        readonly examples: readonly [100];
                                    };
                                    readonly ge: {
                                        readonly type: "number";
                                    };
                                    readonly lt: {
                                        readonly type: "number";
                                        readonly examples: readonly [250];
                                    };
                                    readonly gt: {
                                        readonly type: "number";
                                        readonly examples: readonly [10];
                                    };
                                    readonly eq: {
                                        readonly type: "number";
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly nearbyRadius: {
                readonly type: "integer";
                readonly enum: readonly [100, 250, 500, 750, 1000];
                readonly description: "The radius requested for nearby activity report generation.</br> <strong>Note</strong>: When a value is populated for this attribute - the report will be calculated as per the <<glossary:Nearby Activity report>> logic.";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly title: "Base Response";
            readonly type: "object";
            readonly required: readonly ["data", "requestId"];
            readonly properties: {
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
                readonly data: {
                    readonly type: "object";
                    readonly additionalProperties: {
                        readonly type: "object";
                        readonly additionalProperties: {
                            readonly type: "object";
                            readonly required: readonly ["value"];
                            readonly properties: {
                                readonly value: {
                                    readonly type: "number";
                                    readonly examples: readonly [534534];
                                };
                                readonly variableIndex: {
                                    readonly description: "The index indicates the performance of the parameter you are evaluating comparing to the selected benchmark. For example if you are looking at avg. Household Income and comparing it to the nationwide benchmark an index score of 100 will mean that the location you are analyzing is preforming the same as nationwide levels for this metric.";
                                    readonly type: "number";
                                    readonly examples: readonly [17.3];
                                };
                                readonly percentage: {
                                    readonly description: "Reflects the percentile <<glossary:Ranking>> of a given geographies as compared to the entire country. For example, a score of 90.00 would reflect that this geography has scored higher than 90% of the country for the given segmant";
                                    readonly type: "number";
                                    readonly examples: readonly [56.7];
                                };
                                readonly variablePercentage: {
                                    readonly type: "number";
                                    readonly examples: readonly [20.3];
                                };
                            };
                        };
                    };
                    readonly properties: {
                        readonly nearbyRadius: {
                            readonly type: "integer";
                            readonly enum: readonly [100, 250, 500, 750, 1000];
                            readonly description: "The radius requested for nearby activity report generation.</br> <strong>Note</strong>: When a value is populated for this attribute - the report will be calculated as per the <<glossary:Nearby Activity report>> logic.\n\n`100` `250` `500` `750` `1000`";
                            readonly examples: readonly [100];
                        };
                        readonly filters: {
                            readonly type: "object";
                            readonly properties: {
                                readonly audienceType: {
                                    readonly description: "The list of audiences that is specified in the request filter.";
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly enum: readonly ["visitors", "employees", "residents"];
                                        readonly examples: readonly ["visitors"];
                                        readonly description: "`visitors` `employees` `residents`";
                                    };
                                    readonly examples: readonly ["visitors"];
                                };
                                readonly dwellTime: {
                                    readonly description: "The dwell time filter specified in the request, in case it was utilized.<br/> For example: “< 100” or “>= 10”";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly operator: {
                                            readonly description: "Represents the operator used for defining the dwell time range for filtering the report data\n\n`<` `>=`";
                                            readonly type: "string";
                                            readonly enum: readonly ["<", ">="];
                                            readonly examples: readonly ["<"];
                                        };
                                        readonly value: {
                                            readonly description: "Represents the number of minutes referred to when defining the dwell time range for filtering the report data";
                                            readonly type: "integer";
                                            readonly examples: readonly [150];
                                        };
                                    };
                                };
                                readonly hoursRange: {
                                    readonly description: "The hours range that is specified in the request filter.";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly fromHour: {
                                            readonly description: "Start visits hour (Format HH:MM XM, for example: 08:00 am)";
                                            readonly type: "string";
                                            readonly examples: readonly ["03:00 am"];
                                        };
                                        readonly toHour: {
                                            readonly description: "End visitation hour (Format HH:MM XM, for example: 08:00 am)";
                                            readonly type: "string";
                                            readonly examples: readonly ["11:59 pm"];
                                        };
                                    };
                                };
                                readonly daysOfWeek: {
                                    readonly description: "A list of days represented by integers (Monday=1, Sunday=7) as specified in the request filter, which was used in the report calculation.";
                                    readonly type: "array";
                                    readonly items: {
                                        readonly enum: readonly [1, 2, 3, 4, 5, 6, 7];
                                    };
                                    readonly examples: readonly [6, 7];
                                };
                                readonly distance: {
                                    readonly description: "The visits considered for the report calculation by distance in miles from home <strong>or</strong> work as specified in the request filter.";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly from: {
                                            readonly description: "The origin from where the distance will be measured.\n\n`home` `work`";
                                            readonly type: "string";
                                            readonly enum: readonly ["home", "work"];
                                            readonly examples: readonly ["home"];
                                        };
                                        readonly values: {
                                            readonly description: "Object representation of the distance range<br/>lt - less than<br/>le - less than or equal to<br/>eq - equal to<br/>ge - greater than or equal to<br/>gt - greater than.";
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly le: {
                                                    readonly type: "number";
                                                    readonly examples: readonly [100];
                                                };
                                                readonly ge: {
                                                    readonly type: "number";
                                                };
                                                readonly lt: {
                                                    readonly type: "number";
                                                    readonly examples: readonly [250];
                                                };
                                                readonly gt: {
                                                    readonly type: "number";
                                                    readonly examples: readonly [10];
                                                };
                                                readonly eq: {
                                                    readonly type: "number";
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        readonly visitDurationSegmentation: {
                            readonly description: "The default visit duration segmentation is returned when the report calculation uses the default segmentation duration.\n\n`under10Min` `10MinOrLonger` `allVisits` `mixedSegments`";
                            readonly title: "Visit Duration Segmentation";
                            readonly type: "string";
                            readonly enum: readonly ["under10Min", "10MinOrLonger", "allVisits", "mixedSegments"];
                            readonly examples: readonly ["10MinOrLonger"];
                        };
                    };
                };
                readonly apiId: {
                    readonly type: "string";
                    readonly description: "Placer API Entity Id";
                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "202": {
            readonly title: "InProgress";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "204": {
            readonly title: "No Content Response";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrorBadRequest";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "401": {
            readonly title: "ErrUnAuthorizedDataSource";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostV1ReportsTradeAreaDriveTime: {
    readonly body: {
        readonly title: "Trade Area By Drive Time Request";
        readonly description: "This service enables to pull the trade area polygon calculated based on a specified drive time.";
        readonly type: "object";
        readonly required: readonly ["startDate", "endDate", "apiId"];
        readonly properties: {
            readonly startDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data start date. Format YYYY-MM-DD";
                readonly examples: readonly ["2020-12-01"];
            };
            readonly endDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data end date. Format YYYY-MM-DD";
                readonly examples: readonly ["2021-05-31"];
            };
            readonly apiId: {
                readonly type: "string";
                readonly description: "Placer API Entity Id";
                readonly examples: readonly ["venue:7d55054520e387813d764b03"];
            };
            readonly allocationType: {
                readonly type: "string";
                readonly enum: readonly ["weightedCentroid", "centroid"];
                readonly default: "weightedCentroid";
                readonly description: "The method for including the block group in the TA <br/> **Weighted centroid** - the centroid is adjusted per the block’s group population. if it falls within the polygon the BG is included <br/> **Centroid** - A block group’s data is included when the center of the block group falls within the trade area boundaries";
                readonly examples: readonly ["weightedCentroid"];
            };
            readonly driveTime: {
                readonly description: "The max drive time duration threshold for trade area calculation in minutes; i.e. will exclude any visitor beyond this value.";
                readonly type: "integer";
                readonly default: 10;
                readonly minimum: 5;
                readonly maximum: 200;
            };
            readonly filter: {
                readonly description: "Filtering options for the report results.";
                readonly type: "object";
                readonly properties: {
                    readonly audienceType: {
                        readonly description: "If provided - metrics will be calculated based only on the specified types of audience.";
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                            readonly enum: readonly ["visitors", "employees", "residents"];
                        };
                        readonly examples: readonly ["visitors"];
                    };
                    readonly dwellTime: {
                        readonly description: "Metrics will be calculated considering the requested dwell time range.";
                        readonly type: "object";
                        readonly properties: {
                            readonly operator: {
                                readonly description: "Less than (<) to Greater Equal (>=)";
                                readonly type: "string";
                                readonly enum: readonly ["<", ">="];
                                readonly examples: readonly ["<"];
                            };
                            readonly value: {
                                readonly description: "The wanted dwell time";
                                readonly type: "integer";
                                readonly examples: readonly [150];
                            };
                        };
                    };
                    readonly hoursRange: {
                        readonly description: "Filter the report’s results based on visits hours range. The filter is defined by 2 strings:<br/> 1. The starting hour to filter the reports results from (Format HH:MM XM, for example: 08:00 am).<br/> 2. The end hour to filter the reports results(Format HH:MM XM, for example: 11:59 pm) .";
                        readonly type: "object";
                        readonly required: readonly ["fromHour", "toHour"];
                        readonly properties: {
                            readonly fromHour: {
                                readonly type: "string";
                                readonly examples: readonly ["03:00 am"];
                            };
                            readonly toHour: {
                                readonly type: "string";
                                readonly examples: readonly ["11:59 pm"];
                            };
                        };
                    };
                    readonly daysOfWeek: {
                        readonly description: "Filter visit calculation based on days of the week. Results will contain only requested days. Days are represented by using numbers where Monday=1 and Sunday=7. For example: in order to retrieve weekend days use the following [ 6, 7 ].";
                        readonly type: "array";
                        readonly items: {
                            readonly enum: readonly [1, 2, 3, 4, 5, 6, 7];
                        };
                        readonly examples: readonly [6, 7];
                    };
                    readonly distance: {
                        readonly description: "Filter visits by distance in miles from home <strong>or</strong> work<br/> where only visits in a given radius will be used in metrics calculation.";
                        readonly type: "object";
                        readonly properties: {
                            readonly from: {
                                readonly description: "The origin from where the distance will be measured.";
                                readonly type: "string";
                                readonly enum: readonly ["home", "work"];
                                readonly examples: readonly ["home"];
                            };
                            readonly values: {
                                readonly description: "Object representation of the distance range<br/>lt - less than<br/>le - less than or equal to<br/>eq - equal to<br/>ge - greater than or equal to<br/>gt - greater than.";
                                readonly type: "object";
                                readonly properties: {
                                    readonly le: {
                                        readonly type: "number";
                                        readonly examples: readonly [100];
                                    };
                                    readonly ge: {
                                        readonly type: "number";
                                    };
                                    readonly lt: {
                                        readonly type: "number";
                                        readonly examples: readonly [250];
                                    };
                                    readonly gt: {
                                        readonly type: "number";
                                        readonly examples: readonly [10];
                                    };
                                    readonly eq: {
                                        readonly type: "number";
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly nearbyRadius: {
                readonly type: "integer";
                readonly enum: readonly [100, 250, 500, 750, 1000];
                readonly description: "The radius requested for nearby activity report generation.</br> <strong>Note</strong>: When a value is populated for this attribute - the report will be calculated as per the <<glossary:Nearby Activity report>> logic.";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly title: "Trade Area By Drive Time Response";
            readonly type: "object";
            readonly required: readonly ["requestId"];
            readonly properties: {
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
                readonly data: {
                    readonly title: "Base Report Request";
                    readonly type: "object";
                    readonly required: readonly ["startDate", "endDate", "apiId"];
                    readonly properties: {
                        readonly startDate: {
                            readonly type: "string";
                            readonly format: "date";
                            readonly description: "Queried data start date. Format YYYY-MM-DD";
                            readonly examples: readonly ["2020-12-01"];
                        };
                        readonly endDate: {
                            readonly type: "string";
                            readonly format: "date";
                            readonly description: "Queried data end date. Format YYYY-MM-DD";
                            readonly examples: readonly ["2021-05-31"];
                        };
                        readonly apiId: {
                            readonly type: "string";
                            readonly description: "Placer API Entity Id";
                            readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                        };
                        readonly filters: {
                            readonly type: "object";
                            readonly properties: {
                                readonly audienceType: {
                                    readonly description: "The list of audiences that is specified in the request filter.";
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly enum: readonly ["visitors", "employees", "residents"];
                                        readonly description: "`visitors` `employees` `residents`";
                                    };
                                    readonly examples: readonly ["visitors"];
                                };
                                readonly dwellTime: {
                                    readonly description: "The dwell time filter specified in the request, in case it was utilized.<br/> For example: “< 100” or “>= 10”";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly operator: {
                                            readonly description: "Represents the operator used for defining the dwell time range for filtering the report data\n\n`<` `>=`";
                                            readonly type: "string";
                                            readonly enum: readonly ["<", ">="];
                                            readonly examples: readonly ["<"];
                                        };
                                        readonly value: {
                                            readonly description: "Represents the number of minutes referred to when defining the dwell time range for filtering the report data";
                                            readonly type: "integer";
                                            readonly examples: readonly [150];
                                        };
                                    };
                                };
                                readonly hoursRange: {
                                    readonly description: "The hours range that is specified in the request filter.";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly fromHour: {
                                            readonly description: "Start visits hour (Format HH:MM XM, for example: 08:00 am)";
                                            readonly type: "string";
                                            readonly examples: readonly ["03:00 am"];
                                        };
                                        readonly toHour: {
                                            readonly description: "End visitation hour (Format HH:MM XM, for example: 08:00 am)";
                                            readonly type: "string";
                                            readonly examples: readonly ["11:59 pm"];
                                        };
                                    };
                                };
                                readonly daysOfWeek: {
                                    readonly description: "A list of days represented by integers (Monday=1, Sunday=7) as specified in the request filter, which was used in the report calculation.";
                                    readonly type: "array";
                                    readonly items: {
                                        readonly enum: readonly [1, 2, 3, 4, 5, 6, 7];
                                    };
                                    readonly examples: readonly [6, 7];
                                };
                                readonly distance: {
                                    readonly description: "The visits considered for the report calculation by distance in miles from home <strong>or</strong> work as specified in the request filter.";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly from: {
                                            readonly description: "The origin from where the distance will be measured.\n\n`home` `work`";
                                            readonly type: "string";
                                            readonly enum: readonly ["home", "work"];
                                            readonly examples: readonly ["home"];
                                        };
                                        readonly values: {
                                            readonly description: "Object representation of the distance range<br/>lt - less than<br/>le - less than or equal to<br/>eq - equal to<br/>ge - greater than or equal to<br/>gt - greater than.";
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly le: {
                                                    readonly type: "number";
                                                    readonly examples: readonly [100];
                                                };
                                                readonly ge: {
                                                    readonly type: "number";
                                                };
                                                readonly lt: {
                                                    readonly type: "number";
                                                    readonly examples: readonly [250];
                                                };
                                                readonly gt: {
                                                    readonly type: "number";
                                                    readonly examples: readonly [10];
                                                };
                                                readonly eq: {
                                                    readonly type: "number";
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        readonly visitDurationSegmentation: {
                            readonly description: "The default visit duration segmentation is returned when the report calculation uses the default segmentation duration.\n\n`under10Min` `10MinOrLonger` `allVisits` `mixedSegments`";
                            readonly title: "Visit Duration Segmentation";
                            readonly type: "string";
                            readonly enum: readonly ["under10Min", "10MinOrLonger", "allVisits", "mixedSegments"];
                            readonly examples: readonly ["10MinOrLonger"];
                        };
                        readonly allocationType: {
                            readonly type: "string";
                            readonly enum: readonly ["weightedCentroid", "centroid"];
                            readonly default: "weightedCentroid";
                            readonly description: "The method for including the block group in the TA <br/> **Weighted centroid** - the centroid is adjusted per the block’s group population. if it falls within the polygon the BG is included <br/> **Centroid** - A block group’s data is included when the center of the block group falls within the trade area boundaries\n\n`weightedCentroid` `centroid`";
                            readonly examples: readonly ["weightedCentroid"];
                        };
                        readonly driveTime: {
                            readonly description: "The max drive time duration threshold for trade area calculation in minutes; i.e. will exclude any visitor beyond this value.";
                            readonly type: "integer";
                            readonly default: 10;
                            readonly minimum: 5;
                            readonly maximum: 200;
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly enum: readonly ["MultiPolygon"];
                            readonly description: "The Polygon Data Structure (https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.7)\n\n`MultiPolygon`";
                            readonly examples: readonly ["MultiPolygon"];
                        };
                        readonly coordinates: {
                            readonly type: "array";
                            readonly description: "Coordinate Object (Latitude, Longitude)";
                            readonly items: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "array";
                                    readonly minItems: 2;
                                    readonly maxItems: 2;
                                    readonly items: {
                                        readonly oneOf: readonly [{
                                            readonly type: "number";
                                            readonly format: "float";
                                            readonly minimum: -180;
                                            readonly maximum: 180;
                                            readonly description: "Longitude of query location";
                                            readonly examples: readonly [-121.98];
                                        }, {
                                            readonly type: "number";
                                            readonly format: "float";
                                            readonly minimum: -90;
                                            readonly maximum: 90;
                                            readonly description: "Latitude of query location";
                                            readonly examples: readonly [37.52];
                                        }];
                                    };
                                };
                            };
                        };
                        readonly nearbyRadius: {
                            readonly type: "integer";
                            readonly enum: readonly [100, 250, 500, 750, 1000];
                            readonly description: "The radius requested for nearby activity report generation.</br> <strong>Note</strong>: When a value is populated for this attribute - the report will be calculated as per the <<glossary:Nearby Activity report>> logic.\n\n`100` `250` `500` `750` `1000`";
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "202": {
            readonly title: "InProgress";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrorBadRequest";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostV1ReportsTrueTradeArea: {
    readonly body: {
        readonly title: "True trade area request";
        readonly description: "True trade areas are calculated by the volume of traffic coming to the property. For example - setting a 'traffic vol' of 70% will draw a polygon that includes at least 70% of the visitors’ home location.";
        readonly type: "object";
        readonly required: readonly ["apiId", "endDate", "reportType", "startDate"];
        readonly properties: {
            readonly startDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data start date. Format YYYY-MM-DD";
                readonly examples: readonly ["2020-12-01"];
            };
            readonly endDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data end date. Format YYYY-MM-DD";
                readonly examples: readonly ["2021-05-31"];
            };
            readonly apiId: {
                readonly type: "string";
                readonly description: "Placer API Entity Id";
                readonly examples: readonly ["venue:7d55054520e387813d764b03"];
            };
            readonly reportType: {
                readonly type: "string";
                readonly enum: readonly ["trueTradeArea"];
                readonly description: "Queried report type";
                readonly default: "trueTradeArea";
                readonly examples: readonly ["trueTradeArea"];
            };
            readonly fileFormat: {
                readonly type: "string";
                readonly enum: readonly ["polygonGeoJson"];
                readonly default: "polygonGeoJson";
                readonly description: "Result format";
                readonly examples: readonly ["polygonGeoJson"];
            };
            readonly trafficVolPct: {
                readonly type: "integer";
                readonly default: 70;
                readonly minimum: 30;
                readonly maximum: 100;
                readonly description: "The threshold for the volume of traffic coming to the property. For example - setting a 'traffic vol' of 70% will draw a polygon that includes at least 70% of the visitors’ home location";
            };
            readonly allocationType: {
                readonly type: "string";
                readonly enum: readonly ["weightedCentroid", "centroid"];
                readonly default: "weightedCentroid";
                readonly description: "The method for including the block group in the TA <br/> **Weighted centroid** - the centroid is adjusted per the block’s group population. if it falls within the polygon the BG is included <br/> **Centroid** - A block group’s data is included when the center of the block group falls within the trade area boundaries";
                readonly examples: readonly ["weightedCentroid"];
            };
            readonly withinDistance: {
                readonly type: "number";
                readonly format: "float";
                readonly minimum: 0.25;
                readonly maximum: 100;
                readonly default: 50;
                readonly description: "The max ‘home distance’ threshold for trade area calculation in miles; i.e. will exclude any visitor beyond this value.";
            };
            readonly filter: {
                readonly description: "Filtering options for the report results.";
                readonly type: "object";
                readonly properties: {
                    readonly audienceType: {
                        readonly description: "If provided - metrics will be calculated based only on the specified types of audience.";
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                            readonly enum: readonly ["visitors", "employees", "residents"];
                        };
                        readonly examples: readonly ["visitors"];
                    };
                    readonly dwellTime: {
                        readonly description: "Metrics will be calculated considering the requested dwell time range.";
                        readonly type: "object";
                        readonly properties: {
                            readonly operator: {
                                readonly description: "Less than (<) to Greater Equal (>=)";
                                readonly type: "string";
                                readonly enum: readonly ["<", ">="];
                                readonly examples: readonly ["<"];
                            };
                            readonly value: {
                                readonly description: "The wanted dwell time";
                                readonly type: "integer";
                                readonly examples: readonly [150];
                            };
                        };
                    };
                    readonly hoursRange: {
                        readonly description: "Filter the report’s results based on visits hours range. The filter is defined by 2 strings:<br/> 1. The starting hour to filter the reports results from (Format HH:MM XM, for example: 08:00 am).<br/> 2. The end hour to filter the reports results(Format HH:MM XM, for example: 11:59 pm) .";
                        readonly type: "object";
                        readonly required: readonly ["fromHour", "toHour"];
                        readonly properties: {
                            readonly fromHour: {
                                readonly type: "string";
                                readonly examples: readonly ["03:00 am"];
                            };
                            readonly toHour: {
                                readonly type: "string";
                                readonly examples: readonly ["11:59 pm"];
                            };
                        };
                    };
                    readonly daysOfWeek: {
                        readonly description: "Filter visit calculation based on days of the week. Results will contain only requested days. Days are represented by using numbers where Monday=1 and Sunday=7. For example: in order to retrieve weekend days use the following [ 6, 7 ].";
                        readonly type: "array";
                        readonly items: {
                            readonly enum: readonly [1, 2, 3, 4, 5, 6, 7];
                        };
                        readonly examples: readonly [6, 7];
                    };
                    readonly distance: {
                        readonly description: "Filter visits by distance in miles from home <strong>or</strong> work<br/> where only visits in a given radius will be used in metrics calculation.";
                        readonly type: "object";
                        readonly properties: {
                            readonly from: {
                                readonly description: "The origin from where the distance will be measured.";
                                readonly type: "string";
                                readonly enum: readonly ["home", "work"];
                                readonly examples: readonly ["home"];
                            };
                            readonly values: {
                                readonly description: "Object representation of the distance range<br/>lt - less than<br/>le - less than or equal to<br/>eq - equal to<br/>ge - greater than or equal to<br/>gt - greater than.";
                                readonly type: "object";
                                readonly properties: {
                                    readonly le: {
                                        readonly type: "number";
                                        readonly examples: readonly [100];
                                    };
                                    readonly ge: {
                                        readonly type: "number";
                                    };
                                    readonly lt: {
                                        readonly type: "number";
                                        readonly examples: readonly [250];
                                    };
                                    readonly gt: {
                                        readonly type: "number";
                                        readonly examples: readonly [10];
                                    };
                                    readonly eq: {
                                        readonly type: "number";
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly nearbyRadius: {
                readonly type: "integer";
                readonly enum: readonly [100, 250, 500, 750, 1000];
                readonly description: "The radius requested for nearby activity report generation.</br> <strong>Note</strong>: When a value is populated for this attribute - the report will be calculated as per the <<glossary:Nearby Activity report>> logic.";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly title: "Polygon Response";
            readonly type: "object";
            readonly required: readonly ["requestId"];
            readonly properties: {
                readonly apiId: {
                    readonly type: "string";
                    readonly description: "Placer API Entity Id";
                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                };
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly filters: {
                            readonly type: "object";
                            readonly properties: {
                                readonly audienceType: {
                                    readonly description: "The list of audiences that is specified in the request filter.";
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "string";
                                        readonly enum: readonly ["visitors", "employees", "residents"];
                                        readonly description: "`visitors` `employees` `residents`";
                                    };
                                    readonly examples: readonly ["visitors"];
                                };
                                readonly dwellTime: {
                                    readonly description: "The dwell time filter specified in the request, in case it was utilized.<br/> For example: “< 100” or “>= 10”";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly operator: {
                                            readonly description: "Represents the operator used for defining the dwell time range for filtering the report data\n\n`<` `>=`";
                                            readonly type: "string";
                                            readonly enum: readonly ["<", ">="];
                                            readonly examples: readonly ["<"];
                                        };
                                        readonly value: {
                                            readonly description: "Represents the number of minutes referred to when defining the dwell time range for filtering the report data";
                                            readonly type: "integer";
                                            readonly examples: readonly [150];
                                        };
                                    };
                                };
                                readonly hoursRange: {
                                    readonly description: "The hours range that is specified in the request filter.";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly fromHour: {
                                            readonly description: "Start visits hour (Format HH:MM XM, for example: 08:00 am)";
                                            readonly type: "string";
                                            readonly examples: readonly ["03:00 am"];
                                        };
                                        readonly toHour: {
                                            readonly description: "End visitation hour (Format HH:MM XM, for example: 08:00 am)";
                                            readonly type: "string";
                                            readonly examples: readonly ["11:59 pm"];
                                        };
                                    };
                                };
                                readonly daysOfWeek: {
                                    readonly description: "A list of days represented by integers (Monday=1, Sunday=7) as specified in the request filter, which was used in the report calculation.";
                                    readonly type: "array";
                                    readonly items: {
                                        readonly enum: readonly [1, 2, 3, 4, 5, 6, 7];
                                    };
                                    readonly examples: readonly [6, 7];
                                };
                                readonly distance: {
                                    readonly description: "The visits considered for the report calculation by distance in miles from home <strong>or</strong> work as specified in the request filter.";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly from: {
                                            readonly description: "The origin from where the distance will be measured.\n\n`home` `work`";
                                            readonly type: "string";
                                            readonly enum: readonly ["home", "work"];
                                            readonly examples: readonly ["home"];
                                        };
                                        readonly values: {
                                            readonly description: "Object representation of the distance range<br/>lt - less than<br/>le - less than or equal to<br/>eq - equal to<br/>ge - greater than or equal to<br/>gt - greater than.";
                                            readonly type: "object";
                                            readonly properties: {
                                                readonly le: {
                                                    readonly type: "number";
                                                    readonly examples: readonly [100];
                                                };
                                                readonly ge: {
                                                    readonly type: "number";
                                                };
                                                readonly lt: {
                                                    readonly type: "number";
                                                    readonly examples: readonly [250];
                                                };
                                                readonly gt: {
                                                    readonly type: "number";
                                                    readonly examples: readonly [10];
                                                };
                                                readonly eq: {
                                                    readonly type: "number";
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        readonly visitDurationSegmentation: {
                            readonly description: "The default visit duration segmentation is returned when the report calculation uses the default segmentation duration.\n\n`under10Min` `10MinOrLonger` `allVisits` `mixedSegments`";
                            readonly title: "Visit Duration Segmentation";
                            readonly type: "string";
                            readonly enum: readonly ["under10Min", "10MinOrLonger", "allVisits", "mixedSegments"];
                            readonly examples: readonly ["10MinOrLonger"];
                        };
                        readonly type: {
                            readonly type: "string";
                            readonly enum: readonly ["MultiPolygon"];
                            readonly description: "The Polygon Data Structure (https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.7)\n\n`MultiPolygon`";
                            readonly examples: readonly ["MultiPolygon"];
                        };
                        readonly coordinates: {
                            readonly type: "array";
                            readonly description: "Coordinate Object (Latitude, Longitude)";
                            readonly items: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "array";
                                    readonly minItems: 2;
                                    readonly maxItems: 2;
                                    readonly items: {
                                        readonly oneOf: readonly [{
                                            readonly type: "number";
                                            readonly format: "float";
                                            readonly minimum: -180;
                                            readonly maximum: 180;
                                            readonly description: "Longitude of query location";
                                            readonly examples: readonly [-121.98];
                                        }, {
                                            readonly type: "number";
                                            readonly format: "float";
                                            readonly minimum: -90;
                                            readonly maximum: 90;
                                            readonly description: "Latitude of query location";
                                            readonly examples: readonly [37.52];
                                        }];
                                    };
                                };
                            };
                        };
                        readonly nearbyRadius: {
                            readonly type: "integer";
                            readonly enum: readonly [100, 250, 500, 750, 1000];
                            readonly description: "The radius requested for nearby activity report generation.</br> <strong>Note</strong>: When a value is populated for this attribute - the report will be calculated as per the <<glossary:Nearby Activity report>> logic.\n\n`100` `250` `500` `750` `1000`";
                        };
                    };
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "202": {
            readonly title: "InProgress";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrorBadRequest";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostV1ReportsVisitMetrics: {
    readonly body: {
        readonly title: "Visit Metrics Summary Request";
        readonly description: "Retrieves visitors and visits for a given list of entities.<br/>This endpoint supports bulk requests up to 100 entities.";
        readonly required: readonly ["startDate", "endDate", "apiIds"];
        readonly type: "object";
        readonly properties: {
            readonly startDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data start date. Format YYYY-MM-DD";
                readonly examples: readonly ["2020-12-01"];
            };
            readonly endDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data end date. Format YYYY-MM-DD";
                readonly examples: readonly ["2021-05-31"];
            };
            readonly apiIds: {
                readonly type: "array";
                readonly minItems: 1;
                readonly maxItems: 100;
                readonly items: {
                    readonly type: "string";
                    readonly description: "Placer API Entity Id";
                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                };
            };
            readonly includeMetadata: {
                readonly type: "boolean";
                readonly default: true;
                readonly description: "If the parameter is set to true, the response will also include the POI Info";
            };
            readonly filters: {
                readonly description: "Filtering options for the report results.";
                readonly type: "object";
                readonly properties: {
                    readonly audienceType: {
                        readonly description: "If provided - metrics will be calculated based only on the specified types of audience.";
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                            readonly enum: readonly ["visitors", "employees", "residents"];
                        };
                        readonly examples: readonly ["visitors"];
                    };
                    readonly dwellTime: {
                        readonly description: "Metrics will be calculated considering the requested dwell time range.";
                        readonly type: "object";
                        readonly properties: {
                            readonly operator: {
                                readonly description: "Less than (<) to Greater Equal (>=)";
                                readonly type: "string";
                                readonly enum: readonly ["<", ">="];
                                readonly examples: readonly ["<"];
                            };
                            readonly value: {
                                readonly description: "The wanted dwell time";
                                readonly type: "integer";
                                readonly examples: readonly [150];
                            };
                        };
                    };
                    readonly hoursRange: {
                        readonly description: "Filter the report’s results based on visits hours range. The filter is defined by 2 strings:<br/> 1. The starting hour to filter the reports results from (Format HH:MM XM, for example: 08:00 am).<br/> 2. The end hour to filter the reports results(Format HH:MM XM, for example: 11:59 pm) .";
                        readonly type: "object";
                        readonly required: readonly ["fromHour", "toHour"];
                        readonly properties: {
                            readonly fromHour: {
                                readonly type: "string";
                                readonly examples: readonly ["03:00 am"];
                            };
                            readonly toHour: {
                                readonly type: "string";
                                readonly examples: readonly ["11:59 pm"];
                            };
                        };
                    };
                    readonly daysOfWeek: {
                        readonly description: "Filter visit calculation based on days of the week. Results will contain only requested days. Days are represented by using numbers where Monday=1 and Sunday=7. For example: in order to retrieve weekend days use the following [ 6, 7 ].";
                        readonly type: "array";
                        readonly items: {
                            readonly enum: readonly [1, 2, 3, 4, 5, 6, 7];
                        };
                        readonly examples: readonly [6, 7];
                    };
                    readonly distance: {
                        readonly description: "Filter visits by distance in miles from home <strong>or</strong> work<br/> where only visits in a given radius will be used in metrics calculation.";
                        readonly type: "object";
                        readonly properties: {
                            readonly from: {
                                readonly description: "The origin from where the distance will be measured.";
                                readonly type: "string";
                                readonly enum: readonly ["home", "work"];
                                readonly examples: readonly ["home"];
                            };
                            readonly values: {
                                readonly description: "Object representation of the distance range<br/>lt - less than<br/>le - less than or equal to<br/>eq - equal to<br/>ge - greater than or equal to<br/>gt - greater than.";
                                readonly type: "object";
                                readonly properties: {
                                    readonly le: {
                                        readonly type: "number";
                                        readonly examples: readonly [100];
                                    };
                                    readonly ge: {
                                        readonly type: "number";
                                    };
                                    readonly lt: {
                                        readonly type: "number";
                                        readonly examples: readonly [250];
                                    };
                                    readonly gt: {
                                        readonly type: "number";
                                        readonly examples: readonly [10];
                                    };
                                    readonly eq: {
                                        readonly type: "number";
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly nearbyRadius: {
                readonly type: "integer";
                readonly enum: readonly [100, 250, 500, 750, 1000];
                readonly description: "The radius requested for nearby activity report generation.</br> <strong>Note</strong>: When a value is populated for this attribute - the report will be calculated as per the <<glossary:Nearby Activity report>> logic.";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly type: "object";
            readonly properties: {
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
                readonly items: {
                    readonly type: "array";
                    readonly items: {
                        readonly title: "Visit Metrics Summary";
                        readonly type: "object";
                        readonly properties: {
                            readonly apiId: {
                                readonly type: "string";
                                readonly description: "Placer API Entity Id";
                                readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                            };
                            readonly data: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly panelVisitors: {
                                        readonly type: "integer";
                                        readonly description: "The number of unique devices used for statistical extrapolation";
                                        readonly examples: readonly [5655];
                                    };
                                    readonly panelVisits: {
                                        readonly type: "integer";
                                        readonly description: "The number of visits observed by Placer and are used for statistical extrapolation";
                                        readonly examples: readonly [11546];
                                    };
                                    readonly visits: {
                                        readonly type: "integer";
                                        readonly description: "Extrapolated number of visits";
                                        readonly examples: readonly [433202];
                                    };
                                    readonly visitors: {
                                        readonly type: "integer";
                                        readonly description: "Extrapolated unique devices";
                                        readonly examples: readonly [184092];
                                    };
                                    readonly nearbyRadius: {
                                        readonly type: "integer";
                                        readonly enum: readonly [100, 250, 500, 750, 1000];
                                        readonly description: "The radius requested for nearby activity report generation.</br> <strong>Note</strong>: When a value is populated for this attribute - the report will be calculated as per the <<glossary:Nearby Activity report>> logic.\n\n`100` `250` `500` `750` `1000`";
                                    };
                                    readonly visitDurationSegmentation: {
                                        readonly description: "Represents the requested visit duration segmentation.<br> If the default visit duration segmentation is requested, the visitDurationSegmentation will display the actual segment.<br>\nIn cases where the default segment was requested for a chain, in which the list of entities used different default segments for the report calculation, the visitDurationSegmentation will be set to 'mixedSegments'.\n\n`under10Min` `10MinOrLonger` `allVisits` `mixedSegments`";
                                        readonly title: "Visit Duration Segmentation";
                                        readonly type: "string";
                                        readonly enum: readonly ["under10Min", "10MinOrLonger", "allVisits", "mixedSegments"];
                                        readonly examples: readonly ["10MinOrLonger"];
                                    };
                                    readonly metadata: {
                                        readonly title: "POI Entity (complex, venue and billboard only!) Object";
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly address: {
                                                readonly type: "object";
                                                readonly properties: {
                                                    readonly city: {
                                                        readonly type: "string";
                                                        readonly description: "Entity City";
                                                        readonly examples: readonly ["Milpitas"];
                                                    };
                                                    readonly state: {
                                                        readonly type: "string";
                                                        readonly description: "Entity State";
                                                        readonly examples: readonly ["California"];
                                                    };
                                                    readonly countryCode: {
                                                        readonly type: "string";
                                                        readonly description: "Entity Country Code";
                                                        readonly examples: readonly ["US"];
                                                    };
                                                    readonly streetName: {
                                                        readonly type: "string";
                                                        readonly description: "Entity Street Name";
                                                        readonly examples: readonly ["Ranch Dr"];
                                                    };
                                                    readonly formattedAddress: {
                                                        readonly type: "string";
                                                        readonly description: "Entity Address";
                                                        readonly examples: readonly ["301 Ranch Dr, Milpitas, CA, United States"];
                                                    };
                                                    readonly shortFormattedAddress: {
                                                        readonly type: "string";
                                                        readonly description: "Entity Address";
                                                        readonly examples: readonly ["Ranch Dr, Milpitas, CA"];
                                                    };
                                                    readonly zipCode: {
                                                        readonly type: "string";
                                                        readonly description: "Entity Zip Code";
                                                        readonly examples: readonly ["95035"];
                                                    };
                                                };
                                            };
                                            readonly isFlagged: {
                                                readonly type: "boolean";
                                                readonly description: "The Entity Data Is Incomplete";
                                                readonly examples: readonly [false];
                                            };
                                            readonly regions: {
                                                readonly type: "object";
                                                readonly description: "The regions in which the property is included";
                                                readonly properties: {
                                                    readonly dma: {
                                                        readonly type: "object";
                                                        readonly description: "The Entity Designated Market Area";
                                                        readonly properties: {
                                                            readonly code: {
                                                                readonly type: "string";
                                                                readonly examples: readonly [807];
                                                            };
                                                            readonly name: {
                                                                readonly type: "string";
                                                                readonly examples: readonly ["San Francisco-Oakland-San Jose, CA"];
                                                            };
                                                        };
                                                    };
                                                    readonly state: {
                                                        readonly type: "object";
                                                        readonly description: "Entity State";
                                                        readonly properties: {
                                                            readonly code: {
                                                                readonly type: "string";
                                                                readonly examples: readonly ["CA"];
                                                            };
                                                            readonly name: {
                                                                readonly type: "string";
                                                                readonly examples: readonly ["California"];
                                                            };
                                                        };
                                                    };
                                                    readonly cbsa: {
                                                        readonly type: "object";
                                                        readonly description: "The Entity Core-Based Statistical Areas";
                                                        readonly properties: {
                                                            readonly code: {
                                                                readonly type: "string";
                                                                readonly examples: readonly ["41940"];
                                                            };
                                                            readonly name: {
                                                                readonly type: "string";
                                                                readonly examples: readonly ["San Jose-Sunnyvale-Santa Clara, CA Metro Area"];
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                            readonly apiId: {
                                                readonly type: "string";
                                                readonly description: "Placer API Entity Id";
                                                readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                                            };
                                            readonly name: {
                                                readonly type: "string";
                                                readonly description: "Entity Name";
                                                readonly examples: readonly ["Walmart"];
                                            };
                                            readonly entityId: {
                                                readonly type: "string";
                                                readonly description: "Entity ID";
                                                readonly examples: readonly ["7d55054520e387813d764b03"];
                                            };
                                            readonly entityType: {
                                                readonly type: "string";
                                                readonly enum: readonly ["venue", "complex", "chain"];
                                                readonly description: "Entity Type (i.e. venue, complex etc.)\n\n`venue` `complex` `chain`";
                                                readonly examples: readonly ["venue"];
                                            };
                                            readonly categoryInfo: {
                                                readonly type: "object";
                                                readonly description: "Property’s categorization";
                                                readonly properties: {
                                                    readonly category: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["Fast Food & QSR"];
                                                    };
                                                    readonly group: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["Dining"];
                                                    };
                                                    readonly subCategory: {
                                                        readonly type: "string";
                                                        readonly examples: readonly ["Pizze Place"];
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "202": {
            readonly title: "In Progress Bulk Response";
            readonly type: "object";
            readonly required: readonly ["requestId"];
            readonly properties: {
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
                readonly items: {
                    readonly type: "array";
                    readonly items: {
                        readonly oneOf: readonly [{
                            readonly type: "object";
                            readonly properties: {
                                readonly details: {
                                    readonly type: "string";
                                    readonly enum: readonly ["IN_PROGRESS"];
                                    readonly description: "Status String\n\n`IN_PROGRESS`";
                                };
                                readonly code: {
                                    readonly type: "integer";
                                    readonly description: "Status Code";
                                    readonly examples: readonly [3005];
                                };
                                readonly message: {
                                    readonly type: "string";
                                    readonly description: "Status description";
                                    readonly examples: readonly ["Report is being prepared"];
                                };
                                readonly apiId: {
                                    readonly type: "string";
                                    readonly description: "Placer API Entity Id";
                                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                                };
                            };
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly details: {
                                    readonly type: "string";
                                    readonly enum: readonly ["IN_PROGRESS"];
                                    readonly description: "Status String\n\n`IN_PROGRESS`";
                                };
                                readonly code: {
                                    readonly type: "integer";
                                    readonly description: "Status Code";
                                    readonly examples: readonly [3005];
                                };
                                readonly message: {
                                    readonly type: "string";
                                    readonly description: "Status description";
                                    readonly examples: readonly ["Report is being prepared"];
                                };
                                readonly apiId: {
                                    readonly type: "string";
                                    readonly description: "Placer API Entity Id";
                                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                                };
                            };
                        }];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "207": {
            readonly title: "Multi-status bulk response";
            readonly type: "object";
            readonly required: readonly ["requestId"];
            readonly properties: {
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
                readonly items: {
                    readonly type: "array";
                    readonly items: {
                        readonly oneOf: readonly [{
                            readonly type: "object";
                            readonly properties: {
                                readonly details: {
                                    readonly type: "string";
                                    readonly enum: readonly ["IN_PROGRESS"];
                                    readonly description: "Status String\n\n`IN_PROGRESS`";
                                };
                                readonly code: {
                                    readonly type: "integer";
                                    readonly description: "Status Code";
                                    readonly examples: readonly [3005];
                                };
                                readonly message: {
                                    readonly type: "string";
                                    readonly description: "Status description";
                                    readonly examples: readonly ["Report is being prepared"];
                                };
                                readonly apiId: {
                                    readonly type: "string";
                                    readonly description: "Placer API Entity Id";
                                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                                };
                            };
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly status: {
                                    readonly type: "string";
                                    readonly enum: readonly ["SUCCESS"];
                                    readonly description: "Status String\n\n`SUCCESS`";
                                };
                                readonly code: {
                                    readonly type: "integer";
                                    readonly description: "Status Code";
                                    readonly examples: readonly [0];
                                };
                                readonly apiId: {
                                    readonly type: "string";
                                    readonly description: "Placer API Entity Id";
                                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                                };
                            };
                        }];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrInvalidArguments";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostV1ReportsVisitMetricsCbgs: {
    readonly body: {
        readonly title: "Visits By Cbg Model";
        readonly required: readonly ["apiIds", "endDate", "granularity", "startDate"];
        readonly type: "object";
        readonly properties: {
            readonly startDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data start date. Format YYYY-MM-DD";
                readonly examples: readonly ["2020-12-01"];
            };
            readonly endDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data end date. Format YYYY-MM-DD";
                readonly examples: readonly ["2021-05-31"];
            };
            readonly apiIds: {
                readonly type: "array";
                readonly minItems: 1;
                readonly maxItems: 100;
                readonly items: {
                    readonly type: "string";
                    readonly description: "Placer API Entity Id";
                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                };
            };
            readonly location: {
                readonly type: "string";
                readonly enum: readonly ["Home"];
                readonly default: "Home";
                readonly description: "This parameter determines which CBGs will be listed in the response of the visiting CBGs - The ones that are considered as the visitors' home or the ones considered as their work.</br>*Currently available for home CBGs only";
                readonly examples: readonly ["Home"];
            };
            readonly granularity: {
                readonly type: "string";
                readonly enum: readonly ["week", "month", "year"];
                readonly description: "The data aggregation granularity requested";
                readonly examples: readonly ["month"];
            };
            readonly trafficVolPct: {
                readonly type: "integer";
                readonly enum: readonly [70, 100];
                readonly default: 70;
                readonly description: "The threshold for the volume of traffic coming to the property.<br> For example - setting a traffic volume percentage of 70 will draw a polygon that includes at least 70% of the visitors’ home location, where 100 will consider all CBGs visited from to the requested POI";
                readonly examples: readonly [70];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly title: "Visits By Cbg Response";
            readonly required: readonly ["apiIds", "endDate", "granularity", "startDate"];
            readonly type: "object";
            readonly properties: {
                readonly startDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly description: "Queried data start date. Format YYYY-MM-DD";
                    readonly examples: readonly ["2020-12-01"];
                };
                readonly endDate: {
                    readonly type: "string";
                    readonly format: "date";
                    readonly description: "Queried data end date. Format YYYY-MM-DD";
                    readonly examples: readonly ["2021-05-31"];
                };
                readonly apiIds: {
                    readonly type: "array";
                    readonly minItems: 1;
                    readonly maxItems: 100;
                    readonly items: {
                        readonly type: "string";
                        readonly description: "Placer API Entity Id";
                        readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                    };
                };
                readonly location: {
                    readonly type: "string";
                    readonly enum: readonly ["Home"];
                    readonly default: "Home";
                    readonly description: "This parameter determines which CBGs will be listed in the response of the visiting CBGs - The ones that are considered as the visitors' home or the ones considered as their work.</br>*Currently available for home CBGs only\n\n`Home`";
                    readonly examples: readonly ["Home"];
                };
                readonly granularity: {
                    readonly type: "string";
                    readonly enum: readonly ["week", "month", "year"];
                    readonly description: "The data aggregation granularity requested\n\n`week` `month` `year`";
                    readonly examples: readonly ["month"];
                };
                readonly trafficVolPct: {
                    readonly type: "integer";
                    readonly enum: readonly [70, 100];
                    readonly default: 70;
                    readonly description: "The threshold for the volume of traffic coming to the property.<br> For example - setting a traffic volume percentage of 70 will draw a polygon that includes at least 70% of the visitors’ home location, where 100 will consider all CBGs visited from to the requested POI\n\n`70` `100`";
                    readonly examples: readonly [70];
                };
                readonly visitsByCBGs: {
                    readonly type: "array";
                    readonly description: "Array of visits by CBGs insights broken down by apiIds";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly apiId: {
                                readonly type: "string";
                                readonly description: "Placer API Entity Id";
                                readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                            };
                            readonly dates: {
                                readonly type: "array";
                                readonly description: "Array of start days of each bin based on the granularity";
                                readonly items: {
                                    readonly type: "string";
                                };
                                readonly examples: readonly ["2020-12-01", "2021-01-01", "2021-02-01", "2021-03-01", "2021-04-01", "2021-05-01"];
                            };
                            readonly visitsByCBGsTrend: {
                                readonly type: "array";
                                readonly description: "An Array that provides the visits per each CBG for the defined granularity broken down by the apiIds(corresponding to the apiIds array). <br>The data is presented as array objects corresponding to the dates array, where for each defined a nested array of coupled CBGcode-visits, that were observed during the relevant time period.";
                                readonly items: {
                                    readonly type: "array";
                                    readonly items: {
                                        readonly type: "object";
                                        readonly properties: {
                                            readonly CBGcode: {
                                                readonly type: "integer";
                                                readonly description: "The CBG code";
                                                readonly examples: readonly [481439506002];
                                            };
                                            readonly visits: {
                                                readonly type: "number";
                                                readonly format: "float";
                                                readonly description: "The estimated visits to the POI from the CBG for the corresponding bin period";
                                                readonly examples: readonly [45.98458763323508];
                                                readonly minimum: -3.402823669209385e+38;
                                                readonly maximum: 3.402823669209385e+38;
                                            };
                                        };
                                    };
                                };
                            };
                            readonly visitDurationSegmentation: {
                                readonly description: "The default visit duration segmentation is returned when the report calculation uses the default segmentation duration.\n\n`under10Min` `10MinOrLonger` `allVisits` `mixedSegments`";
                                readonly title: "Visit Duration Segmentation";
                                readonly type: "string";
                                readonly enum: readonly ["under10Min", "10MinOrLonger", "allVisits", "mixedSegments"];
                                readonly examples: readonly ["10MinOrLonger"];
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "202": {
            readonly title: "InProgress";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrorBadRequest";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostV1ReportsVisitMetricsDays: {
    readonly body: {
        readonly title: "Visits By Granularity Request";
        readonly type: "object";
        readonly required: readonly ["startDate", "endDate", "apiId"];
        readonly properties: {
            readonly startDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data start date. Format YYYY-MM-DD";
                readonly examples: readonly ["2020-12-01"];
            };
            readonly endDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data end date. Format YYYY-MM-DD";
                readonly examples: readonly ["2021-05-31"];
            };
            readonly apiId: {
                readonly type: "string";
                readonly description: "Placer API Entity Id";
                readonly examples: readonly ["venue:7d55054520e387813d764b03"];
            };
            readonly filters: {
                readonly description: "Filtering options for the report results.";
                readonly type: "object";
                readonly properties: {
                    readonly audienceType: {
                        readonly description: "If provided - metrics will be calculated based only on the specified types of audience.";
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                            readonly enum: readonly ["visitors", "employees", "residents"];
                        };
                        readonly examples: readonly ["visitors"];
                    };
                    readonly dwellTime: {
                        readonly description: "Metrics will be calculated considering the requested dwell time range.";
                        readonly type: "object";
                        readonly properties: {
                            readonly operator: {
                                readonly description: "Less than (<) to Greater Equal (>=)";
                                readonly type: "string";
                                readonly enum: readonly ["<", ">="];
                                readonly examples: readonly ["<"];
                            };
                            readonly value: {
                                readonly description: "The wanted dwell time";
                                readonly type: "integer";
                                readonly examples: readonly [150];
                            };
                        };
                    };
                    readonly hoursRange: {
                        readonly description: "Filter the report’s results based on visits hours range. The filter is defined by 2 strings:<br/> 1. The starting hour to filter the reports results from (Format HH:MM XM, for example: 08:00 am).<br/> 2. The end hour to filter the reports results(Format HH:MM XM, for example: 11:59 pm) .";
                        readonly type: "object";
                        readonly required: readonly ["fromHour", "toHour"];
                        readonly properties: {
                            readonly fromHour: {
                                readonly type: "string";
                                readonly examples: readonly ["03:00 am"];
                            };
                            readonly toHour: {
                                readonly type: "string";
                                readonly examples: readonly ["11:59 pm"];
                            };
                        };
                    };
                    readonly daysOfWeek: {
                        readonly description: "Filter visit calculation based on days of the week. Results will contain only requested days. Days are represented by using numbers where Monday=1 and Sunday=7. For example: in order to retrieve weekend days use the following [ 6, 7 ].";
                        readonly type: "array";
                        readonly items: {
                            readonly enum: readonly [1, 2, 3, 4, 5, 6, 7];
                        };
                        readonly examples: readonly [6, 7];
                    };
                    readonly distance: {
                        readonly description: "Filter visits by distance in miles from home <strong>or</strong> work<br/> where only visits in a given radius will be used in metrics calculation.";
                        readonly type: "object";
                        readonly properties: {
                            readonly from: {
                                readonly description: "The origin from where the distance will be measured.";
                                readonly type: "string";
                                readonly enum: readonly ["home", "work"];
                                readonly examples: readonly ["home"];
                            };
                            readonly values: {
                                readonly description: "Object representation of the distance range<br/>lt - less than<br/>le - less than or equal to<br/>eq - equal to<br/>ge - greater than or equal to<br/>gt - greater than.";
                                readonly type: "object";
                                readonly properties: {
                                    readonly le: {
                                        readonly type: "number";
                                        readonly examples: readonly [100];
                                    };
                                    readonly ge: {
                                        readonly type: "number";
                                    };
                                    readonly lt: {
                                        readonly type: "number";
                                        readonly examples: readonly [250];
                                    };
                                    readonly gt: {
                                        readonly type: "number";
                                        readonly examples: readonly [10];
                                    };
                                    readonly eq: {
                                        readonly type: "number";
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly nearbyRadius: {
                readonly type: "integer";
                readonly enum: readonly [100, 250, 500, 750, 1000];
                readonly description: "The radius requested for nearby activity report generation.</br> <strong>Note</strong>: When a value is populated for this attribute - the report will be calculated as per the <<glossary:Nearby Activity report>> logic.";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly title: "Base Response";
            readonly type: "object";
            readonly required: readonly ["requestId"];
            readonly properties: {
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly bins: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "integer";
                            };
                            readonly examples: readonly [0, 1, 2, 3, 4, 5, 6];
                        };
                        readonly estimatedFoottraffic: {
                            readonly type: "array";
                            readonly items: {
                                readonly type: "integer";
                            };
                            readonly examples: readonly [219347, 227870, 226154, 229736, 245526, 369653, 295663];
                        };
                        readonly nearbyRadius: {
                            readonly type: "integer";
                            readonly enum: readonly [100, 250, 500, 750, 1000];
                            readonly description: "The radius requested for nearby activity report generation.</br> <strong>Note</strong>: When a value is populated for this attribute - the report will be calculated as per the <<glossary:Nearby Activity report>> logic.\n\n`100` `250` `500` `750` `1000`";
                        };
                    };
                };
                readonly filters: {
                    readonly type: "object";
                    readonly properties: {
                        readonly audienceType: {
                            readonly description: "The list of audiences that is specified in the request filter.";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                                readonly enum: readonly ["visitors", "employees", "residents"];
                                readonly description: "`visitors` `employees` `residents`";
                            };
                            readonly examples: readonly ["visitors"];
                        };
                        readonly dwellTime: {
                            readonly description: "The dwell time filter specified in the request, in case it was utilized.<br/> For example: “< 100” or “>= 10”";
                            readonly type: "object";
                            readonly properties: {
                                readonly operator: {
                                    readonly description: "Represents the operator used for defining the dwell time range for filtering the report data\n\n`<` `>=`";
                                    readonly type: "string";
                                    readonly enum: readonly ["<", ">="];
                                    readonly examples: readonly ["<"];
                                };
                                readonly value: {
                                    readonly description: "Represents the number of minutes referred to when defining the dwell time range for filtering the report data";
                                    readonly type: "integer";
                                    readonly examples: readonly [150];
                                };
                            };
                        };
                        readonly hoursRange: {
                            readonly description: "The hours range that is specified in the request filter.";
                            readonly type: "object";
                            readonly properties: {
                                readonly fromHour: {
                                    readonly description: "Start visits hour (Format HH:MM XM, for example: 08:00 am)";
                                    readonly type: "string";
                                    readonly examples: readonly ["03:00 am"];
                                };
                                readonly toHour: {
                                    readonly description: "End visitation hour (Format HH:MM XM, for example: 08:00 am)";
                                    readonly type: "string";
                                    readonly examples: readonly ["11:59 pm"];
                                };
                            };
                        };
                        readonly daysOfWeek: {
                            readonly description: "A list of days represented by integers (Monday=1, Sunday=7) as specified in the request filter, which was used in the report calculation.";
                            readonly type: "array";
                            readonly items: {
                                readonly enum: readonly [1, 2, 3, 4, 5, 6, 7];
                            };
                            readonly examples: readonly [6, 7];
                        };
                        readonly distance: {
                            readonly description: "The visits considered for the report calculation by distance in miles from home <strong>or</strong> work as specified in the request filter.";
                            readonly type: "object";
                            readonly properties: {
                                readonly from: {
                                    readonly description: "The origin from where the distance will be measured.\n\n`home` `work`";
                                    readonly type: "string";
                                    readonly enum: readonly ["home", "work"];
                                    readonly examples: readonly ["home"];
                                };
                                readonly values: {
                                    readonly description: "Object representation of the distance range<br/>lt - less than<br/>le - less than or equal to<br/>eq - equal to<br/>ge - greater than or equal to<br/>gt - greater than.";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly le: {
                                            readonly type: "number";
                                            readonly examples: readonly [100];
                                        };
                                        readonly ge: {
                                            readonly type: "number";
                                        };
                                        readonly lt: {
                                            readonly type: "number";
                                            readonly examples: readonly [250];
                                        };
                                        readonly gt: {
                                            readonly type: "number";
                                            readonly examples: readonly [10];
                                        };
                                        readonly eq: {
                                            readonly type: "number";
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                readonly visitDurationSegmentation: {
                    readonly description: "The default visit duration segmentation is returned when the report calculation uses the default segmentation duration.\n\n`under10Min` `10MinOrLonger` `allVisits` `mixedSegments`";
                    readonly title: "Visit Duration Segmentation";
                    readonly type: "string";
                    readonly enum: readonly ["under10Min", "10MinOrLonger", "allVisits", "mixedSegments"];
                    readonly examples: readonly ["10MinOrLonger"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "202": {
            readonly title: "In Progress Bulk Response";
            readonly type: "object";
            readonly required: readonly ["requestId"];
            readonly properties: {
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
                readonly items: {
                    readonly type: "array";
                    readonly items: {
                        readonly oneOf: readonly [{
                            readonly type: "object";
                            readonly properties: {
                                readonly details: {
                                    readonly type: "string";
                                    readonly enum: readonly ["IN_PROGRESS"];
                                    readonly description: "Status String\n\n`IN_PROGRESS`";
                                };
                                readonly code: {
                                    readonly type: "integer";
                                    readonly description: "Status Code";
                                    readonly examples: readonly [3005];
                                };
                                readonly message: {
                                    readonly type: "string";
                                    readonly description: "Status description";
                                    readonly examples: readonly ["Report is being prepared"];
                                };
                                readonly apiId: {
                                    readonly type: "string";
                                    readonly description: "Placer API Entity Id";
                                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                                };
                            };
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly details: {
                                    readonly type: "string";
                                    readonly enum: readonly ["IN_PROGRESS"];
                                    readonly description: "Status String\n\n`IN_PROGRESS`";
                                };
                                readonly code: {
                                    readonly type: "integer";
                                    readonly description: "Status Code";
                                    readonly examples: readonly [3005];
                                };
                                readonly message: {
                                    readonly type: "string";
                                    readonly description: "Status description";
                                    readonly examples: readonly ["Report is being prepared"];
                                };
                                readonly apiId: {
                                    readonly type: "string";
                                    readonly description: "Placer API Entity Id";
                                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                                };
                            };
                        }];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "204": {
            readonly title: "No Content Response";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "207": {
            readonly title: "Multi-status bulk response";
            readonly type: "object";
            readonly required: readonly ["requestId"];
            readonly properties: {
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
                readonly items: {
                    readonly type: "array";
                    readonly items: {
                        readonly oneOf: readonly [{
                            readonly type: "object";
                            readonly properties: {
                                readonly details: {
                                    readonly type: "string";
                                    readonly enum: readonly ["IN_PROGRESS"];
                                    readonly description: "Status String\n\n`IN_PROGRESS`";
                                };
                                readonly code: {
                                    readonly type: "integer";
                                    readonly description: "Status Code";
                                    readonly examples: readonly [3005];
                                };
                                readonly message: {
                                    readonly type: "string";
                                    readonly description: "Status description";
                                    readonly examples: readonly ["Report is being prepared"];
                                };
                                readonly apiId: {
                                    readonly type: "string";
                                    readonly description: "Placer API Entity Id";
                                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                                };
                            };
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly status: {
                                    readonly type: "string";
                                    readonly enum: readonly ["SUCCESS"];
                                    readonly description: "Status String\n\n`SUCCESS`";
                                };
                                readonly code: {
                                    readonly type: "integer";
                                    readonly description: "Status Code";
                                    readonly examples: readonly [0];
                                };
                                readonly apiId: {
                                    readonly type: "string";
                                    readonly description: "Placer API Entity Id";
                                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                                };
                            };
                        }];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrInvalidArguments";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostV1ReportsVisitMetricsDwellTime: {
    readonly body: {
        readonly title: "Visits By Granularity Request";
        readonly type: "object";
        readonly required: readonly ["startDate", "endDate", "apiId"];
        readonly properties: {
            readonly startDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data start date. Format YYYY-MM-DD";
                readonly examples: readonly ["2020-12-01"];
            };
            readonly endDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data end date. Format YYYY-MM-DD";
                readonly examples: readonly ["2021-05-31"];
            };
            readonly apiId: {
                readonly type: "string";
                readonly description: "Placer API Entity Id";
                readonly examples: readonly ["venue:7d55054520e387813d764b03"];
            };
            readonly filters: {
                readonly description: "Filtering options for the report results.";
                readonly type: "object";
                readonly properties: {
                    readonly audienceType: {
                        readonly description: "If provided - metrics will be calculated based only on the specified types of audience.";
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                            readonly enum: readonly ["visitors", "employees", "residents"];
                        };
                        readonly examples: readonly ["visitors"];
                    };
                    readonly dwellTime: {
                        readonly description: "Metrics will be calculated considering the requested dwell time range.";
                        readonly type: "object";
                        readonly properties: {
                            readonly operator: {
                                readonly description: "Less than (<) to Greater Equal (>=)";
                                readonly type: "string";
                                readonly enum: readonly ["<", ">="];
                                readonly examples: readonly ["<"];
                            };
                            readonly value: {
                                readonly description: "The wanted dwell time";
                                readonly type: "integer";
                                readonly examples: readonly [150];
                            };
                        };
                    };
                    readonly hoursRange: {
                        readonly description: "Filter the report’s results based on visits hours range. The filter is defined by 2 strings:<br/> 1. The starting hour to filter the reports results from (Format HH:MM XM, for example: 08:00 am).<br/> 2. The end hour to filter the reports results(Format HH:MM XM, for example: 11:59 pm) .";
                        readonly type: "object";
                        readonly required: readonly ["fromHour", "toHour"];
                        readonly properties: {
                            readonly fromHour: {
                                readonly type: "string";
                                readonly examples: readonly ["03:00 am"];
                            };
                            readonly toHour: {
                                readonly type: "string";
                                readonly examples: readonly ["11:59 pm"];
                            };
                        };
                    };
                    readonly daysOfWeek: {
                        readonly description: "Filter visit calculation based on days of the week. Results will contain only requested days. Days are represented by using numbers where Monday=1 and Sunday=7. For example: in order to retrieve weekend days use the following [ 6, 7 ].";
                        readonly type: "array";
                        readonly items: {
                            readonly enum: readonly [1, 2, 3, 4, 5, 6, 7];
                        };
                        readonly examples: readonly [6, 7];
                    };
                    readonly distance: {
                        readonly description: "Filter visits by distance in miles from home <strong>or</strong> work<br/> where only visits in a given radius will be used in metrics calculation.";
                        readonly type: "object";
                        readonly properties: {
                            readonly from: {
                                readonly description: "The origin from where the distance will be measured.";
                                readonly type: "string";
                                readonly enum: readonly ["home", "work"];
                                readonly examples: readonly ["home"];
                            };
                            readonly values: {
                                readonly description: "Object representation of the distance range<br/>lt - less than<br/>le - less than or equal to<br/>eq - equal to<br/>ge - greater than or equal to<br/>gt - greater than.";
                                readonly type: "object";
                                readonly properties: {
                                    readonly le: {
                                        readonly type: "number";
                                        readonly examples: readonly [100];
                                    };
                                    readonly ge: {
                                        readonly type: "number";
                                    };
                                    readonly lt: {
                                        readonly type: "number";
                                        readonly examples: readonly [250];
                                    };
                                    readonly gt: {
                                        readonly type: "number";
                                        readonly examples: readonly [10];
                                    };
                                    readonly eq: {
                                        readonly type: "number";
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly nearbyRadius: {
                readonly type: "integer";
                readonly enum: readonly [100, 250, 500, 750, 1000];
                readonly description: "The radius requested for nearby activity report generation.</br> <strong>Note</strong>: When a value is populated for this attribute - the report will be calculated as per the <<glossary:Nearby Activity report>> logic.";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly title: "Base Response";
            readonly type: "object";
            readonly required: readonly ["requestId"];
            readonly properties: {
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly bins: {
                            readonly type: "array";
                            readonly description: "[0,5,15,30,45,60,75,90,105,120,135,150] (I.e. 5 represents 5-14 minutes, 150 represents all visits with dwell time higher than or equal to 150)";
                            readonly items: {
                                readonly type: "integer";
                            };
                            readonly examples: readonly [0, 5, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150];
                        };
                        readonly estimatedFoottraffic: {
                            readonly type: "array";
                            readonly description: "Visits correlated with the same index in the dwell time bins array";
                            readonly items: {
                                readonly type: "integer";
                            };
                            readonly examples: readonly [0, 1099, 290496, 203518, 118502, 62588, 31487, 15440, 6029, 3405, 1877, 3602];
                        };
                        readonly average: {
                            readonly type: "integer";
                            readonly description: "The average dwell time in the POI during the requested period";
                            readonly examples: readonly [41];
                        };
                        readonly median: {
                            readonly type: "integer";
                            readonly description: "The median dwell time in the POI during the requested period";
                            readonly examples: readonly [34];
                        };
                        readonly nearbyRadius: {
                            readonly type: "integer";
                            readonly enum: readonly [100, 250, 500, 750, 1000];
                            readonly description: "The radius requested for nearby activity report generation.</br> <strong>Note</strong>: When a value is populated for this attribute - the report will be calculated as per the <<glossary:Nearby Activity report>> logic.\n\n`100` `250` `500` `750` `1000`";
                        };
                    };
                };
                readonly filters: {
                    readonly type: "object";
                    readonly properties: {
                        readonly audienceType: {
                            readonly description: "The list of audiences that is specified in the request filter.";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                                readonly enum: readonly ["visitors", "employees", "residents"];
                                readonly description: "`visitors` `employees` `residents`";
                            };
                            readonly examples: readonly ["visitors"];
                        };
                        readonly dwellTime: {
                            readonly description: "The dwell time filter specified in the request, in case it was utilized.<br/> For example: “< 100” or “>= 10”";
                            readonly type: "object";
                            readonly properties: {
                                readonly operator: {
                                    readonly description: "Represents the operator used for defining the dwell time range for filtering the report data\n\n`<` `>=`";
                                    readonly type: "string";
                                    readonly enum: readonly ["<", ">="];
                                    readonly examples: readonly ["<"];
                                };
                                readonly value: {
                                    readonly description: "Represents the number of minutes referred to when defining the dwell time range for filtering the report data";
                                    readonly type: "integer";
                                    readonly examples: readonly [150];
                                };
                            };
                        };
                        readonly hoursRange: {
                            readonly description: "The hours range that is specified in the request filter.";
                            readonly type: "object";
                            readonly properties: {
                                readonly fromHour: {
                                    readonly description: "Start visits hour (Format HH:MM XM, for example: 08:00 am)";
                                    readonly type: "string";
                                    readonly examples: readonly ["03:00 am"];
                                };
                                readonly toHour: {
                                    readonly description: "End visitation hour (Format HH:MM XM, for example: 08:00 am)";
                                    readonly type: "string";
                                    readonly examples: readonly ["11:59 pm"];
                                };
                            };
                        };
                        readonly daysOfWeek: {
                            readonly description: "A list of days represented by integers (Monday=1, Sunday=7) as specified in the request filter, which was used in the report calculation.";
                            readonly type: "array";
                            readonly items: {
                                readonly enum: readonly [1, 2, 3, 4, 5, 6, 7];
                            };
                            readonly examples: readonly [6, 7];
                        };
                        readonly distance: {
                            readonly description: "The visits considered for the report calculation by distance in miles from home <strong>or</strong> work as specified in the request filter.";
                            readonly type: "object";
                            readonly properties: {
                                readonly from: {
                                    readonly description: "The origin from where the distance will be measured.\n\n`home` `work`";
                                    readonly type: "string";
                                    readonly enum: readonly ["home", "work"];
                                    readonly examples: readonly ["home"];
                                };
                                readonly values: {
                                    readonly description: "Object representation of the distance range<br/>lt - less than<br/>le - less than or equal to<br/>eq - equal to<br/>ge - greater than or equal to<br/>gt - greater than.";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly le: {
                                            readonly type: "number";
                                            readonly examples: readonly [100];
                                        };
                                        readonly ge: {
                                            readonly type: "number";
                                        };
                                        readonly lt: {
                                            readonly type: "number";
                                            readonly examples: readonly [250];
                                        };
                                        readonly gt: {
                                            readonly type: "number";
                                            readonly examples: readonly [10];
                                        };
                                        readonly eq: {
                                            readonly type: "number";
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                readonly visitDurationSegmentation: {
                    readonly description: "The default visit duration segmentation is returned when the report calculation uses the default segmentation duration.\n\n`under10Min` `10MinOrLonger` `allVisits` `mixedSegments`";
                    readonly title: "Visit Duration Segmentation";
                    readonly type: "string";
                    readonly enum: readonly ["under10Min", "10MinOrLonger", "allVisits", "mixedSegments"];
                    readonly examples: readonly ["10MinOrLonger"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "202": {
            readonly title: "In Progress Bulk Response";
            readonly type: "object";
            readonly required: readonly ["requestId"];
            readonly properties: {
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
                readonly items: {
                    readonly type: "array";
                    readonly items: {
                        readonly oneOf: readonly [{
                            readonly type: "object";
                            readonly properties: {
                                readonly details: {
                                    readonly type: "string";
                                    readonly enum: readonly ["IN_PROGRESS"];
                                    readonly description: "Status String\n\n`IN_PROGRESS`";
                                };
                                readonly code: {
                                    readonly type: "integer";
                                    readonly description: "Status Code";
                                    readonly examples: readonly [3005];
                                };
                                readonly message: {
                                    readonly type: "string";
                                    readonly description: "Status description";
                                    readonly examples: readonly ["Report is being prepared"];
                                };
                                readonly apiId: {
                                    readonly type: "string";
                                    readonly description: "Placer API Entity Id";
                                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                                };
                            };
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly details: {
                                    readonly type: "string";
                                    readonly enum: readonly ["IN_PROGRESS"];
                                    readonly description: "Status String\n\n`IN_PROGRESS`";
                                };
                                readonly code: {
                                    readonly type: "integer";
                                    readonly description: "Status Code";
                                    readonly examples: readonly [3005];
                                };
                                readonly message: {
                                    readonly type: "string";
                                    readonly description: "Status description";
                                    readonly examples: readonly ["Report is being prepared"];
                                };
                                readonly apiId: {
                                    readonly type: "string";
                                    readonly description: "Placer API Entity Id";
                                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                                };
                            };
                        }];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "204": {
            readonly title: "No Content Response";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "207": {
            readonly title: "Multi-status bulk response";
            readonly type: "object";
            readonly required: readonly ["requestId"];
            readonly properties: {
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
                readonly items: {
                    readonly type: "array";
                    readonly items: {
                        readonly oneOf: readonly [{
                            readonly type: "object";
                            readonly properties: {
                                readonly details: {
                                    readonly type: "string";
                                    readonly enum: readonly ["IN_PROGRESS"];
                                    readonly description: "Status String\n\n`IN_PROGRESS`";
                                };
                                readonly code: {
                                    readonly type: "integer";
                                    readonly description: "Status Code";
                                    readonly examples: readonly [3005];
                                };
                                readonly message: {
                                    readonly type: "string";
                                    readonly description: "Status description";
                                    readonly examples: readonly ["Report is being prepared"];
                                };
                                readonly apiId: {
                                    readonly type: "string";
                                    readonly description: "Placer API Entity Id";
                                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                                };
                            };
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly status: {
                                    readonly type: "string";
                                    readonly enum: readonly ["SUCCESS"];
                                    readonly description: "Status String\n\n`SUCCESS`";
                                };
                                readonly code: {
                                    readonly type: "integer";
                                    readonly description: "Status Code";
                                    readonly examples: readonly [0];
                                };
                                readonly apiId: {
                                    readonly type: "string";
                                    readonly description: "Placer API Entity Id";
                                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                                };
                            };
                        }];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrInvalidArguments";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostV1ReportsVisitMetricsHours: {
    readonly body: {
        readonly title: "Visits By Granularity Request";
        readonly type: "object";
        readonly required: readonly ["startDate", "endDate", "apiId"];
        readonly properties: {
            readonly startDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data start date. Format YYYY-MM-DD";
                readonly examples: readonly ["2020-12-01"];
            };
            readonly endDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data end date. Format YYYY-MM-DD";
                readonly examples: readonly ["2021-05-31"];
            };
            readonly apiId: {
                readonly type: "string";
                readonly description: "Placer API Entity Id";
                readonly examples: readonly ["venue:7d55054520e387813d764b03"];
            };
            readonly filters: {
                readonly description: "Filtering options for the report results.";
                readonly type: "object";
                readonly properties: {
                    readonly audienceType: {
                        readonly description: "If provided - metrics will be calculated based only on the specified types of audience.";
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                            readonly enum: readonly ["visitors", "employees", "residents"];
                        };
                        readonly examples: readonly ["visitors"];
                    };
                    readonly dwellTime: {
                        readonly description: "Metrics will be calculated considering the requested dwell time range.";
                        readonly type: "object";
                        readonly properties: {
                            readonly operator: {
                                readonly description: "Less than (<) to Greater Equal (>=)";
                                readonly type: "string";
                                readonly enum: readonly ["<", ">="];
                                readonly examples: readonly ["<"];
                            };
                            readonly value: {
                                readonly description: "The wanted dwell time";
                                readonly type: "integer";
                                readonly examples: readonly [150];
                            };
                        };
                    };
                    readonly hoursRange: {
                        readonly description: "Filter the report’s results based on visits hours range. The filter is defined by 2 strings:<br/> 1. The starting hour to filter the reports results from (Format HH:MM XM, for example: 08:00 am).<br/> 2. The end hour to filter the reports results(Format HH:MM XM, for example: 11:59 pm) .";
                        readonly type: "object";
                        readonly required: readonly ["fromHour", "toHour"];
                        readonly properties: {
                            readonly fromHour: {
                                readonly type: "string";
                                readonly examples: readonly ["03:00 am"];
                            };
                            readonly toHour: {
                                readonly type: "string";
                                readonly examples: readonly ["11:59 pm"];
                            };
                        };
                    };
                    readonly daysOfWeek: {
                        readonly description: "Filter visit calculation based on days of the week. Results will contain only requested days. Days are represented by using numbers where Monday=1 and Sunday=7. For example: in order to retrieve weekend days use the following [ 6, 7 ].";
                        readonly type: "array";
                        readonly items: {
                            readonly enum: readonly [1, 2, 3, 4, 5, 6, 7];
                        };
                        readonly examples: readonly [6, 7];
                    };
                    readonly distance: {
                        readonly description: "Filter visits by distance in miles from home <strong>or</strong> work<br/> where only visits in a given radius will be used in metrics calculation.";
                        readonly type: "object";
                        readonly properties: {
                            readonly from: {
                                readonly description: "The origin from where the distance will be measured.";
                                readonly type: "string";
                                readonly enum: readonly ["home", "work"];
                                readonly examples: readonly ["home"];
                            };
                            readonly values: {
                                readonly description: "Object representation of the distance range<br/>lt - less than<br/>le - less than or equal to<br/>eq - equal to<br/>ge - greater than or equal to<br/>gt - greater than.";
                                readonly type: "object";
                                readonly properties: {
                                    readonly le: {
                                        readonly type: "number";
                                        readonly examples: readonly [100];
                                    };
                                    readonly ge: {
                                        readonly type: "number";
                                    };
                                    readonly lt: {
                                        readonly type: "number";
                                        readonly examples: readonly [250];
                                    };
                                    readonly gt: {
                                        readonly type: "number";
                                        readonly examples: readonly [10];
                                    };
                                    readonly eq: {
                                        readonly type: "number";
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly nearbyRadius: {
                readonly type: "integer";
                readonly enum: readonly [100, 250, 500, 750, 1000];
                readonly description: "The radius requested for nearby activity report generation.</br> <strong>Note</strong>: When a value is populated for this attribute - the report will be calculated as per the <<glossary:Nearby Activity report>> logic.";
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly title: "Base Response";
            readonly type: "object";
            readonly required: readonly ["requestId"];
            readonly properties: {
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly bins: {
                            readonly type: "array";
                            readonly description: "[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], where each represents an hour in the day. (e.g. 11 = 11 am - 12 pm)";
                            readonly items: {
                                readonly type: "integer";
                            };
                            readonly examples: readonly [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
                        };
                        readonly estimatedFoottraffic: {
                            readonly type: "array";
                            readonly description: "Visits correlated with the same index in the hour bins array";
                            readonly items: {
                                readonly type: "integer";
                            };
                            readonly examples: readonly [691, 337, 337, 337, 337, 158, 308, 4081, 16268, 31543, 54469, 78110, 98220, 108307, 112484, 130168, 135215, 127224, 115792, 97031, 75903, 45117, 11245, 996];
                        };
                        readonly openingHours: {
                            readonly type: "array";
                            readonly description: "The property’s business opening hours on each day of the week.";
                            readonly items: {
                                readonly title: "Opening Hours";
                                readonly type: "object";
                                readonly properties: {
                                    readonly day: {
                                        readonly type: "string";
                                        readonly enum: readonly ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                                        readonly description: "The day of the week\n\n`Sunday` `Monday` `Tuesday` `Wednesday` `Thursday` `Friday` `Saturday`";
                                        readonly examples: readonly ["Sunday"];
                                    };
                                    readonly fromHour: {
                                        readonly type: "string";
                                        readonly description: "Opening hour";
                                        readonly examples: readonly ["8:00 AM"];
                                    };
                                    readonly toHour: {
                                        readonly type: "string";
                                        readonly description: "Closing hour";
                                        readonly examples: readonly ["5:00 PM"];
                                    };
                                };
                            };
                        };
                        readonly nearbyRadius: {
                            readonly type: "integer";
                            readonly enum: readonly [100, 250, 500, 750, 1000];
                            readonly description: "The radius requested for nearby activity report generation.</br> <strong>Note</strong>: When a value is populated for this attribute - the report will be calculated as per the <<glossary:Nearby Activity report>> logic.\n\n`100` `250` `500` `750` `1000`";
                        };
                    };
                };
                readonly filters: {
                    readonly type: "object";
                    readonly properties: {
                        readonly audienceType: {
                            readonly description: "The list of audiences that is specified in the request filter.";
                            readonly type: "array";
                            readonly items: {
                                readonly type: "string";
                                readonly enum: readonly ["visitors", "employees", "residents"];
                                readonly description: "`visitors` `employees` `residents`";
                            };
                            readonly examples: readonly ["visitors"];
                        };
                        readonly dwellTime: {
                            readonly description: "The dwell time filter specified in the request, in case it was utilized.<br/> For example: “< 100” or “>= 10”";
                            readonly type: "object";
                            readonly properties: {
                                readonly operator: {
                                    readonly description: "Represents the operator used for defining the dwell time range for filtering the report data\n\n`<` `>=`";
                                    readonly type: "string";
                                    readonly enum: readonly ["<", ">="];
                                    readonly examples: readonly ["<"];
                                };
                                readonly value: {
                                    readonly description: "Represents the number of minutes referred to when defining the dwell time range for filtering the report data";
                                    readonly type: "integer";
                                    readonly examples: readonly [150];
                                };
                            };
                        };
                        readonly hoursRange: {
                            readonly description: "The hours range that is specified in the request filter.";
                            readonly type: "object";
                            readonly properties: {
                                readonly fromHour: {
                                    readonly description: "Start visits hour (Format HH:MM XM, for example: 08:00 am)";
                                    readonly type: "string";
                                    readonly examples: readonly ["03:00 am"];
                                };
                                readonly toHour: {
                                    readonly description: "End visitation hour (Format HH:MM XM, for example: 08:00 am)";
                                    readonly type: "string";
                                    readonly examples: readonly ["11:59 pm"];
                                };
                            };
                        };
                        readonly daysOfWeek: {
                            readonly description: "A list of days represented by integers (Monday=1, Sunday=7) as specified in the request filter, which was used in the report calculation.";
                            readonly type: "array";
                            readonly items: {
                                readonly enum: readonly [1, 2, 3, 4, 5, 6, 7];
                            };
                            readonly examples: readonly [6, 7];
                        };
                        readonly distance: {
                            readonly description: "The visits considered for the report calculation by distance in miles from home <strong>or</strong> work as specified in the request filter.";
                            readonly type: "object";
                            readonly properties: {
                                readonly from: {
                                    readonly description: "The origin from where the distance will be measured.\n\n`home` `work`";
                                    readonly type: "string";
                                    readonly enum: readonly ["home", "work"];
                                    readonly examples: readonly ["home"];
                                };
                                readonly values: {
                                    readonly description: "Object representation of the distance range<br/>lt - less than<br/>le - less than or equal to<br/>eq - equal to<br/>ge - greater than or equal to<br/>gt - greater than.";
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly le: {
                                            readonly type: "number";
                                            readonly examples: readonly [100];
                                        };
                                        readonly ge: {
                                            readonly type: "number";
                                        };
                                        readonly lt: {
                                            readonly type: "number";
                                            readonly examples: readonly [250];
                                        };
                                        readonly gt: {
                                            readonly type: "number";
                                            readonly examples: readonly [10];
                                        };
                                        readonly eq: {
                                            readonly type: "number";
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                readonly visitDurationSegmentation: {
                    readonly description: "The default visit duration segmentation is returned when the report calculation uses the default segmentation duration.\n\n`under10Min` `10MinOrLonger` `allVisits` `mixedSegments`";
                    readonly title: "Visit Duration Segmentation";
                    readonly type: "string";
                    readonly enum: readonly ["under10Min", "10MinOrLonger", "allVisits", "mixedSegments"];
                    readonly examples: readonly ["10MinOrLonger"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "202": {
            readonly title: "In Progress Bulk Response";
            readonly type: "object";
            readonly required: readonly ["requestId"];
            readonly properties: {
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
                readonly items: {
                    readonly type: "array";
                    readonly items: {
                        readonly oneOf: readonly [{
                            readonly type: "object";
                            readonly properties: {
                                readonly details: {
                                    readonly type: "string";
                                    readonly enum: readonly ["IN_PROGRESS"];
                                    readonly description: "Status String\n\n`IN_PROGRESS`";
                                };
                                readonly code: {
                                    readonly type: "integer";
                                    readonly description: "Status Code";
                                    readonly examples: readonly [3005];
                                };
                                readonly message: {
                                    readonly type: "string";
                                    readonly description: "Status description";
                                    readonly examples: readonly ["Report is being prepared"];
                                };
                                readonly apiId: {
                                    readonly type: "string";
                                    readonly description: "Placer API Entity Id";
                                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                                };
                            };
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly details: {
                                    readonly type: "string";
                                    readonly enum: readonly ["IN_PROGRESS"];
                                    readonly description: "Status String\n\n`IN_PROGRESS`";
                                };
                                readonly code: {
                                    readonly type: "integer";
                                    readonly description: "Status Code";
                                    readonly examples: readonly [3005];
                                };
                                readonly message: {
                                    readonly type: "string";
                                    readonly description: "Status description";
                                    readonly examples: readonly ["Report is being prepared"];
                                };
                                readonly apiId: {
                                    readonly type: "string";
                                    readonly description: "Placer API Entity Id";
                                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                                };
                            };
                        }];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "204": {
            readonly title: "No Content Response";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "207": {
            readonly title: "Multi-status bulk response";
            readonly type: "object";
            readonly required: readonly ["requestId"];
            readonly properties: {
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
                readonly items: {
                    readonly type: "array";
                    readonly items: {
                        readonly oneOf: readonly [{
                            readonly type: "object";
                            readonly properties: {
                                readonly details: {
                                    readonly type: "string";
                                    readonly enum: readonly ["IN_PROGRESS"];
                                    readonly description: "Status String\n\n`IN_PROGRESS`";
                                };
                                readonly code: {
                                    readonly type: "integer";
                                    readonly description: "Status Code";
                                    readonly examples: readonly [3005];
                                };
                                readonly message: {
                                    readonly type: "string";
                                    readonly description: "Status description";
                                    readonly examples: readonly ["Report is being prepared"];
                                };
                                readonly apiId: {
                                    readonly type: "string";
                                    readonly description: "Placer API Entity Id";
                                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                                };
                            };
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly status: {
                                    readonly type: "string";
                                    readonly enum: readonly ["SUCCESS"];
                                    readonly description: "Status String\n\n`SUCCESS`";
                                };
                                readonly code: {
                                    readonly type: "integer";
                                    readonly description: "Status Code";
                                    readonly examples: readonly [0];
                                };
                                readonly apiId: {
                                    readonly type: "string";
                                    readonly description: "Placer API Entity Id";
                                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                                };
                            };
                        }];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrInvalidArguments";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostV1ReportsVisitTrends: {
    readonly body: {
        readonly title: "Visit Trends Request";
        readonly description: "Calculating ft trends for given dates";
        readonly required: readonly ["apiIds", "endDate", "granularity", "startDate"];
        readonly type: "object";
        readonly properties: {
            readonly startDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data start date. Format YYYY-MM-DD";
                readonly examples: readonly ["2020-12-01"];
            };
            readonly endDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data end date. Format YYYY-MM-DD";
                readonly examples: readonly ["2021-05-31"];
            };
            readonly apiIds: {
                readonly type: "array";
                readonly minItems: 1;
                readonly maxItems: 100;
                readonly items: {
                    readonly type: "string";
                    readonly description: "Placer API Entity Id";
                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                };
            };
            readonly granularity: {
                readonly type: "string";
                readonly enum: readonly ["day", "week", "month"];
                readonly examples: readonly ["month"];
            };
            readonly filters: {
                readonly description: "Filtering options for the report results.";
                readonly type: "object";
                readonly properties: {
                    readonly daysOfWeek: {
                        readonly description: "Filter visit calculation based on days of the week. Results will contain only requested days. Days are represented by using numbers where Monday=1 and Sunday=7. For example: in order to retrieve weekend days use the following [ 6, 7 ].";
                        readonly type: "array";
                        readonly items: {
                            readonly enum: readonly [1, 2, 3, 4, 5, 6, 7];
                        };
                        readonly examples: readonly [6, 7];
                    };
                    readonly distance: {
                        readonly description: "Filter visits by distance in miles from home <strong>or</strong> work<br/> where only visits in a given radius will be used in metrics calculation.";
                        readonly type: "object";
                        readonly properties: {
                            readonly from: {
                                readonly description: "The origin from where the distance will be measured.";
                                readonly type: "string";
                                readonly enum: readonly ["home", "work"];
                                readonly examples: readonly ["home"];
                            };
                            readonly values: {
                                readonly description: "Object representation of the distance range<br/>lt - less than<br/>le - less than or equal to<br/>eq - equal to<br/>ge - greater than or equal to<br/>gt - greater than.";
                                readonly type: "object";
                                readonly properties: {
                                    readonly le: {
                                        readonly type: "number";
                                        readonly examples: readonly [100];
                                    };
                                    readonly ge: {
                                        readonly type: "number";
                                    };
                                    readonly lt: {
                                        readonly type: "number";
                                        readonly examples: readonly [250];
                                    };
                                    readonly gt: {
                                        readonly type: "number";
                                        readonly examples: readonly [10];
                                    };
                                    readonly eq: {
                                        readonly type: "number";
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly visitDurationSegmentation: {
                readonly description: "This parameter allows for the generation of reports based on either short visits (< 10 minutes), long visits (>= 10 minutes), or all visit data. <br/> By setting the parameter with a “default” value the report may be limited to certain visit durations (length of stay in minutes), to best reflect the typical behavior of visitors.<br> <strong>Available values:</strong><br> ‘under10Min’ - Only visits with a duration of less than 10 minutes are included in the report.<br> ‘10MinOrLonger’ - only visits with a duration of 10 minutes or more are included in the report.<br> ‘allVisits’ - all the visits are included in the report.<br> ‘default’ - The default segment (as explained above)";
                readonly title: "Visit Duration Segmentation";
                readonly type: "string";
                readonly enum: readonly ["under10Min", "10MinOrLonger", "allVisits", "default"];
                readonly default: "default";
                readonly examples: readonly ["10MinOrLonger"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly title: "Base Response";
            readonly type: "object";
            readonly required: readonly ["requestId"];
            readonly properties: {
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
                readonly items: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly required: readonly ["status", "code"];
                        readonly properties: {
                            readonly apiId: {
                                readonly type: "string";
                                readonly description: "Placer API Entity Id";
                                readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                            };
                            readonly data: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly dates: {
                                        readonly type: "array";
                                        readonly description: "Date bins for the corresponding data points";
                                        readonly items: {
                                            readonly type: "string";
                                        };
                                        readonly examples: readonly ["2020-12-01", "2021-01-01", "2021-02-01", "2021-03-01", "2021-04-01", "2021-05-01"];
                                    };
                                    readonly granularity: {
                                        readonly description: "Aggregation Period\n\n`day` `week` `month`";
                                        readonly type: "string";
                                        readonly enum: readonly ["day", "week", "month"];
                                        readonly examples: readonly ["month"];
                                    };
                                    readonly visits: {
                                        readonly type: "array";
                                        readonly description: "Extrapolated Visits per datetime bin";
                                        readonly items: {
                                            readonly type: "integer";
                                        };
                                        readonly examples: readonly [68293, 67661, 60130, 79550, 79292, 78276];
                                    };
                                    readonly panelVisits: {
                                        readonly type: "array";
                                        readonly description: "The number of visits observed by Placer and are used for statistical extrapolation (per datetime bin) <strong>NOTE:</strong> When using the <strong>distance</strong> filter, panelVisits attribute will not be impacted by the filter and will keep presenting the full panel for the time frame.";
                                        readonly items: {
                                            readonly type: "integer";
                                        };
                                        readonly examples: readonly [1856, 1962, 1745, 2145, 1996, 1842];
                                    };
                                    readonly visitDurationSegmentation: {
                                        readonly description: "If the default visit duration segmentation is requested, the visitDurationSegmentation will display the actual segment.<\br>.\nIn cases where the default segment was requested for a chain, in which the list of entities used different default segments for the report calculation, the visitDurationSegmentation will be set to ‘mixedSegments’.\n\n`under10Min` `10MinOrLonger` `allVisits` `mixedSegments`";
                                        readonly title: "Visit Duration Segmentation";
                                        readonly type: "string";
                                        readonly enum: readonly ["under10Min", "10MinOrLonger", "allVisits", "mixedSegments"];
                                        readonly examples: readonly ["10MinOrLonger"];
                                    };
                                };
                            };
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "202": {
            readonly title: "In Progress Bulk Response";
            readonly type: "object";
            readonly required: readonly ["requestId"];
            readonly properties: {
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
                readonly items: {
                    readonly type: "array";
                    readonly items: {
                        readonly oneOf: readonly [{
                            readonly type: "object";
                            readonly properties: {
                                readonly details: {
                                    readonly type: "string";
                                    readonly enum: readonly ["IN_PROGRESS"];
                                    readonly description: "Status String\n\n`IN_PROGRESS`";
                                };
                                readonly code: {
                                    readonly type: "integer";
                                    readonly description: "Status Code";
                                    readonly examples: readonly [3005];
                                };
                                readonly message: {
                                    readonly type: "string";
                                    readonly description: "Status description";
                                    readonly examples: readonly ["Report is being prepared"];
                                };
                                readonly apiId: {
                                    readonly type: "string";
                                    readonly description: "Placer API Entity Id";
                                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                                };
                            };
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly details: {
                                    readonly type: "string";
                                    readonly enum: readonly ["IN_PROGRESS"];
                                    readonly description: "Status String\n\n`IN_PROGRESS`";
                                };
                                readonly code: {
                                    readonly type: "integer";
                                    readonly description: "Status Code";
                                    readonly examples: readonly [3005];
                                };
                                readonly message: {
                                    readonly type: "string";
                                    readonly description: "Status description";
                                    readonly examples: readonly ["Report is being prepared"];
                                };
                                readonly apiId: {
                                    readonly type: "string";
                                    readonly description: "Placer API Entity Id";
                                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                                };
                            };
                        }];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "207": {
            readonly title: "Multi-status bulk response";
            readonly type: "object";
            readonly required: readonly ["requestId"];
            readonly properties: {
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
                readonly items: {
                    readonly type: "array";
                    readonly items: {
                        readonly oneOf: readonly [{
                            readonly type: "object";
                            readonly properties: {
                                readonly details: {
                                    readonly type: "string";
                                    readonly enum: readonly ["IN_PROGRESS"];
                                    readonly description: "Status String\n\n`IN_PROGRESS`";
                                };
                                readonly code: {
                                    readonly type: "integer";
                                    readonly description: "Status Code";
                                    readonly examples: readonly [3005];
                                };
                                readonly message: {
                                    readonly type: "string";
                                    readonly description: "Status description";
                                    readonly examples: readonly ["Report is being prepared"];
                                };
                                readonly apiId: {
                                    readonly type: "string";
                                    readonly description: "Placer API Entity Id";
                                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                                };
                            };
                        }, {
                            readonly type: "object";
                            readonly properties: {
                                readonly status: {
                                    readonly type: "string";
                                    readonly enum: readonly ["SUCCESS"];
                                    readonly description: "Status String\n\n`SUCCESS`";
                                };
                                readonly code: {
                                    readonly type: "integer";
                                    readonly description: "Status Code";
                                    readonly examples: readonly [0];
                                };
                                readonly apiId: {
                                    readonly type: "string";
                                    readonly description: "Placer API Entity Id";
                                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                                };
                            };
                        }];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrorBadRequest";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PostV1ReportsVisitTrendsSingle: {
    readonly body: {
        readonly title: "Visit History Request";
        readonly description: "Calculating ft trends for given dates";
        readonly type: "object";
        readonly required: readonly ["apiId", "endDate", "granularity", "startDate"];
        readonly properties: {
            readonly startDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data start date. Format YYYY-MM-DD";
                readonly examples: readonly ["2020-12-01"];
            };
            readonly endDate: {
                readonly type: "string";
                readonly format: "date";
                readonly description: "Queried data end date. Format YYYY-MM-DD";
                readonly examples: readonly ["2021-05-31"];
            };
            readonly apiId: {
                readonly type: "string";
                readonly description: "Placer API Entity Id";
                readonly examples: readonly ["venue:7d55054520e387813d764b03"];
            };
            readonly granularity: {
                readonly type: "string";
                readonly enum: readonly ["day", "week", "month"];
                readonly examples: readonly ["month"];
            };
            readonly filters: {
                readonly description: "Filtering options for the report results.";
                readonly type: "object";
                readonly properties: {
                    readonly audienceType: {
                        readonly description: "If provided - metrics will be calculated based only on the specified types of audience.";
                        readonly type: "array";
                        readonly items: {
                            readonly type: "string";
                            readonly enum: readonly ["visitors", "employees", "residents"];
                        };
                        readonly examples: readonly ["visitors"];
                    };
                    readonly dwellTime: {
                        readonly description: "Metrics will be calculated considering the requested dwell time range.";
                        readonly type: "object";
                        readonly properties: {
                            readonly operator: {
                                readonly description: "Less than (<) to Greater Equal (>=)";
                                readonly type: "string";
                                readonly enum: readonly ["<", ">="];
                                readonly examples: readonly ["<"];
                            };
                            readonly value: {
                                readonly description: "The wanted dwell time";
                                readonly type: "integer";
                                readonly examples: readonly [150];
                            };
                        };
                    };
                    readonly hoursRange: {
                        readonly description: "Filter the report’s results based on visits hours range. The filter is defined by 2 strings:<br/> 1. The starting hour to filter the reports results from (Format HH:MM XM, for example: 08:00 am).<br/> 2. The end hour to filter the reports results(Format HH:MM XM, for example: 11:59 pm) .";
                        readonly type: "object";
                        readonly required: readonly ["fromHour", "toHour"];
                        readonly properties: {
                            readonly fromHour: {
                                readonly type: "string";
                                readonly examples: readonly ["03:00 am"];
                            };
                            readonly toHour: {
                                readonly type: "string";
                                readonly examples: readonly ["11:59 pm"];
                            };
                        };
                    };
                    readonly daysOfWeek: {
                        readonly description: "Filter visit calculation based on days of the week. Results will contain only requested days. Days are represented by using numbers where Monday=1 and Sunday=7. For example: in order to retrieve weekend days use the following [ 6, 7 ].";
                        readonly type: "array";
                        readonly items: {
                            readonly enum: readonly [1, 2, 3, 4, 5, 6, 7];
                        };
                        readonly examples: readonly [6, 7];
                    };
                    readonly distance: {
                        readonly description: "Filter visits by distance in miles from home <strong>or</strong> work<br/> where only visits in a given radius will be used in metrics calculation.";
                        readonly type: "object";
                        readonly properties: {
                            readonly from: {
                                readonly description: "The origin from where the distance will be measured.";
                                readonly type: "string";
                                readonly enum: readonly ["home", "work"];
                                readonly examples: readonly ["home"];
                            };
                            readonly values: {
                                readonly description: "Object representation of the distance range<br/>lt - less than<br/>le - less than or equal to<br/>eq - equal to<br/>ge - greater than or equal to<br/>gt - greater than.";
                                readonly type: "object";
                                readonly properties: {
                                    readonly le: {
                                        readonly type: "number";
                                        readonly examples: readonly [100];
                                    };
                                    readonly ge: {
                                        readonly type: "number";
                                    };
                                    readonly lt: {
                                        readonly type: "number";
                                        readonly examples: readonly [250];
                                    };
                                    readonly gt: {
                                        readonly type: "number";
                                        readonly examples: readonly [10];
                                    };
                                    readonly eq: {
                                        readonly type: "number";
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly title: "Base Response";
            readonly type: "object";
            readonly required: readonly ["code", "requestId", "status"];
            readonly properties: {
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
                readonly apiId: {
                    readonly type: "string";
                    readonly description: "Placer API Entity Id";
                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                };
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly dates: {
                            readonly type: "array";
                            readonly description: "Date bins for the corresponding data points";
                            readonly items: {
                                readonly type: "string";
                            };
                            readonly examples: readonly ["2020-12-01", "2021-01-01", "2021-02-01", "2021-03-01", "2021-04-01", "2021-05-01"];
                        };
                        readonly granularity: {
                            readonly description: "Aggregation Period\n\n`day` `week` `month`";
                            readonly type: "string";
                            readonly enum: readonly ["day", "week", "month"];
                            readonly examples: readonly ["month"];
                        };
                        readonly visits: {
                            readonly type: "array";
                            readonly description: "Extrapolated Visits per datetime bin";
                            readonly items: {
                                readonly type: "integer";
                            };
                            readonly examples: readonly [68293, 67661, 60130, 79550, 79292, 78276];
                        };
                        readonly visitDurationSegmentation: {
                            readonly description: "If the default visit duration segmentation is requested, the visitDurationSegmentation will display the actual segment.<\br>.\nIn cases where the default segment was requested for a chain, in which the list of entities used different default segments for the report calculation, the visitDurationSegmentation will be set to ‘mixedSegments’.\n\n`under10Min` `10MinOrLonger` `allVisits` `mixedSegments`";
                            readonly title: "Visit Duration Segmentation";
                            readonly type: "string";
                            readonly enum: readonly ["under10Min", "10MinOrLonger", "allVisits", "mixedSegments"];
                            readonly examples: readonly ["10MinOrLonger"];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "202": {
            readonly title: "InProgress";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrorBadRequest";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PutV1PoiCustomPoiId: {
    readonly body: {
        readonly title: "Update custom POI request";
        readonly description: "Updating <<glossary:Custom POI>> by given name or sub category or polygon/centroid + radius or address.";
        readonly type: "object";
        readonly properties: {
            readonly id: {
                readonly type: "string";
                readonly examples: readonly ["complex:5f7a2d2dc2b5e82a0114cf62"];
            };
            readonly centroid: {
                readonly type: "array";
                readonly description: "List of 2 values that represents the GEO location of the POI center";
                readonly items: {
                    readonly type: "number";
                    readonly format: "float";
                    readonly minimum: -200;
                    readonly maximum: 80;
                };
                readonly examples: readonly [-78.519444, 36.61636];
            };
            readonly radius: {
                readonly type: "number";
                readonly format: "float";
                readonly minimum: 0.007;
                readonly maximum: 0.21;
                readonly default: 0.1;
                readonly description: "Radius (in miles) with which the polygon is constructed when the center of the polygon is the centroid";
            };
            readonly polygon: {
                readonly type: "array";
                readonly description: "List of pairs ([lng, lat]) that represents the POI polygon";
                readonly items: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "number";
                        readonly format: "float";
                        readonly minimum: -3.402823669209385e+38;
                        readonly maximum: 3.402823669209385e+38;
                    };
                };
            };
            readonly address: {
                readonly type: "object";
                readonly properties: {
                    readonly address: {
                        readonly type: "string";
                        readonly description: "Entity Address";
                        readonly examples: readonly ["301 Ranch Dr"];
                    };
                    readonly city: {
                        readonly type: "string";
                        readonly description: "Entity City";
                        readonly examples: readonly ["Milpitas"];
                    };
                    readonly zipCode: {
                        readonly type: "string";
                        readonly description: "Entity Zip Code";
                        readonly examples: readonly ["95035"];
                    };
                };
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly metadata: {
        readonly allOf: readonly [{
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "string";
                    readonly examples: readonly ["complex:5f7a2d2dc2b5e82a0114cf62"];
                    readonly $schema: "http://json-schema.org/draft-04/schema#";
                    readonly description: "Placer API ID";
                };
            };
            readonly required: readonly ["id"];
        }];
    };
    readonly response: {
        readonly "200": {
            readonly title: "Custom POI Response";
            readonly type: "object";
            readonly required: readonly ["data"];
            readonly properties: {
                readonly data: {
                    readonly title: "Custom POI Info Object";
                    readonly type: "object";
                    readonly properties: {
                        readonly result: {
                            readonly type: "string";
                            readonly examples: readonly ["SUCCESS"];
                        };
                        readonly name: {
                            readonly type: "string";
                            readonly examples: readonly ["Name to be used to identify the <<glossary:Custom POI>>"];
                        };
                        readonly apiId: {
                            readonly type: "string";
                            readonly examples: readonly ["complex:8d22ae197ee335c5074a67ff"];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrorBadRequest";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
declare const PutV1PoiTags: {
    readonly body: {
        readonly title: "Add tag members request";
        readonly type: "object";
        readonly required: readonly ["apiIds", "tagId"];
        readonly properties: {
            readonly apiIds: {
                readonly type: "array";
                readonly description: "The list of entities to attach to the specified tag";
                readonly items: {
                    readonly type: "string";
                    readonly description: "Placer API Entity Id";
                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                };
            };
            readonly tagId: {
                readonly type: "string";
                readonly description: "The Id of the tag to attach the entities to";
                readonly examples: readonly ["672be20c36e1d0ff18a13807"];
            };
        };
        readonly $schema: "http://json-schema.org/draft-04/schema#";
    };
    readonly response: {
        readonly "200": {
            readonly title: "Modify Tag Entities Response Success";
            readonly type: "object";
            readonly required: readonly ["data"];
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly result: {
                            readonly type: "string";
                            readonly examples: readonly ["SUCCESS"];
                        };
                        readonly tagId: {
                            readonly type: "string";
                            readonly examples: readonly ["672be20c36e1d0ff18a13807"];
                        };
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "207": {
            readonly title: "Add Entities to Tag Response Multi Status";
            readonly type: "object";
            readonly properties: {
                readonly data: {
                    readonly type: "object";
                    readonly properties: {
                        readonly tagId: {
                            readonly type: "string";
                            readonly examples: readonly ["672be20c36e1d0ff18a13807"];
                        };
                    };
                };
                readonly items: {
                    readonly type: "array";
                    readonly items: {
                        readonly oneOf: readonly [{
                            readonly title: "Modify Tag Entities Response Success";
                            readonly type: "object";
                            readonly properties: {
                                readonly status: {
                                    readonly type: "string";
                                    readonly examples: readonly ["SUCCESS"];
                                };
                                readonly code: {
                                    readonly type: "integer";
                                    readonly examples: readonly [0];
                                };
                                readonly apiId: {
                                    readonly type: "string";
                                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                                };
                            };
                        }, {
                            readonly title: "Modify Tag Entities Response Failure";
                            readonly type: "object";
                            readonly properties: {
                                readonly status: {
                                    readonly type: "string";
                                    readonly examples: readonly ["FAILURE"];
                                };
                                readonly code: {
                                    readonly type: "integer";
                                    readonly examples: readonly [2002];
                                };
                                readonly details: {
                                    readonly type: "string";
                                    readonly examples: readonly ["INVALID_ARGUMENTS"];
                                };
                                readonly message: {
                                    readonly type: "string";
                                    readonly examples: readonly ["The apiId cannot be added to the specified tag"];
                                };
                                readonly apiId: {
                                    readonly type: "string";
                                    readonly examples: readonly ["venue:7d55054520e387813d764b03"];
                                };
                            };
                        }];
                    };
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "400": {
            readonly title: "ErrorBadRequest";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "403": {
            readonly title: "ErrPermissionDenied";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
        readonly "500": {
            readonly title: "BaseError";
            readonly type: "object";
            readonly required: readonly ["code", "details", "message"];
            readonly properties: {
                readonly message: {
                    readonly type: "string";
                    readonly description: "Detail error message";
                    readonly examples: readonly ["Internal server error"];
                };
                readonly details: {
                    readonly type: "string";
                    readonly description: "Brief error message";
                    readonly examples: readonly ["GENERAL_ERROR"];
                };
                readonly code: {
                    readonly type: "integer";
                    readonly description: "Status Code";
                    readonly examples: readonly [5000];
                };
                readonly requestId: {
                    readonly type: "string";
                    readonly description: "Request ID that can be used for tracing";
                    readonly examples: readonly ["cfe57f50-fb64-11eb-8760-acde48001122:cfe56fce-fb64-11eb-8760-acde48001122"];
                };
            };
            readonly $schema: "http://json-schema.org/draft-04/schema#";
        };
    };
};
export { DeleteV1PoiCustomPoiId, DeleteV1PoiTags, GetV1AccountsKeysUsageStatus, GetV1Poi, GetV1PoiCustomPoiId, GetV1PoiIdEntities, GetV1PoiMyProperties, PostV1PoiCustomPoi, PostV1PoiTags, PostV1ReportsFavoritesChains, PostV1ReportsFavoritesPlaces, PostV1ReportsLoyaltyVisitsFrequency, PostV1ReportsRankingIndexCloselyRanked, PostV1ReportsRankingIndexTopRanking, PostV1ReportsRankingOverview, PostV1ReportsRankingOverviewMulti, PostV1ReportsRetailSalesAvgTicketSizeTrends, PostV1ReportsRetailSalesDays, PostV1ReportsRetailSalesOverview, PostV1ReportsRetailSalesSalesTrends, PostV1ReportsRetailSalesTransactionTrends, PostV1ReportsTradeAreaDemographics, PostV1ReportsTradeAreaDriveTime, PostV1ReportsTrueTradeArea, PostV1ReportsVisitMetrics, PostV1ReportsVisitMetricsCbgs, PostV1ReportsVisitMetricsDays, PostV1ReportsVisitMetricsDwellTime, PostV1ReportsVisitMetricsHours, PostV1ReportsVisitTrends, PostV1ReportsVisitTrendsSingle, PutV1PoiCustomPoiId, PutV1PoiTags };
