"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftJobProcessorModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const nft_asset_module_1 = require("./assets/nft.asset.module");
const nft_media_module_1 = require("./media/nft.media.module");
const nft_metadata_module_1 = require("./metadata/nft.metadata.module");
const nft_thumbnail_module_1 = require("./thumbnails/nft.thumbnail.module");
let NftJobProcessorModule = class NftJobProcessorModule {
};
NftJobProcessorModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nft_media_module_1.NftMediaModule,
            nft_metadata_module_1.NftMetadataModule,
            nft_thumbnail_module_1.NftThumbnailModule,
            nft_asset_module_1.NftAssetModule,
        ],
        exports: [
            nft_media_module_1.NftMediaModule,
            nft_metadata_module_1.NftMetadataModule,
            nft_thumbnail_module_1.NftThumbnailModule,
            nft_asset_module_1.NftAssetModule,
        ],
    })
], NftJobProcessorModule);
exports.NftJobProcessorModule = NftJobProcessorModule;
//# sourceMappingURL=nft.job.processor.module.js.map