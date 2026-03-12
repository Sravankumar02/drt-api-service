"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenHelpers = void 0;
const tslib_1 = require("tslib");
const crypto = tslib_1.__importStar(require("crypto-js"));
const nft_type_1 = require("../endpoints/nfts/entities/nft.type");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
require("@sravankumar02/sdk-nestjs-common/lib/utils/extensions/string.extensions");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
class TokenHelpers {
    static canBool(string) {
        return string.split('-').pop() === 'true';
    }
    static computeNftUri(uri, prefix) {
        uri = sdk_nestjs_http_1.ApiUtils.replaceUri(uri, 'https://ipfs.io/ipfs', prefix);
        uri = sdk_nestjs_http_1.ApiUtils.replaceUri(uri, 'https://gateway.ipfs.io/ipfs', prefix);
        uri = sdk_nestjs_http_1.ApiUtils.replaceUri(uri, 'https://gateway.pinata.cloud/ipfs', prefix);
        uri = sdk_nestjs_http_1.ApiUtils.replaceUri(uri, 'https://dweb.link/ipfs', prefix);
        uri = sdk_nestjs_http_1.ApiUtils.replaceUri(uri, 'ipfs:/', prefix);
        uri = sdk_nestjs_http_1.ApiUtils.replaceUri(uri, 'https://media.numbat.com/nfts/asset', prefix);
        uri = sdk_nestjs_http_1.ApiUtils.replaceUri(uri, 'https://devnet-media.numbat.com/nfts/asset', prefix);
        uri = sdk_nestjs_http_1.ApiUtils.replaceUri(uri, 'https://testnet-media.numbat.com/nfts/asset', prefix);
        uri = sdk_nestjs_http_1.ApiUtils.replaceUri(uri, 'https://api.dharitri.org/media/nfts/asset', prefix);
        uri = sdk_nestjs_http_1.ApiUtils.replaceUri(uri, 'https://devnet-api.dharitri.org/media/nfts/asset', prefix);
        uri = sdk_nestjs_http_1.ApiUtils.replaceUri(uri, 'https://testnet-api.dharitri.org/media/nfts/asset', prefix);
        uri = uri.replace(/https\:\/\/\w*\.mypinata\.cloud\/ipfs/, prefix);
        if (uri.endsWith('.ipfs.dweb.link')) {
            const id = uri.removeSuffix('.ipfs.dweb.link').removePrefix('https://');
            uri = `${prefix}/${id}`;
        }
        return uri;
    }
    static getUrlHash(url) {
        return crypto.SHA256(url.trim()).toString().slice(0, 8);
    }
    static getThumbnailUrlIdentifier(nftIdentifier, fileUrl) {
        const collectionIdentifier = nftIdentifier.split('-').slice(0, 2).join('-');
        const urlHash = TokenHelpers.getUrlHash(fileUrl);
        return `${collectionIdentifier}-${urlHash}`;
    }
    static needsDefaultMedia(nft) {
        if (nft.type === nft_type_1.NftType.MetaDCDT) {
            return false;
        }
        if (nft.media && nft.media.length > 0) {
            return false;
        }
        return true;
    }
    static setTokenRole(tokenRoles, role) {
        tokenRoles.roles.push(role);
        switch (role) {
            case 'DCDTRoleLocalMint':
                tokenRoles.canLocalMint = true;
                break;
            case 'DCDTRoleLocalBurn':
                tokenRoles.canLocalBurn = true;
                break;
        }
    }
    static setCollectionRole(tokenRoles, role) {
        tokenRoles.roles.push(role);
        switch (role) {
            case 'DCDTRoleNFTCreate':
                tokenRoles.canCreate = true;
                break;
            case 'DCDTRoleNFTBurn':
                tokenRoles.canBurn = true;
                break;
            case 'DCDTRoleNFTAddQuantity':
                tokenRoles.canAddQuantity = true;
                break;
            case 'DCDTRoleNFTAddURI':
                tokenRoles.canAddUri = true;
                break;
            case 'DCDTRoleNFTUpdateAttributes':
                tokenRoles.canUpdateAttributes = true;
                break;
            case 'DCDTTransferRole':
                tokenRoles.canTransfer = true;
                break;
        }
    }
    static tokenNonce(tokenID) {
        const tokenNonceHex = tokenID.split('-')[2];
        return parseInt(tokenNonceHex, 16);
    }
    static getCollectionIdentifier(nftIdentifier) {
        return nftIdentifier.split('-').slice(0, 2).join('-');
    }
    static getNftProof(hash) {
        if (!hash) {
            return undefined;
        }
        const decodedHex = sdk_nestjs_common_1.BinaryUtils.base64Decode(hash);
        if (decodedHex.startsWith('proof:')) {
            return decodedHex;
        }
        else {
            return hash;
        }
    }
}
exports.TokenHelpers = TokenHelpers;
//# sourceMappingURL=token.helpers.js.map