"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auctionsCountQuery = void 0;
const graphql_request_1 = require("graphql-request");
exports.auctionsCountQuery = (0, graphql_request_1.gql) `
query selectedAuction($filters: FiltersExpression) {
  auctions(
    filters: $filters
  ) {
    pageData {
      count
    }
  }
}`;
//# sourceMappingURL=auctions.count.query.js.map