"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bids = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class Bids {
    constructor(init) {
        this.amount = '';
        this.token = '';
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Bids.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Bids.prototype, "token", void 0);
exports.Bids = Bids;
//# sourceMappingURL=bids.js.map