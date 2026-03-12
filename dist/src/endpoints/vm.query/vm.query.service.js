"use strict";
var VmQueryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VmQueryService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_monitoring_1 = require("@sravankumar02/sdk-nestjs-monitoring");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const log_metrics_event_1 = require("../../common/entities/log.metrics.event");
const gateway_component_request_1 = require("../../common/gateway/entities/gateway.component.request");
const gateway_service_1 = require("../../common/gateway/gateway.service");
const protocol_service_1 = require("../../common/protocol/protocol.service");
const metrics_events_constants_1 = require("../../utils/metrics-events.constants");
const settings_service_1 = require("../../common/settings/settings.service");
let VmQueryService = VmQueryService_1 = class VmQueryService {
    constructor(cachingService, gatewayService, protocolService, eventEmitter, settingsService) {
        this.cachingService = cachingService;
        this.gatewayService = gatewayService;
        this.protocolService = protocolService;
        this.eventEmitter = eventEmitter;
        this.settingsService = settingsService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(VmQueryService_1.name);
    }
    async computeTtls() {
        const secondsRemainingUntilNextRound = await this.protocolService.getSecondsRemainingUntilNextRound();
        const remoteTtl = secondsRemainingUntilNextRound > 1 ? secondsRemainingUntilNextRound : 0;
        return {
            localTtl: secondsRemainingUntilNextRound,
            remoteTtl,
        };
    }
    async vmQueryFullResult(contract, func, caller = undefined, args = [], value = undefined, timestamp) {
        let key = `vm-query:${contract}:${func}`;
        if (caller) {
            key += `:${caller}`;
        }
        if (args.length > 0) {
            key += `@${args.join('@')}`;
        }
        if (timestamp) {
            key += `{${timestamp}}`;
        }
        const { localTtl, remoteTtl } = await this.computeTtls();
        return await this.cachingService.getOrSet(key, async () => await this.vmQueryRaw(contract, func, caller, args, value), remoteTtl, localTtl);
    }
    async vmQuery(contract, func, caller = undefined, args = [], value = undefined, skipCache = false) {
        var _a, _b;
        let key = `vm-query:${contract}:${func}`;
        if (caller) {
            key += `:${caller}`;
        }
        if (args.length > 0) {
            key += `@${args.join('@')}`;
        }
        try {
            let result;
            if (skipCache) {
                result = await this.vmQueryRaw(contract, func, caller, args, value);
            }
            else {
                const { localTtl, remoteTtl } = await this.computeTtls();
                result = await this.cachingService.getOrSet(key, async () => await this.vmQueryRaw(contract, func, caller, args, value), remoteTtl, localTtl);
            }
            const data = result.data.data;
            return 'ReturnData' in data ? data.ReturnData : data.returnData;
        }
        catch (error) {
            this.logger.error(`Error in vm query for address '${contract}', function '${func}', caller '${caller}', value '${value}', args '${JSON.stringify(args)}'. Error message: ${(_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error}`);
            throw error;
        }
    }
    async vmQueryRaw(contract, func, caller, args = [], value = undefined) {
        const payload = {
            scAddress: contract,
            funcName: func,
            caller: caller,
            args: args,
            value: value,
        };
        const profiler = new sdk_nestjs_monitoring_1.PerformanceProfiler();
        try {
            const result = await this.gatewayService.createRaw('vm-values/query', gateway_component_request_1.GatewayComponentRequest.vmQuery, payload);
            return result.data;
        }
        finally {
            profiler.stop();
            const useVmQueryTracingFlag = await this.settingsService.getUseVmQueryTracingFlag();
            if (useVmQueryTracingFlag) {
                const metricsEvent = new log_metrics_event_1.LogMetricsEvent();
                metricsEvent.args = [contract, func, profiler.duration];
                this.eventEmitter.emit(metrics_events_constants_1.MetricsEvents.SetVmQuery, metricsEvent);
            }
        }
    }
};
VmQueryService = VmQueryService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => sdk_nestjs_cache_1.CacheService))),
    tslib_1.__metadata("design:paramtypes", [sdk_nestjs_cache_1.CacheService,
        gateway_service_1.GatewayService,
        protocol_service_1.ProtocolService,
        event_emitter_1.EventEmitter2,
        settings_service_1.SettingsService])
], VmQueryService);
exports.VmQueryService = VmQueryService;
//# sourceMappingURL=vm.query.service.js.map