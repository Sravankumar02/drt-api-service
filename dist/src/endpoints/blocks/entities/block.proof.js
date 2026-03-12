"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockProofDto = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class BlockProofDto {
    constructor(init) {
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "Bitmap representing public keys involved in the proof",
        example: "7702",
    }),
    tslib_1.__metadata("design:type", String)
], BlockProofDto.prototype, "pubKeysBitmap", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "Aggregated BLS signature for the proof",
        example: "50224d66a42a019991d16f25dba375b581f279d4394d4c254876c1484f61bed90fb20456f8af107c54e4eed1763e2a92",
    }),
    tslib_1.__metadata("design:type", String)
], BlockProofDto.prototype, "aggregatedSignature", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: "Hash of the block header being proven",
        example: "414d526161587ae9f53453aa0392971272c48dbb3cc54a33448972d388e0deeb",
    }),
    tslib_1.__metadata("design:type", String)
], BlockProofDto.prototype, "headerHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: "Epoch number of the block header", example: 130 }),
    tslib_1.__metadata("design:type", Number)
], BlockProofDto.prototype, "headerEpoch", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: "Nonce value of the block header", example: 13137 }),
    tslib_1.__metadata("design:type", Number)
], BlockProofDto.prototype, "headerNonce", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: "Round number of the block header", example: 13163 }),
    tslib_1.__metadata("design:type", Number)
], BlockProofDto.prototype, "headerRound", void 0);
exports.BlockProofDto = BlockProofDto;
//# sourceMappingURL=block.proof.js.map