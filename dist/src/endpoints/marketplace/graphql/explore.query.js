"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionsStatsQuery = exports.nftsStatsQuery = exports.statsQuery = void 0;
const graphql_request_1 = require("graphql-request");
exports.statsQuery = (0, graphql_request_1.gql) `
query{
  exploreStats{
    artists
    collections
    nfts
  }
}`;
exports.nftsStatsQuery = (0, graphql_request_1.gql) `
query{
  exploreNftsStats{
    buyNowCount
    liveAuctionsCount
  }
}`;
exports.collectionsStatsQuery = (0, graphql_request_1.gql) `
query{
  exploreCollectionsStats{
    activeLast30DaysCount
    verifiedCount
  }
}`;
//# sourceMappingURL=explore.query.js.map