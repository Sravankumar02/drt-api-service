"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenPricesHourResolutionQuery = void 0;
const graphql_request_1 = require("graphql-request");
const tokenPricesHourResolutionQuery = (tokenIdentifier) => (0, graphql_request_1.gql) `
 query tokenPricesHourResolution {
        values24h(
          series: "${tokenIdentifier}",
          metric: "priceUSD"
        ) {
          timestamp
          value
        }
      }
    `;
exports.tokenPricesHourResolutionQuery = tokenPricesHourResolutionQuery;
//# sourceMappingURL=token.prices.hour.resolution.query.js.map