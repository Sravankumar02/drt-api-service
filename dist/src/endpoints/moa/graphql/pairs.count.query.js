"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pairCountQuery = void 0;
const graphql_request_1 = require("graphql-request");
exports.pairCountQuery = (0, graphql_request_1.gql) `
query PairCount {
      factory {
        pairCount
      }
    }`;
//# sourceMappingURL=pairs.count.query.js.map