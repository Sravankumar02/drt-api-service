"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Identity = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const swagger_1 = require("@nestjs/swagger");
class Identity {
    constructor(init) {
        this.identity = '';
        this.locked = '';
        this.distribution = {};
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Identity.prototype, "identity", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Identity.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Identity.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    tslib_1.__metadata("design:type", String)
], Identity.prototype, "avatar", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    tslib_1.__metadata("design:type", String)
], Identity.prototype, "website", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, required: false }),
    tslib_1.__metadata("design:type", String)
], Identity.prototype, "twitter", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Identity.prototype, "location", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, required: false }),
    tslib_1.__metadata("design:type", Number)
], Identity.prototype, "score", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Number)
], Identity.prototype, "validators", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], Identity.prototype, "stake", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], Identity.prototype, "topUp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], Identity.prototype, "locked", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Object)
], Identity.prototype, "distribution", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: [String], required: false }),
    tslib_1.__metadata("design:type", Array)
], Identity.prototype, "providers", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, required: false }),
    tslib_1.__metadata("design:type", Number)
], Identity.prototype, "stakePercent", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, required: false }),
    tslib_1.__metadata("design:type", Number)
], Identity.prototype, "rank", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, required: false }),
    tslib_1.__metadata("design:type", Number)
], Identity.prototype, "apr", void 0);
exports.Identity = Identity;
//# sourceMappingURL=identity.js.map