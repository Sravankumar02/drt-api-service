"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TpsController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const tps_1 = require("./entities/tps");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const tps_frequency_1 = require("./entities/tps.frequency");
const tps_service_1 = require("./tps.service");
const tps_interval_1 = require("./entities/tps.interval");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
let TpsController = class TpsController {
    constructor(tpsService) {
        this.tpsService = tpsService;
    }
    async getTpsLatest() {
        return await this.tpsService.getTpsLatest(tps_frequency_1.TpsFrequency._30s);
    }
    async getTpsLatestByFrequency(frequency) {
        return await this.tpsService.getTpsLatest(frequency);
    }
    async getTpsMax() {
        return await this.tpsService.getTpsMax(tps_interval_1.TpsInterval._1h);
    }
    async getTpsMaxByFrequency(interval) {
        return await this.tpsService.getTpsMax(interval);
    }
    async getTransactionCount() {
        return await this.tpsService.getTransactionCount();
    }
    async getTpsHistory() {
        return await this.tpsService.getTpsHistory(tps_interval_1.TpsInterval._1h);
    }
    async getTpsHistoryByInterval(interval) {
        return await this.tpsService.getTpsHistory(interval);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('/latest'),
    (0, swagger_1.ApiOperation)({ summary: 'TPS live info', description: 'Return TPS live info' }),
    (0, swagger_1.ApiOkResponse)({ type: tps_1.Tps }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TpsController.prototype, "getTpsLatest", null);
tslib_1.__decorate([
    (0, common_1.Get)('/latest/:frequency'),
    (0, swagger_1.ApiOperation)({ summary: 'TPS live info', description: 'Return TPS live info' }),
    (0, swagger_1.ApiOkResponse)({ type: tps_1.Tps }),
    tslib_1.__param(0, (0, common_1.Param)('frequency', new sdk_nestjs_common_1.ParseEnumPipe(tps_frequency_1.TpsFrequency))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], TpsController.prototype, "getTpsLatestByFrequency", null);
tslib_1.__decorate([
    (0, common_1.Get)('/max'),
    (0, swagger_1.ApiOperation)({ summary: 'TPS max info', description: 'Return TPS max info' }),
    (0, swagger_1.ApiOkResponse)({ type: tps_1.Tps }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TpsController.prototype, "getTpsMax", null);
tslib_1.__decorate([
    (0, common_1.Get)('/max/:interval'),
    (0, swagger_1.ApiOperation)({ summary: 'TPS max info', description: 'Return TPS max info' }),
    (0, swagger_1.ApiOkResponse)({ type: tps_1.Tps }),
    tslib_1.__param(0, (0, common_1.Param)('interval', new sdk_nestjs_common_1.ParseEnumPipe(tps_interval_1.TpsInterval))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], TpsController.prototype, "getTpsMaxByFrequency", null);
tslib_1.__decorate([
    (0, common_1.Get)('/count'),
    (0, sdk_nestjs_cache_1.NoCache)(),
    (0, swagger_1.ApiOperation)({ summary: 'Transaction count info', description: 'Return transaction count info' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TpsController.prototype, "getTransactionCount", null);
tslib_1.__decorate([
    (0, common_1.Get)('/history'),
    (0, swagger_1.ApiOperation)({ summary: 'TPS history info', description: 'Return TPS history info' }),
    (0, swagger_1.ApiOkResponse)({ type: tps_1.Tps, isArray: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], TpsController.prototype, "getTpsHistory", null);
tslib_1.__decorate([
    (0, common_1.Get)('/history/:interval'),
    (0, swagger_1.ApiOperation)({ summary: 'TPS history info', description: 'Return TPS history info' }),
    (0, swagger_1.ApiOkResponse)({ type: tps_1.Tps, isArray: true }),
    tslib_1.__param(0, (0, common_1.Param)('interval', new sdk_nestjs_common_1.ParseEnumPipe(tps_interval_1.TpsInterval))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], TpsController.prototype, "getTpsHistoryByInterval", null);
TpsController = tslib_1.__decorate([
    (0, common_1.Controller)('tps'),
    (0, swagger_1.ApiTags)('tps'),
    tslib_1.__metadata("design:paramtypes", [tps_service_1.TpsService])
], TpsController);
exports.TpsController = TpsController;
//# sourceMappingURL=tps.controller.js.map