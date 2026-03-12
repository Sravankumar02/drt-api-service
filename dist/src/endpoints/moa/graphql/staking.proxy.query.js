"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stakingProxyQuery = void 0;
const graphql_request_1 = require("graphql-request");
exports.stakingProxyQuery = (0, graphql_request_1.gql) `
query StakingProxy {
  stakingProxies {
    address
    dualYieldToken {
      name
      collection
    }
  }
}`;
//# sourceMappingURL=staking.proxy.query.js.map