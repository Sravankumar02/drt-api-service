"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftMedia = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class NftMedia {
    constructor(init) {
        this.url = '';
        this.originalUrl = '';
        this.thumbnailUrl = '';
        this.fileType = '';
        this.fileSize = 0;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], NftMedia.prototype, "url", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], NftMedia.prototype, "originalUrl", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], NftMedia.prototype, "thumbnailUrl", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], NftMedia.prototype, "fileType", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], NftMedia.prototype, "fileSize", void 0);
exports.NftMedia = NftMedia;
//# sourceMappingURL=nft.media.js.map