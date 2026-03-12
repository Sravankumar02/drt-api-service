"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.settingsQuery = void 0;
const graphql_request_1 = require("graphql-request");
const settingsQuery = (pairLimitCount) => (0, graphql_request_1.gql) `
query {
  filteredPairs(pagination: {first: ${pairLimitCount}}, filters: {state: ["Active"]}) {
    edges {
      node {
        address
      }
    }
  }
  proxy {
    address
    lockedAssetTokens {
      collection
    }
  }
  farms {
    ... on FarmModelV1_2 {
      state
      address
    }
    ... on FarmModelV1_3 {
      state
      address
    }
    ... on FarmModelV2 {
      state
      address
    }
  }
  wrappingInfo {
    address
    wrappedToken {
      identifier
    }
  }
  distribution {
    address
  }
  lockedAssetFactory {
    address
  }
  stakingFarms {
    state
    address
  }
  stakingProxies {
    address
  }
  factory {
    address
  }
  simpleLockEnergy {
    baseAssetToken {
      identifier
    }
  }
}
`;
exports.settingsQuery = settingsQuery;
//# sourceMappingURL=settings.query.js.map