"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionAuctionsQuery = void 0;
const graphql_request_1 = require("graphql-request");
exports.collectionAuctionsQuery = (0, graphql_request_1.gql) `
query GetAuctions($first: Int, $after: String, $before: String, $collection: [String]!) {
  auctions(
    pagination: {
      first: $first,
      after: $after,
      before: $before
    },
    filters:{
      filters:[
        {
          field: "status",
          op: EQ,
          values: ["Running"]
        },
        {
          field: "collection",
          op: EQ,
          values: $collection
        }
      ],
      operator: AND,
    }
    sorting: {
      direction: DESC,
      field: "creationDate"
    }
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
//# sourceMappingURL=collection.auctions.query.js.map