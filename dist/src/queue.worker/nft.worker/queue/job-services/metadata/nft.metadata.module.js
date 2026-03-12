"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftMetadataModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const nft_module_1 = require("../../../../../endpoints/nfts/nft.module");
const dynamic_module_utils_1 = require("../../../../../utils/dynamic.module.utils");
const nft_metadata_service_1 = require("./nft.metadata.service");
let NftMetadataModule = class NftMetadataModule {
};
NftMetadataModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => nft_module_1.NftModule),
        ],
        controllers: [],
        providers: [
            nft_metadata_service_1.NftMetadataService,
            dynamic_module_utils_1.DynamicModuleUtils.getPubSubService(),
        ],
        exports: [
            nft_metadata_service_1.NftMetadataService,
        ],
    })
], NftMetadataModule);
exports.NftMetadataModule = NftMetadataModule;
//# sourceMappingURL=nft.metadata.module.js.map