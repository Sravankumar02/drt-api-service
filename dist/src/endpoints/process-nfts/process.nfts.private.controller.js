"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessNftsPrivateController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const process_nft_request_1 = require("./entities/process.nft.request");
const process_nfts_service_1 = require("./process.nfts.service");
let ProcessNftsPrivateController = class ProcessNftsPrivateController {
    constructor(processNftService) {
        this.processNftService = processNftService;
    }
    async generateThumbnails(processNftRequest) {
        try {
            return await this.processNftService.process(processNftRequest);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
tslib_1.__decorate([
    (0, common_1.Post)("/nfts/process"),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [process_nft_request_1.ProcessNftRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], ProcessNftsPrivateController.prototype, "generateThumbnails", null);
ProcessNftsPrivateController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [process_nfts_service_1.ProcessNftsService])
], ProcessNftsPrivateController);
exports.ProcessNftsPrivateController = ProcessNftsPrivateController;
//# sourceMappingURL=process.nfts.private.controller.js.map