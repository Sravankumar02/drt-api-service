"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionPriceService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const common_1 = require("@nestjs/common");
const cache_info_1 = require("../../utils/cache.info");
const data_api_service_1 = require("../../common/data-api/data-api.service");
let TransactionPriceService = class TransactionPriceService {
    constructor(cachingService, dataApiService) {
        this.cachingService = cachingService;
        this.dataApiService = dataApiService;
    }
    async getTransactionPrice(transaction) {
        const transactionDate = transaction.getDate();
        if (!transactionDate) {
            return undefined;
        }
        let price = await this.getTransactionPriceForDate(transactionDate);
        if (price) {
            price = Number(price).toRounded(2);
        }
        return price;
    }
    async getTransactionPriceForDate(date) {
        if (date.isToday()) {
            return await this.getTransactionPriceToday();
        }
        return await this.getTransactionPriceHistorical(date);
    }
    async getTransactionPriceToday() {
        const cachedPrice = await this.cachingService.get(cache_info_1.CacheInfo.CurrentPrice.key);
        if (cachedPrice) {
            return cachedPrice;
        }
        const price = await this.dataApiService.getRewaPrice();
        if (price) {
            await this.cachingService.set(cache_info_1.CacheInfo.CurrentPrice.key, price, cache_info_1.CacheInfo.CurrentPrice.ttl);
        }
        return price;
    }
    async getTransactionPriceHistorical(date) {
        const cacheKey = `price:${date.toISODateString()}`;
        const cachedPrice = await this.cachingService.get(cacheKey);
        if (cachedPrice) {
            return cachedPrice;
        }
        const price = await this.dataApiService.getRewaPrice(date.getTime() / 1000);
        if (price) {
            await this.cachingService.set(cacheKey, price, sdk_nestjs_common_1.Constants.oneDay() * 7);
        }
        return price;
    }
};
TransactionPriceService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [sdk_nestjs_cache_1.CacheService,
        data_api_service_1.DataApiService])
], TransactionPriceService);
exports.TransactionPriceService = TransactionPriceService;
//# sourceMappingURL=transaction.price.service.js.map