"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenSupplyResult = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const dcdt_locked_account_1 = require("../../dcdt/entities/dcdt.locked.account");
class TokenSupplyResult {
    constructor(init) {
        this.supply = '';
        this.circulatingSupply = '';
        this.lockedAccounts = undefined;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Supply details', type: String }),
    tslib_1.__metadata("design:type", Object)
], TokenSupplyResult.prototype, "supply", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Circulating supply details', type: String }),
    tslib_1.__metadata("design:type", Object)
], TokenSupplyResult.prototype, "circulatingSupply", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Minted details', type: String }),
    tslib_1.__metadata("design:type", Object)
], TokenSupplyResult.prototype, "minted", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Token burnt details', type: String }),
    tslib_1.__metadata("design:type", Object)
], TokenSupplyResult.prototype, "burnt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Initial minted details', type: String }),
    tslib_1.__metadata("design:type", Object)
], TokenSupplyResult.prototype, "initialMinted", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Dcdt locked accounts details', type: dcdt_locked_account_1.DcdtLockedAccount, isArray: true }),
    tslib_1.__metadata("design:type", Object)
], TokenSupplyResult.prototype, "lockedAccounts", void 0);
exports.TokenSupplyResult = TokenSupplyResult;
//# sourceMappingURL=token.supply.result.js.map