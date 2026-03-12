"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Queue = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class Queue {
    constructor(init) {
        this.bls = '';
        this.nonce = 0;
        this.rewardsAddress = '';
        this.position = 0;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], Queue.prototype, "bls", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], Queue.prototype, "nonce", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], Queue.prototype, "rewardsAddress", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], Queue.prototype, "position", void 0);
exports.Queue = Queue;
//# sourceMappingURL=queue.js.map