"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoaFarmType = void 0;
const graphql_1 = require("@nestjs/graphql");
var MoaFarmType;
(function (MoaFarmType) {
    MoaFarmType["standard"] = "standard";
    MoaFarmType["metastaking"] = "metastaking";
})(MoaFarmType = exports.MoaFarmType || (exports.MoaFarmType = {}));
(0, graphql_1.registerEnumType)(MoaFarmType, {
    name: 'MoaFarmType',
    description: 'MoaFarmType object type.',
    valuesMap: {
        standard: {
            description: 'Standard type.',
        },
        metastaking: {
            description: 'Metastaking type.',
        },
    },
});
//# sourceMappingURL=moa.farm.type.js.map