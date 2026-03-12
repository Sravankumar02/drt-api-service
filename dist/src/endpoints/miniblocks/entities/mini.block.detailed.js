"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniBlockDetailed = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class MiniBlockDetailed {
    constructor(init) {
        this.miniBlockHash = '';
        this.receiverBlockHash = '';
        this.receiverShard = 0;
        this.senderBlockHash = '';
        this.senderShard = 0;
        this.timestamp = 0;
        this.type = '';
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'c956ecbefbba25f0bcb0b182357d41287384fb8707d5860ad5cacc66f3fe0bc8' }),
    tslib_1.__metadata("design:type", String)
], MiniBlockDetailed.prototype, "miniBlockHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: '3d008f54446e7f3c636159e0f4934267e154541a95665477676ea7f3abbc0aa7' }),
    tslib_1.__metadata("design:type", String)
], MiniBlockDetailed.prototype, "receiverBlockHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 0 }),
    tslib_1.__metadata("design:type", Number)
], MiniBlockDetailed.prototype, "receiverShard", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: '3d008f54446e7f3c636159e0f4934267e154541a95665477676ea7f3abbc0aa7' }),
    tslib_1.__metadata("design:type", String)
], MiniBlockDetailed.prototype, "senderBlockHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 0 }),
    tslib_1.__metadata("design:type", Number)
], MiniBlockDetailed.prototype, "senderShard", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 1646579514 }),
    tslib_1.__metadata("design:type", Number)
], MiniBlockDetailed.prototype, "timestamp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'TxBlock' }),
    tslib_1.__metadata("design:type", String)
], MiniBlockDetailed.prototype, "type", void 0);
exports.MiniBlockDetailed = MiniBlockDetailed;
//# sourceMappingURL=mini.block.detailed.js.map