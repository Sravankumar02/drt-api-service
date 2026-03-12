"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessNftRequest = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class ProcessNftRequest {
    constructor(init) {
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProcessNftRequest.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    tslib_1.__metadata("design:type", String)
], ProcessNftRequest.prototype, "identifier", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], ProcessNftRequest.prototype, "forceRefreshMedia", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], ProcessNftRequest.prototype, "forceRefreshMetadata", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], ProcessNftRequest.prototype, "forceRefreshThumbnail", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], ProcessNftRequest.prototype, "skipRefreshThumbnail", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], ProcessNftRequest.prototype, "uploadAsset", void 0);
exports.ProcessNftRequest = ProcessNftRequest;
//# sourceMappingURL=process.nft.request.js.map