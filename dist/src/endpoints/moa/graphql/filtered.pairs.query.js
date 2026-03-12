"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filteredPairsQuery = void 0;
const graphql_request_1 = require("graphql-request");
const filteredPairsQuery = (includeFarms = false) => {
    const farmFields = includeFarms ? `
        hasFarms
        hasDualFarms` : '';
    return (0, graphql_request_1.gql) `
        query filteredPairs($pagination: ConnectionArgs!, $filters: PairsFilter!) {
          filteredPairs(pagination: $pagination, filters: $filters) {
            edges {
              cursor
              node {
                address
                liquidityPoolToken {
                  identifier
                  name
                  __typename
                }
                liquidityPoolTokenPriceUSD
                firstToken {
                  name
                  identifier
                  previous24hPrice
                  __typename
                }
                secondToken {
                  name
                  identifier
                  previous24hPrice
                  __typename
                }
                firstTokenPriceUSD
                secondTokenPriceUSD
                state
                type
                lockedValueUSD
                volumeUSD24h
                tradesCount
                tradesCount24h
                deployedAt
                ${farmFields}
              }
            }
            pageInfo {
              hasNextPage
            }
          }
        }
      `;
};
exports.filteredPairsQuery = filteredPairsQuery;
//# sourceMappingURL=filtered.pairs.query.js.map