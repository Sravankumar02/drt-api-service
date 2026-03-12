"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftSubType = void 0;
const graphql_1 = require("@nestjs/graphql");
var NftSubType;
(function (NftSubType) {
    NftSubType["NonFungibleDCDT"] = "NonFungibleDCDT";
    NftSubType["SemiFungibleDCDT"] = "SemiFungibleDCDT";
    NftSubType["MetaDCDT"] = "MetaDCDT";
    NftSubType["NonFungibleDCDTv2"] = "NonFungibleDCDTv2";
    NftSubType["DynamicNonFungibleDCDT"] = "DynamicNonFungibleDCDT";
    NftSubType["DynamicSemiFungibleDCDT"] = "DynamicSemiFungibleDCDT";
    NftSubType["DynamicMetaDCDT"] = "DynamicMetaDCDT";
    NftSubType["None"] = "";
})(NftSubType = exports.NftSubType || (exports.NftSubType = {}));
(0, graphql_1.registerEnumType)(NftSubType, {
    name: 'NftSubType',
    description: 'NFT subtype.',
    valuesMap: {
        NonFungibleDCDT: {
            description: 'Non-fungible DCDT NFT type.',
        },
        SemiFungibleDCDT: {
            description: 'Semi-fungible DCDT NFT type.',
        },
        MetaDCDT: {
            description: 'Meta DCDT NFT type.',
        },
        NonFungibleDCDTv2: {
            description: 'Non-fungible DCDT v2 NFT type.',
        },
        DynamicNonFungibleDCDT: {
            description: 'Dynamic non-fungible NFT type.',
        },
        DynamicSemiFungibleDCDT: {
            description: 'Dynamic semi-fungible NFT type.',
        },
        DynamicMetaDCDT: {
            description: 'Dynamic meta DCDT NFT type.',
        },
        None: {
            description: '',
        },
    },
});
//# sourceMappingURL=nft.sub.type.js.map