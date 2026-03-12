"use strict";
var RabbitMqTokenHandlerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMqTokenHandlerService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const cache_info_1 = require("../../utils/cache.info");
const dcdt_service_1 = require("../../endpoints/dcdt/dcdt.service");
const microservices_1 = require("@nestjs/microservices");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
let RabbitMqTokenHandlerService = RabbitMqTokenHandlerService_1 = class RabbitMqTokenHandlerService {
    constructor(cachingService, dcdtService, clientProxy) {
        this.cachingService = cachingService;
        this.dcdtService = dcdtService;
        this.clientProxy = clientProxy;
        this.logger = new sdk_nestjs_common_1.OriginLogger(RabbitMqTokenHandlerService_1.name);
    }
    async handleTransferOwnershipEvent(event) {
        const tokenIdentifier = sdk_nestjs_common_1.BinaryUtils.base64Decode(event.topics[0]);
        try {
            const dcdtProperties = await this.dcdtService.getDcdtTokenPropertiesRaw(tokenIdentifier);
            if (!dcdtProperties) {
                return false;
            }
            await this.invalidateKey(cache_info_1.CacheInfo.DcdtProperties(tokenIdentifier).key, dcdtProperties, cache_info_1.CacheInfo.DcdtProperties(tokenIdentifier).ttl);
            return true;
        }
        catch (error) {
            this.logger.error(`An unhandled error occurred when processing transferOwnership event for token with identifier '${tokenIdentifier}'`);
            this.logger.error(error);
            return false;
        }
    }
    async invalidateKey(key, data, ttl) {
        await this.cachingService.set(key, data, ttl);
        this.refreshCacheKey(key, ttl);
    }
    refreshCacheKey(key, ttl) {
        this.clientProxy.emit('refreshCacheKey', { key, ttl });
    }
};
RabbitMqTokenHandlerService = RabbitMqTokenHandlerService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(2, (0, common_1.Inject)('PUBSUB_SERVICE')),
    tslib_1.__metadata("design:paramtypes", [sdk_nestjs_cache_1.CacheService,
        dcdt_service_1.DcdtService,
        microservices_1.ClientProxy])
], RabbitMqTokenHandlerService);
exports.RabbitMqTokenHandlerService = RabbitMqTokenHandlerService;
//# sourceMappingURL=rabbitmq.token.handler.service.js.map