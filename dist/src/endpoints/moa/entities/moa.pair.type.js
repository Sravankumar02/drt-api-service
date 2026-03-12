"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoaPairType = void 0;
const graphql_1 = require("@nestjs/graphql");
var MoaPairType;
(function (MoaPairType) {
    MoaPairType["core"] = "core";
    MoaPairType["community"] = "community";
    MoaPairType["ecosystem"] = "ecosystem";
    MoaPairType["experimental"] = "experimental";
    MoaPairType["unlisted"] = "unlisted";
})(MoaPairType = exports.MoaPairType || (exports.MoaPairType = {}));
(0, graphql_1.registerEnumType)(MoaPairType, {
    name: 'MoaPairType',
    description: 'MoaPairType object type.',
    valuesMap: {
        core: {
            description: 'Core Type.',
        },
        community: {
            description: 'Community Type.',
        },
        ecosystem: {
            description: 'Ecosystem Type.',
        },
        experimental: {
            description: 'Experimental Type.',
        },
        unlisted: {
            description: 'Unlisted Type.',
        },
    },
});
//# sourceMappingURL=moa.pair.type.js.map