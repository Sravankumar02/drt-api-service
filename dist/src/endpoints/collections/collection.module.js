"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const assets_module_1 = require("../../common/assets/assets.module");
const plugin_module_1 = require("../../plugins/plugin.module");
const dcdt_module_1 = require("../dcdt/dcdt.module");
const nft_marketplace_module_1 = require("../marketplace/nft.marketplace.module");
const token_module_1 = require("../tokens/token.module");
const vm_query_module_1 = require("../vm.query/vm.query.module");
const collection_service_1 = require("./collection.service");
let CollectionModule = class CollectionModule {
};
CollectionModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => dcdt_module_1.DcdtModule),
            (0, common_1.forwardRef)(() => vm_query_module_1.VmQueryModule),
            (0, common_1.forwardRef)(() => token_module_1.TokenModule),
            (0, common_1.forwardRef)(() => assets_module_1.AssetsModule),
            (0, common_1.forwardRef)(() => plugin_module_1.PluginModule),
            (0, common_1.forwardRef)(() => nft_marketplace_module_1.NftMarketplaceModule),
        ],
        providers: [
            collection_service_1.CollectionService,
        ],
        exports: [
            collection_service_1.CollectionService,
        ],
    })
], CollectionModule);
exports.CollectionModule = CollectionModule;
//# sourceMappingURL=collection.module.js.map