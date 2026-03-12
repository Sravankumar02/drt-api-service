"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeStatusRaw = exports.NodeStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
var NodeStatus;
(function (NodeStatus) {
    NodeStatus["new"] = "new";
    NodeStatus["unknown"] = "unknown";
    NodeStatus["waiting"] = "waiting";
    NodeStatus["eligible"] = "eligible";
    NodeStatus["jailed"] = "jailed";
    NodeStatus["queued"] = "queued";
    NodeStatus["leaving"] = "leaving";
    NodeStatus["inactive"] = "inactive";
    NodeStatus["auction"] = "auction";
})(NodeStatus = exports.NodeStatus || (exports.NodeStatus = {}));
var NodeStatusRaw;
(function (NodeStatusRaw) {
    NodeStatusRaw["staked"] = "staked";
    NodeStatusRaw["jailed"] = "jailed";
    NodeStatusRaw["queued"] = "queued";
    NodeStatusRaw["unStaked"] = "unStaked";
    NodeStatusRaw["notStaked"] = "notStaked";
})(NodeStatusRaw = exports.NodeStatusRaw || (exports.NodeStatusRaw = {}));
(0, graphql_1.registerEnumType)(NodeStatus, {
    name: 'NodeStatus',
    description: 'Node status object type.',
    valuesMap: {
        new: {
            description: 'New status.',
        },
        unknown: {
            description: 'Unknown status.',
        },
        waiting: {
            description: 'Waiting status.',
        },
        eligible: {
            description: 'Eligible status.',
        },
        jailed: {
            description: 'Jailed status.',
        },
        queued: {
            description: 'Queued status.',
        },
        leaving: {
            description: 'Leaving status.',
        },
        inactive: {
            description: 'Inactive status.',
        },
    },
});
(0, graphql_1.registerEnumType)(NodeStatusRaw, {
    name: 'NodeStatusRaw',
    description: 'Node status raw object type.',
    valuesMap: {
        staked: {
            description: 'Staked raw status.',
        },
        jailed: {
            description: 'Jailed raw status.',
        },
        queued: {
            description: 'Queued raw status.',
        },
        unStaked: {
            description: 'UnStaked raw status.',
        },
        notStaked: {
            description: 'NotStaked raw status.',
        },
    },
});
//# sourceMappingURL=node.status.js.map