"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionFilter = void 0;
const common_1 = require("@nestjs/common");
class TransactionFilter {
    constructor(init) {
        this.senders = [];
        this.receivers = [];
        this.functions = [];
        Object.assign(this, init);
    }
    static validate(filter, size) {
        if (filter.withRelayedScresults && size > 50) {
            throw new common_1.BadRequestException('Size must be less than or equal to 50 when withRelayedScresults is set');
        }
    }
}
exports.TransactionFilter = TransactionFilter;
//# sourceMappingURL=transaction.filter.js.map