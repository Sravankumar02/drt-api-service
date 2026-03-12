"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auctionIdQuery = void 0;
const graphql_request_1 = require("graphql-request");
const auctionIdQuery = (id) => {
    return (0, graphql_request_1.gql) `
  query {
    auctions(filters:{
      operator: AND,
      filters:[
        {
          field: "id",
          op: EQ,
          values: ["${id}"]
        }
      ]
    }){
      edges{
        node{
          id
          identifier
          collection
          status
          type
          creationDate
          endDate
          marketplace{key}
          asset{creatorAddress}
          minBid {
            amount
            token
          }
          maxBid {
            amount
            token
          }
          ownerAddress
          marketplaceAuctionId
          startDate
          __typename
        }
      }
    }
  }
`;
};
exports.auctionIdQuery = auctionIdQuery;
//# sourceMappingURL=auctionId.query.js.map