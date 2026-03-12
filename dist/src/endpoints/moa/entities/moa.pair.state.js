"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoaPairState = void 0;
const graphql_1 = require("@nestjs/graphql");
var MoaPairState;
(function (MoaPairState) {
    MoaPairState["active"] = "active";
    MoaPairState["inactive"] = "inactive";
    MoaPairState["paused"] = "paused";
    MoaPairState["partial"] = "partial";
})(MoaPairState = exports.MoaPairState || (exports.MoaPairState = {}));
(0, graphql_1.registerEnumType)(MoaPairState, {
    name: 'MoaPairState',
    description: 'MoaPairState object type.',
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
//# sourceMappingURL=moa.pair.state.js.map