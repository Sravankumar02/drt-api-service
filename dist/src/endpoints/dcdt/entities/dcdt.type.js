"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DcdtType = void 0;
const graphql_1 = require("@nestjs/graphql");
var DcdtType;
(function (DcdtType) {
    DcdtType["FungibleDCDT"] = "FungibleDCDT";
    DcdtType["NonFungibleDCDT"] = "NonFungibleDCDT";
    DcdtType["SemiFungibleDCDT"] = "SemiFungibleDCDT";
    DcdtType["MetaDCDT"] = "MetaDCDT";
})(DcdtType = exports.DcdtType || (exports.DcdtType = {}));
(0, graphql_1.registerEnumType)(DcdtType, {
    name: 'DcdtType',
    description: 'Dcdt type enum.',
    valuesMap: {
        FungibleDCDT: {
            description: 'Fungible DCDT token type.',
        },
        NonFungibleDCDT: {
            description: 'Non-fungible DCDT token type.',
        },
        SemiFungibleDCDT: {
            description: 'Semi-fungible DCDT token type.',
        },
        MetaDCDT: {
            description: 'Meta DCDT token type.',
        },
    },
});
//# sourceMappingURL=dcdt.type.js.map