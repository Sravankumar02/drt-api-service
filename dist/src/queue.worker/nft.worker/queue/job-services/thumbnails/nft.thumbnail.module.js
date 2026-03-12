"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftThumbnailModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const aws_service_1 = require("./aws.service");
const nft_thumbnail_service_1 = require("./nft.thumbnail.service");
let NftThumbnailModule = class NftThumbnailModule {
};
NftThumbnailModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [
            nft_thumbnail_service_1.NftThumbnailService, aws_service_1.AWSService,
        ],
        exports: [
            nft_thumbnail_service_1.NftThumbnailService,
        ],
    })
], NftThumbnailModule);
exports.NftThumbnailModule = NftThumbnailModule;
//# sourceMappingURL=nft.thumbnail.module.js.map