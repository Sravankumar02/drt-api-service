"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const dcdt_module_1 = require("../dcdt/dcdt.module");
const nft_module_1 = require("../nfts/nft.module");
const transaction_module_1 = require("../transactions/transaction.module");
const token_service_1 = require("./token.service");
const token_transfer_service_1 = require("./token.transfer.service");
const assets_module_1 = require("../../common/assets/assets.module");
const moa_module_1 = require("../moa/moa.module");
const collection_module_1 = require("../collections/collection.module");
const plugin_module_1 = require("../../plugins/plugin.module");
const transfer_module_1 = require("../transfers/transfer.module");
let TokenModule = class TokenModule {
};
TokenModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => dcdt_module_1.DcdtModule),
            (0, common_1.forwardRef)(() => nft_module_1.NftModule),
            (0, common_1.forwardRef)(() => transaction_module_1.TransactionModule),
            (0, common_1.forwardRef)(() => transfer_module_1.TransferModule),
            (0, common_1.forwardRef)(() => assets_module_1.AssetsModule),
            (0, common_1.forwardRef)(() => moa_module_1.MoaModule.forRoot()),
            (0, common_1.forwardRef)(() => collection_module_1.CollectionModule),
            (0, common_1.forwardRef)(() => plugin_module_1.PluginModule),
        ],
        providers: [
            token_service_1.TokenService, token_transfer_service_1.TokenTransferService,
        ],
        exports: [
            token_service_1.TokenService, token_transfer_service_1.TokenTransferService,
        ],
    })
], TokenModule);
exports.TokenModule = TokenModule;
//# sourceMappingURL=token.module.js.map