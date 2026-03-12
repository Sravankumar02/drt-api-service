"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoaTokenType = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const moa_pair_type_1 = require("./moa.pair.type");
class MoaTokenType {
    constructor(init) {
        this.identifier = '';
        this.type = moa_pair_type_1.MoaPairType.experimental;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: '' }),
    tslib_1.__metadata("design:type", String)
], MoaTokenType.prototype, "identifier", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: moa_pair_type_1.MoaPairType }),
    tslib_1.__metadata("design:type", String)
], MoaTokenType.prototype, "type", void 0);
exports.MoaTokenType = MoaTokenType;
//# sourceMappingURL=moa.token.type.js.map