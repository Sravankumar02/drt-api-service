"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftMediaModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const persistence_module_1 = require("../../../../../common/persistence/persistence.module");
const dynamic_module_utils_1 = require("../../../../../utils/dynamic.module.utils");
const nft_media_service_1 = require("./nft.media.service");
let NftMediaModule = class NftMediaModule {
};
NftMediaModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            persistence_module_1.PersistenceModule.forRoot(),
        ],
        controllers: [],
        providers: [
            nft_media_service_1.NftMediaService,
            dynamic_module_utils_1.DynamicModuleUtils.getPubSubService(),
        ],
        exports: [
            nft_media_service_1.NftMediaService,
        ],
    })
], NftMediaModule);
exports.NftMediaModule = NftMediaModule;
//# sourceMappingURL=nft.media.module.js.map