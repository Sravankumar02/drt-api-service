"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shard = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class Shard {
    constructor(init) {
        this.shard = 0;
        this.validators = 0;
        this.activeValidators = 0;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Shard details', type: Number, example: 1 }),
    tslib_1.__metadata("design:type", Number)
], Shard.prototype, "shard", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Validators details', type: Number, example: 800 }),
    tslib_1.__metadata("design:type", Number)
], Shard.prototype, "validators", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Active validators details', type: Number, example: 800 }),
    tslib_1.__metadata("design:type", Number)
], Shard.prototype, "activeValidators", void 0);
exports.Shard = Shard;
//# sourceMappingURL=shard.js.map