"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const assets_module_1 = require("../../common/assets/assets.module");
const token_module_1 = require("../tokens/token.module");
const transaction_module_1 = require("../transactions/transaction.module");
const transfer_service_1 = require("./transfer.service");
let TransferModule = class TransferModule {
};
TransferModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => transaction_module_1.TransactionModule),
            (0, common_1.forwardRef)(() => token_module_1.TokenModule),
            assets_module_1.AssetsModule,
        ],
        providers: [
            transfer_service_1.TransferService,
        ],
        exports: [
            transfer_service_1.TransferService,
        ],
    })
], TransferModule);
exports.TransferModule = TransferModule;
//# sourceMappingURL=transfer.module.js.map