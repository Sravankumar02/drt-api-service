"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeSort = void 0;
const graphql_1 = require("@nestjs/graphql");
var NodeSort;
(function (NodeSort) {
    NodeSort["name"] = "name";
    NodeSort["version"] = "version";
    NodeSort["tempRating"] = "tempRating";
    NodeSort["leaderSuccess"] = "leaderSuccess";
    NodeSort["leaderFailure"] = "leaderFailure";
    NodeSort["validatorSuccess"] = "validatorSuccess";
    NodeSort["validatorFailure"] = "validatorFailure";
    NodeSort["validatorIgnoredSignatures"] = "validatorIgnoredSignatures";
    NodeSort["position"] = "position";
    NodeSort["auctionPosition"] = "auctionPosition";
    NodeSort["locked"] = "locked";
    NodeSort["qualifiedStake"] = "qualifiedStake";
})(NodeSort = exports.NodeSort || (exports.NodeSort = {}));
(0, graphql_1.registerEnumType)(NodeSort, {
    name: 'NodeSort',
    description: 'Node Sort object.',
    valuesMap: {
        name: {
            description: 'Node name.',
        },
        version: {
            description: 'Node version.',
        },
        tempRating: {
            description: 'Node temp rating.',
        },
        leaderSuccess: {
            description: 'Node learder success.',
        },
        leaderFailure: {
            description: 'Node leader failure.',
        },
        validatorSuccess: {
            description: 'Node validator success.',
        },
        validatorFailure: {
            description: 'Node validator failure.',
        },
        validatorIgnoredSignatures: {
            description: 'Node validator ignored signatures.',
        },
        position: {
            description: 'Node position.',
        },
        auctionPosition: {
            description: 'Node auction position.',
        },
        locked: {
            description: 'Node locked.',
        },
        qualifiedStake: {
            description: 'Node qualified stake.',
        },
    },
});
//# sourceMappingURL=node.sort.js.map