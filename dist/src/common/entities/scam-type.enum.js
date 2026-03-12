"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScamType = void 0;
const graphql_1 = require("@nestjs/graphql");
var ScamType;
(function (ScamType) {
    ScamType["none"] = "none";
    ScamType["potentialScam"] = "potentialScam";
    ScamType["scam"] = "scam";
})(ScamType = exports.ScamType || (exports.ScamType = {}));
(0, graphql_1.registerEnumType)(ScamType, {
    name: 'ScamType',
    description: 'Scam type object type.',
    valuesMap: {
        none: {
            description: 'No scam type.',
        },
        potentialScam: {
            description: 'Potential scam type.',
        },
        scam: {
            description: 'Scam type.',
        },
    },
});
//# sourceMappingURL=scam-type.enum.js.map