"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScamInfo = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const scam_type_enum_1 = require("./scam-type.enum");
class ScamInfo {
    constructor(init) {
        Object.assign(this, init);
    }
    static isScam(scamInfo) {
        return scamInfo.type !== scam_type_enum_1.ScamType.none;
    }
    static none() {
        return {
            type: scam_type_enum_1.ScamType.none,
        };
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], ScamInfo.prototype, "type", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], ScamInfo.prototype, "info", void 0);
exports.ScamInfo = ScamInfo;
//# sourceMappingURL=scam-info.dto.js.map