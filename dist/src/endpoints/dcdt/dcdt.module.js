"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DcdtModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const vm_query_module_1 = require("../vm.query/vm.query.module");
const dcdt_service_1 = require("./dcdt.service");
const token_module_1 = require("../tokens/token.module");
const dcdt_address_service_1 = require("./dcdt.address.service");
const nft_module_1 = require("../nfts/nft.module");
const collection_module_1 = require("../collections/collection.module");
const transaction_module_1 = require("../transactions/transaction.module");
const moa_module_1 = require("../moa/moa.module");
const assets_module_1 = require("../../common/assets/assets.module");
const plugin_module_1 = require("../../plugins/plugin.module");
let DcdtModule = class DcdtModule {
};
DcdtModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => nft_module_1.NftModule),
            (0, common_1.forwardRef)(() => collection_module_1.CollectionModule),
            (0, common_1.forwardRef)(() => token_module_1.TokenModule),
            vm_query_module_1.VmQueryModule,
            (0, common_1.forwardRef)(() => transaction_module_1.TransactionModule),
            (0, common_1.forwardRef)(() => moa_module_1.MoaModule.forRoot()),
            (0, common_1.forwardRef)(() => assets_module_1.AssetsModule),
            (0, common_1.forwardRef)(() => plugin_module_1.PluginModule),
        ],
        providers: [
            dcdt_service_1.DcdtService, dcdt_address_service_1.DcdtAddressService,
        ],
        exports: [
            dcdt_service_1.DcdtService, dcdt_address_service_1.DcdtAddressService,
        ],
    })
], DcdtModule);
exports.DcdtModule = DcdtModule;
//# sourceMappingURL=dcdt.module.js.map