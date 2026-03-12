"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokensQuery = void 0;
const graphql_request_1 = require("graphql-request");
exports.tokensQuery = (0, graphql_request_1.gql) `
 query tokens {
          tokens {
            identifier
            type
          }
        }`;
//# sourceMappingURL=tokens.query.js.map