"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaitingList = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const swagger_1 = require("@nestjs/swagger");
class WaitingList {
    constructor(init) {
        this.address = '';
        this.nonce = 0;
        this.rank = 0;
        this.value = '';
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'drt1qga7ze0l03chfgru0a32wxqf2226nzrxnyhzer9lmudqhjgy7ycq0wn4su' }),
    tslib_1.__metadata("design:type", String)
], WaitingList.prototype, "address", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 46 }),
    tslib_1.__metadata("design:type", Number)
], WaitingList.prototype, "nonce", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 2 }),
    tslib_1.__metadata("design:type", Number)
], WaitingList.prototype, "rank", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], WaitingList.prototype, "value", void 0);
exports.WaitingList = WaitingList;
//# sourceMappingURL=waiting.list.js.map