"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionStatsQuery = void 0;
const graphql_request_1 = require("graphql-request");
exports.collectionStatsQuery = (0, graphql_request_1.gql) `
query($filters: CollectionStatsFilter!){
  collectionStats(filters: $filters){
    identifier
    activeAuctions
    auctionsEnded
    maxPrice
    maxPrice
    minPrice
    saleAverage
    volumeTraded
  }
}`;
//# sourceMappingURL=collection.stats.query.js.map