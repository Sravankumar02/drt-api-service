"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionAction = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class TransactionAction {
    constructor(init) {
        this.category = '';
        this.name = '';
        this.description = '';
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], TransactionAction.prototype, "category", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], TransactionAction.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], TransactionAction.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Object)
], TransactionAction.prototype, "arguments", void 0);
exports.TransactionAction = TransactionAction;
//# sourceMappingURL=transaction.action.js.map