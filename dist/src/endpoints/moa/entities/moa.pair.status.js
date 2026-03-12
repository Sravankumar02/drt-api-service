"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoaPairStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
var MoaPairStatus;
(function (MoaPairStatus) {
    MoaPairStatus["active"] = "Active";
    MoaPairStatus["inactive"] = "Inactive";
    MoaPairStatus["paused"] = "Paused";
    MoaPairStatus["partial"] = "Partial";
})(MoaPairStatus = exports.MoaPairStatus || (exports.MoaPairStatus = {}));
(0, graphql_1.registerEnumType)(MoaPairStatus, {
    name: 'MoaPairStatus',
    description: 'MoaPairStatus object type.',
    valuesMap: {
        active: {
            description: 'Active state.',
        },
        inactive: {
            description: 'Inactive state.',
        },
        paused: {
            description: 'Pause state.',
        },
        partial: {
            description: 'Partial state.',
        },
    },
});
//# sourceMappingURL=moa.pair.status.js.map