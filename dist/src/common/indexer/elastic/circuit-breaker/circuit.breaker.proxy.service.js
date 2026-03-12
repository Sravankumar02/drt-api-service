"use strict";
var EsCircuitBreakerProxy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EsCircuitBreakerProxy = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_elastic_1 = require("@sravankumar02/sdk-nestjs-elastic");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("../../../api-config/api.config.service");
let EsCircuitBreakerProxy = EsCircuitBreakerProxy_1 = class EsCircuitBreakerProxy {
    constructor(apiConfigService, elasticService) {
        this.apiConfigService = apiConfigService;
        this.elasticService = elasticService;
        this.failureCount = 0;
        this.lastFailureTime = 0;
        this.isCircuitOpen = false;
        this.logger = new sdk_nestjs_common_1.OriginLogger(EsCircuitBreakerProxy_1.name);
        this.enabled = apiConfigService.isElasticCircuitBreakerEnabled();
        this.config = apiConfigService.getElasticCircuitBreakerConfig();
        this.logger.log(`ES Circuit Breaker. Enabled: ${this.enabled}. Duration threshold: ${this.config.durationThresholdMs}ms. 
    FailureCountThreshold: ${this.config.failureCountThreshold}ms. FailureCountThreshold: ${this.config.failureCountThreshold}`);
    }
    async withCircuitBreaker(operation) {
        if (!this.enabled) {
            return operation();
        }
        if (this.isCircuitOpen) {
            const now = Date.now();
            if (now - this.lastFailureTime >= this.config.resetTimeoutMs) {
                this.logger.log('Circuit is half-open, attempting reset');
                this.isCircuitOpen = false;
                this.failureCount = 0;
            }
            else {
                throw new common_1.ServiceUnavailableException();
            }
        }
        try {
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Operation timed out')), this.config.durationThresholdMs);
            });
            const result = await Promise.race([operation(), timeoutPromise]);
            this.failureCount = 0;
            return result;
        }
        catch (error) {
            this.failureCount++;
            this.lastFailureTime = Date.now();
            if (this.failureCount >= this.config.failureCountThreshold) {
                if (!this.isCircuitOpen) {
                    this.logger.log('Circuit breaker opened due to multiple failures');
                }
                this.isCircuitOpen = true;
            }
            throw new common_1.ServiceUnavailableException();
        }
    }
    async getCount(index, query) {
        return this.withCircuitBreaker(() => this.elasticService.getCount(index, query));
    }
    async getList(index, id, query) {
        return this.withCircuitBreaker(() => this.elasticService.getList(index, id, query));
    }
    async getItem(index, id, value) {
        return this.withCircuitBreaker(() => this.elasticService.getItem(index, id, value));
    }
    async getCustomValue(index, id, key) {
        return this.withCircuitBreaker(() => this.elasticService.getCustomValue(index, id, key));
    }
    async setCustomValue(index, id, key, value) {
        return this.withCircuitBreaker(() => this.elasticService.setCustomValue(index, id, key, value));
    }
    async setCustomValues(index, id, values) {
        return this.withCircuitBreaker(() => this.elasticService.setCustomValues(index, id, values));
    }
    async getScrollableList(index, id, query, action) {
        return this.withCircuitBreaker(() => this.elasticService.getScrollableList(index, id, query, action));
    }
    async get(url) {
        return this.withCircuitBreaker(() => this.elasticService.get(url));
    }
    async post(url, data) {
        return this.withCircuitBreaker(() => this.elasticService.post(url, data));
    }
};
EsCircuitBreakerProxy = EsCircuitBreakerProxy_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [api_config_service_1.ApiConfigService,
        sdk_nestjs_elastic_1.ElasticService])
], EsCircuitBreakerProxy);
exports.EsCircuitBreakerProxy = EsCircuitBreakerProxy;
//# sourceMappingURL=circuit.breaker.proxy.service.js.map