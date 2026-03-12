"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftMetadataError = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
const nft_metadata_error_code_1 = require("./nft.metadata.error.code");
class NftMetadataError {
    constructor() {
        this.code = nft_metadata_error_code_1.NftMetadataErrorCode.unknownError;
        this.message = '';
        this.timestamp = 0;
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: nft_metadata_error_code_1.NftMetadataErrorCode }),
    tslib_1.__metadata("design:type", String)
], NftMetadataError.prototype, "code", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], NftMetadataError.prototype, "message", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], NftMetadataError.prototype, "timestamp", void 0);
exports.NftMetadataError = NftMetadataError;
//# sourceMappingURL=nft.metadata.error.js.map