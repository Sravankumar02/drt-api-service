"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountStatsQuery = void 0;
const graphql_request_1 = require("graphql-request");
exports.accountStatsQuery = (0, graphql_request_1.gql) `
query($filters: AccountStatsFilter!){
  accountStats(filters: $filters){
    address
    auctions
    biddingBalance
    claimable
    collected
    collections
    creations
    likes
    marketplaceKey
    orders
  }
}`;
//# sourceMappingURL=account.stats.query.js.map