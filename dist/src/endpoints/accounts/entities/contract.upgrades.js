"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractUpgrades = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class ContractUpgrades {
    constructor(init) {
        this.address = '';
        this.txHash = '';
        this.codeHash = '';
        this.timestamp = 0;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, example: 'drt1qga7ze0l03chfgru0a32wxqf2226nzrxnyhzer9lmudqhjgy7ycq0wn4su' }),
    tslib_1.__metadata("design:type", String)
], ContractUpgrades.prototype, "address", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, example: '1c8c6b2148f25621fa2c798a2c9a184df61fdd1991aa0af7ea01eb7b89025d2a' }),
    tslib_1.__metadata("design:type", String)
], ContractUpgrades.prototype, "txHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, example: '1c8c6b2148f25621fa2c798a2c9a184df61fdd1991aa0af7ea01eb7b89025d2a' }),
    tslib_1.__metadata("design:type", String)
], ContractUpgrades.prototype, "codeHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true, example: '1638577452' }),
    tslib_1.__metadata("design:type", Number)
], ContractUpgrades.prototype, "timestamp", void 0);
exports.ContractUpgrades = ContractUpgrades;
//# sourceMappingURL=contract.upgrades.js.map