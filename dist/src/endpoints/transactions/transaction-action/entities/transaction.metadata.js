"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionMetadata = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
let TransactionMetadata = class TransactionMetadata {
    constructor(init) {
        this.sender = '';
        this.receiver = '';
        this.value = BigInt(0);
        this.functionArgs = [];
        this.timestamp = 0;
        Object.assign(this, init);
    }
};
TransactionMetadata = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], TransactionMetadata);
exports.TransactionMetadata = TransactionMetadata;
//# sourceMappingURL=transaction.metadata.js.map