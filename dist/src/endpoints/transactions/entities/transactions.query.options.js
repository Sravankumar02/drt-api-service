"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionQueryOptions = void 0;
const common_1 = require("@nestjs/common");
class TransactionQueryOptions {
    constructor(init) {
        this.withScResults = false;
        this.withOperations = true;
        this.withLogs = true;
        this.withScResultLogs = true;
        Object.assign(this, init);
    }
    static applyDefaultOptions(size, options) {
        if (size <= TransactionQueryOptions.SCAM_INFO_MAX_SIZE) {
            options.withScamInfo = true;
        }
        if (options.withUsername === true && size > TransactionQueryOptions.USERNAME_MAX_SIZE) {
            throw new common_1.BadRequestException(`'withUsername' flag can only be activated for a maximum size of ${TransactionQueryOptions.USERNAME_MAX_SIZE}`);
        }
        if (options.withActionTransferValue === true && size > TransactionQueryOptions.ACTION_TRANSFER_VALUE_MAX_SIZE) {
            throw new common_1.BadRequestException(`'withActionTransferValue' flag can only be activated for a maximum size of ${TransactionQueryOptions.ACTION_TRANSFER_VALUE_MAX_SIZE}`);
        }
        return options;
    }
}
exports.TransactionQueryOptions = TransactionQueryOptions;
TransactionQueryOptions.SCAM_INFO_MAX_SIZE = 50;
TransactionQueryOptions.USERNAME_MAX_SIZE = 50;
TransactionQueryOptions.ACTION_TRANSFER_VALUE_MAX_SIZE = 50;
//# sourceMappingURL=transactions.query.options.js.map