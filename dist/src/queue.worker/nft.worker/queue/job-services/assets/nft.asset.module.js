"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftAssetModule = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const common_1 = require("@nestjs/common");
const aws_service_1 = require("../thumbnails/aws.service");
const nft_asset_service_1 = require("./nft.asset.service");
let NftAssetModule = class NftAssetModule {
};
NftAssetModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [sdk_nestjs_http_1.ApiModule],
        providers: [nft_asset_service_1.NftAssetService, aws_service_1.AWSService],
        exports: [nft_asset_service_1.NftAssetService],
    })
], NftAssetModule);
exports.NftAssetModule = NftAssetModule;
//# sourceMappingURL=nft.asset.module.js.map