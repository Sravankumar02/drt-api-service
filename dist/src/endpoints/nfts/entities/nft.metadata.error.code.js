"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftMetadataErrorCode = void 0;
const graphql_1 = require("@nestjs/graphql");
var NftMetadataErrorCode;
(function (NftMetadataErrorCode) {
    NftMetadataErrorCode["ipfsError"] = "ipfs_error";
    NftMetadataErrorCode["notFound"] = "not_found";
    NftMetadataErrorCode["timeout"] = "timeout";
    NftMetadataErrorCode["unknownError"] = "unknown_error";
    NftMetadataErrorCode["invalidContentType"] = "invalid_content_type";
    NftMetadataErrorCode["jsonParseError"] = "json_parse_error";
    NftMetadataErrorCode["emptyMetadata"] = "empty_metadata";
})(NftMetadataErrorCode = exports.NftMetadataErrorCode || (exports.NftMetadataErrorCode = {}));
(0, graphql_1.registerEnumType)(NftMetadataErrorCode, {
    name: 'NftMetadataErrorCode',
    description: 'NFT Metadata error code',
    valuesMap: {
        ipfsError: {
            description: 'IPFS error',
        },
        notFound: {
            description: 'IPFS link does not have any underlying resource',
        },
        timeout: {
            description: 'IPFS request timeout',
        },
        unknownError: {
            description: 'Unknown error',
        },
        invalidContentType: {
            description: 'Invalid contentm type (should be application/json)',
        },
        emptyMetadata: {
            description: 'Metadata is empty',
        },
    },
});
//# sourceMappingURL=nft.metadata.error.code.js.map