"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("./entities/constants");
const economics_1 = require("./entities/economics");
const network_service_1 = require("./network.service");
const stats_1 = require("./entities/stats");
const about_1 = require("./entities/about");
let NetworkController = class NetworkController {
    constructor(networkService) {
        this.networkService = networkService;
    }
    getConstants() {
        return this.networkService.getConstants();
    }
    async getEconomics() {
        return await this.networkService.getEconomics();
    }
    async getStats() {
        return await this.networkService.getStats();
    }
    async getAbout() {
        return await this.networkService.getAbout();
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/constants"),
    (0, swagger_1.ApiOperation)({ summary: 'Network constants', description: 'Returns network-specific constants that can be used to automatically configure dapps' }),
    (0, swagger_1.ApiOkResponse)({ type: constants_1.NetworkConstants }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], NetworkController.prototype, "getConstants", null);
tslib_1.__decorate([
    (0, common_1.Get)("/economics"),
    (0, swagger_1.ApiOperation)({ summary: 'Network economics', description: 'Returns general economics information' }),
    (0, swagger_1.ApiOkResponse)({ type: economics_1.Economics }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], NetworkController.prototype, "getEconomics", null);
tslib_1.__decorate([
    (0, common_1.Get)("/stats"),
    (0, swagger_1.ApiOperation)({ summary: 'Network statistics', description: 'Returns general network statistics' }),
    (0, swagger_1.ApiOkResponse)({ type: stats_1.Stats }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], NetworkController.prototype, "getStats", null);
tslib_1.__decorate([
    (0, common_1.Get)("/about"),
    (0, swagger_1.ApiOperation)({ summary: 'About', description: 'Returns general information about API deployment' }),
    (0, swagger_1.ApiOkResponse)({ type: about_1.About }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], NetworkController.prototype, "getAbout", null);
NetworkController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('network'),
    tslib_1.__metadata("design:paramtypes", [network_service_1.NetworkService])
], NetworkController);
exports.NetworkController = NetworkController;
//# sourceMappingURL=network.controller.js.map