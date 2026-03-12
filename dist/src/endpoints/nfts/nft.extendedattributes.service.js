"use strict";
var NftExtendedAttributesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftExtendedAttributesService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const common_1 = require("@nestjs/common");
const token_helpers_1 = require("../../utils/token.helpers");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const nft_metadata_error_code_1 = require("./entities/nft.metadata.error.code");
let NftExtendedAttributesService = NftExtendedAttributesService_1 = class NftExtendedAttributesService {
    constructor(apiConfigService, apiService) {
        this.apiConfigService = apiConfigService;
        this.apiService = apiService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(NftExtendedAttributesService_1.name);
    }
    async tryGetExtendedAttributesFromBase64EncodedAttributes(attributes) {
        try {
            return await this.getExtendedAttributesFromBase64EncodedAttributes(attributes);
        }
        catch (error) {
            this.logger.error(`Could not get extended attributes from raw attributes '${attributes}'`);
            this.logger.error(error);
            return undefined;
        }
    }
    async getExtendedAttributesFromBase64EncodedAttributes(attributes) {
        const metadata = this.getMetadataFromBase64EncodedAttributes(attributes);
        if (metadata === undefined) {
            return undefined;
        }
        return await this.getExtendedAttributesFromMetadata(metadata);
    }
    async getExtendedAttributesFromMetadata(metadata) {
        const result = await this.getExtendedAttributesFromIpfs(metadata !== null && metadata !== void 0 ? metadata : '');
        if (!result) {
            return undefined;
        }
        if (Object.keys(result).length === 0) {
            return undefined;
        }
        if (result.fileUri) {
            result.fileUri = token_helpers_1.TokenHelpers.computeNftUri(result.fileUri, this.apiConfigService.getExternalMediaUrl() + '/nfts/asset');
        }
        return result;
    }
    async getExtendedAttributesFromIpfs(metadata) {
        const ipfsUri = `https://ipfs.io/ipfs/${metadata}`;
        const processedIpfsUri = token_helpers_1.TokenHelpers.computeNftUri(ipfsUri, this.apiConfigService.getMediaUrl() + '/nfts/asset');
        let result;
        let data;
        try {
            result = await this.apiService.get(processedIpfsUri, { timeout: 10000 });
            data = result.data;
        }
        catch (error) {
            const status = error === null || error === void 0 ? void 0 : error.status;
            if (status === 400 && error.response) {
                return this.createError(nft_metadata_error_code_1.NftMetadataErrorCode.ipfsError, `IPFS error when fetching metadata: ${error.response}`);
            }
            else if (status === 404) {
                return this.createError(nft_metadata_error_code_1.NftMetadataErrorCode.notFound, 'Metadata file not found on IPFS');
            }
            else if (error.message === 'timeout of 10000ms exceeded') {
                return this.createError(nft_metadata_error_code_1.NftMetadataErrorCode.timeout, 'Timeout exceeded when fetching metadata');
            }
            this.logger.error(error);
            return this.createError(nft_metadata_error_code_1.NftMetadataErrorCode.unknownError, `Unknown error when fetching metadata '${metadata}'`);
        }
        const contentType = result.headers['content-type'];
        if (contentType !== 'application/json') {
            return this.createError(nft_metadata_error_code_1.NftMetadataErrorCode.invalidContentType, `Invalid content type '${contentType}`);
        }
        if (typeof data === 'string') {
            try {
                data = JSON.parse(data);
            }
            catch (error) {
                return this.createError(nft_metadata_error_code_1.NftMetadataErrorCode.jsonParseError, 'Error when parsing as JSON');
            }
        }
        sdk_nestjs_http_1.ApiUtils.cleanupApiValueRecursively(data);
        if (Object.keys(data).length === 0) {
            return this.createError(nft_metadata_error_code_1.NftMetadataErrorCode.emptyMetadata, 'Metadata value is empty');
        }
        if (typeof data !== 'object' && !Array.isArray(data)) {
            return null;
        }
        return data;
    }
    createError(code, message) {
        this.logger.error(message);
        return {
            error: {
                code,
                message,
                timestamp: Math.round(Date.now() / 1000),
            },
        };
    }
    getTags(attributes) {
        const match = sdk_nestjs_common_1.MatchUtils.getTagsFromBase64Attributes(attributes);
        if (!match || !match.groups) {
            return [];
        }
        return match.groups['tags'].split(',');
    }
    getMetadataFromBase64EncodedAttributes(attributes) {
        const match = sdk_nestjs_common_1.MatchUtils.getMetadataFromBase64Attributes(attributes);
        if (!match || !match.groups) {
            return undefined;
        }
        return match.groups['metadata'];
    }
};
NftExtendedAttributesService = NftExtendedAttributesService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [api_config_service_1.ApiConfigService,
        sdk_nestjs_http_1.ApiService])
], NftExtendedAttributesService);
exports.NftExtendedAttributesService = NftExtendedAttributesService;
//# sourceMappingURL=nft.extendedattributes.service.js.map