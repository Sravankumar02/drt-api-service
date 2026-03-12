"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DcdtSubType = void 0;
const graphql_1 = require("@nestjs/graphql");
var DcdtSubType;
(function (DcdtSubType) {
    DcdtSubType["NonFungibleDCDTv2"] = "NonFungibleDCDTv2";
    DcdtSubType["DynamicNonFungibleDCDT"] = "DynamicNonFungibleDCDT";
    DcdtSubType["DynamicSemiFungibleDCDT"] = "DynamicSemiFungibleDCDT";
    DcdtSubType["DynamicMetaDCDT"] = "DynamicMetaDCDT";
})(DcdtSubType = exports.DcdtSubType || (exports.DcdtSubType = {}));
(0, graphql_1.registerEnumType)(DcdtSubType, {
    name: 'DcdtSubType',
    description: 'Dcdt sub type enum.',
    valuesMap: {
        NonFungibleDCDTv2: {
            description: 'Non-fungible DCDT v2 sub type.',
        },
        DynamicNonFungibleDCDT: {
            description: 'Dynamic non-fungible sub type.',
        },
        DynamicSemiFungibleDCDT: {
            description: 'Dynamic semi-fungible sub type.',
        },
        DynamicMetaDCDT: {
            description: 'Dynamic meta DCDT sub type.',
        },
    },
});
//# sourceMappingURL=dcdt.sub.type.js.map