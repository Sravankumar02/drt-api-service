"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftType = void 0;
const graphql_1 = require("@nestjs/graphql");
var NftType;
(function (NftType) {
    NftType["NonFungibleDCDT"] = "NonFungibleDCDT";
    NftType["SemiFungibleDCDT"] = "SemiFungibleDCDT";
    NftType["MetaDCDT"] = "MetaDCDT";
})(NftType = exports.NftType || (exports.NftType = {}));
(0, graphql_1.registerEnumType)(NftType, {
    name: 'NftType',
    description: 'NFT type.',
    valuesMap: {
        NonFungibleDCDT: {
            description: 'Non-fungible NFT type.',
        },
        SemiFungibleDCDT: {
            description: 'Semi-fungible NFT type.',
        },
        MetaDCDT: {
            description: 'Meta DCDT NFT type.',
        },
    },
});
//# sourceMappingURL=nft.type.js.map