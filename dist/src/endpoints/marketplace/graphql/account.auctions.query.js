"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountAuctionsQuery = void 0;
const graphql_request_1 = require("graphql-request");
const accountAuctionsQuery = (address, status) => {
    return (0, graphql_request_1.gql) `
  query{
    auctions(filters:{
      operator: AND,
      filters:[
        {
          field: "ownerAddress",
          op: EQ,
          values: ["${address}"]
        }
        ${status
        ? `,{
          field: "status",
          op: EQ,
          values: ["${status}"]
        }`
        : ""}
      ]
    }){
      edges{
        node{
          id
          identifier
          collection
          status
          creationDate
          endDate
          marketplace{
            key
          }
          minBid {
            amount
            token
          }
          maxBid {
            amount
            token
          }
          marketplaceAuctionId
          startDate
          __typename
        }
      }
    }
  }`;
};
exports.accountAuctionsQuery = accountAuctionsQuery;
//# sourceMappingURL=account.auctions.query.js.map