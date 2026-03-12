"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessNftsPublicController = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_auth_1 = require("@sravankumar02/sdk-nestjs-auth");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const process_nft_request_1 = require("./entities/process.nft.request");
const process_nfts_service_1 = require("./process.nfts.service");
let ProcessNftsPublicController = class ProcessNftsPublicController {
    constructor(processNftService) {
        this.processNftService = processNftService;
    }
    async generateThumbnails(address, processNftRequest) {
        try {
            return await this.processNftService.processWithOwnerCheck(address, processNftRequest);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
tslib_1.__decorate([
    (0, common_1.UseGuards)(sdk_nestjs_auth_1.NativeAuthGuard),
    (0, common_1.Post)("/nfts/process"),
    (0, swagger_1.ApiOperation)({ summary: 'Trigger NFT media/metadata reprocessing', description: 'Triggers NFT media/metadata reprocessing for collection owners' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'NFT media/metadata reprocessing has been triggered' }),
    tslib_1.__param(0, (0, sdk_nestjs_auth_1.NativeAuth)('address')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, process_nft_request_1.ProcessNftRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], ProcessNftsPublicController.prototype, "generateThumbnails", null);
ProcessNftsPublicController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [process_nfts_service_1.ProcessNftsService])
], ProcessNftsPublicController);
exports.ProcessNftsPublicController = ProcessNftsPublicController;
//# sourceMappingURL=process.nfts.public.controller.js.map