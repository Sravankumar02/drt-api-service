"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftMetadata = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const nft_metadata_error_1 = require("./nft.metadata.error");
class NftMetadata {
    constructor(init) {
        this.description = '';
        this.fileType = '';
        this.fileUri = '';
        this.fileName = '';
        this.error = undefined;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], NftMetadata.prototype, "description", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], NftMetadata.prototype, "fileType", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], NftMetadata.prototype, "fileUri", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], NftMetadata.prototype, "fileName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: nft_metadata_error_1.NftMetadataError, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], NftMetadata.prototype, "error", void 0);
exports.NftMetadata = NftMetadata;
//# sourceMappingURL=nft.metadata.js.map