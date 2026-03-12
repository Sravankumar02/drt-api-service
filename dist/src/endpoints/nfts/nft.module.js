"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const assets_module_1 = require("../../common/assets/assets.module");
const plugin_module_1 = require("../../plugins/plugin.module");
const nft_media_module_1 = require("../../queue.worker/nft.worker/queue/job-services/media/nft.media.module");
const nft_metadata_module_1 = require("../../queue.worker/nft.worker/queue/job-services/metadata/nft.metadata.module");
const collection_module_1 = require("../collections/collection.module");
const dcdt_module_1 = require("../dcdt/dcdt.module");
const moa_module_1 = require("../moa/moa.module");
const token_module_1 = require("../tokens/token.module");
const nft_extendedattributes_service_1 = require("./nft.extendedattributes.service");
const nft_service_1 = require("./nft.service");
const locked_asset_module_1 = require("../../common/locked-asset/locked-asset.module");
let NftModule = class NftModule {
};
NftModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => dcdt_module_1.DcdtModule),
            (0, common_1.forwardRef)(() => token_module_1.TokenModule),
            (0, common_1.forwardRef)(() => collection_module_1.CollectionModule),
            (0, common_1.forwardRef)(() => plugin_module_1.PluginModule),
            (0, common_1.forwardRef)(() => nft_metadata_module_1.NftMetadataModule),
            (0, common_1.forwardRef)(() => moa_module_1.MoaModule.forRoot()),
            (0, common_1.forwardRef)(() => assets_module_1.AssetsModule),
            (0, common_1.forwardRef)(() => locked_asset_module_1.LockedAssetModule),
            nft_media_module_1.NftMediaModule,
        ],
        providers: [
            nft_service_1.NftService, nft_extendedattributes_service_1.NftExtendedAttributesService,
        ],
        exports: [
            nft_service_1.NftService, nft_extendedattributes_service_1.NftExtendedAttributesService,
        ],
    })
], NftModule);
exports.NftModule = NftModule;
//# sourceMappingURL=nft.module.js.map