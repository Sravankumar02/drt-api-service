"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auctionsQuery = void 0;
const graphql_request_1 = require("graphql-request");
exports.auctionsQuery = (0, graphql_request_1.gql) `
query GetAuctions($first: Int, $after: String, $before: String, $currentTimestamp: String) {
  auctions(
    pagination: {
      first: $first,
      after: $after,
      before: $before
    },
    filters:{
      operator: AND,
      filters:[
        {
          field: "status",
          op: EQ,
          values: ["Running"]
        }
        {
          field: "startDate",
          op: LE,
          values: [$currentTimestamp]
        }
      ]
    }
    sorting: {
      direction: DESC,
      field: "creationDate"
    }
    grouping:{
      groupBy: IDENTIFIER
    },
  ) {
    edges {
      cursor
      node {
        identifier
        collection
        status
        type
        nonce
        id
        marketplaceAuctionId
        marketplaceKey
        minBid {
          amount
          token
        }
        maxBid {
          amount
          token
        }
        creationDate
        ownerAddress
      }
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
}
`;
//# sourceMappingURL=auctions.query.js.map