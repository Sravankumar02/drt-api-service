"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConcurrencyUtils = void 0;
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
class ConcurrencyUtils {
    static async executeWithConcurrencyLimit(items, asyncOperation, concurrencyLimit = 10, description) {
        if (items.length === 0) {
            return [];
        }
        const logPrefix = description ? `[${description}] ` : '';
        this.logger.log(`${logPrefix}Processing ${items.length} items with concurrency limit ${concurrencyLimit}`);
        const results = [];
        const batchCount = Math.ceil(items.length / concurrencyLimit);
        for (let i = 0; i < items.length; i += concurrencyLimit) {
            const batchIndex = Math.floor(i / concurrencyLimit) + 1;
            const batch = items.slice(i, i + concurrencyLimit);
            this.logger.log(`${logPrefix}Processing batch ${batchIndex}/${batchCount} (${batch.length} items)`);
            const batchPromises = batch.map(item => asyncOperation(item));
            const batchResults = await Promise.all(batchPromises);
            results.push(...batchResults);
        }
        this.logger.log(`${logPrefix}Completed processing ${items.length} items`);
        return results;
    }
    static async executeWithChunksAndDelay(items, asyncOperation, chunkSize = 10, delayMs = 100, description) {
        if (items.length === 0) {
            return [];
        }
        const logPrefix = description ? `[${description}] ` : '';
        this.logger.log(`${logPrefix}Processing ${items.length} items in chunks of ${chunkSize} with ${delayMs}ms delay`);
        const results = [];
        const chunkCount = Math.ceil(items.length / chunkSize);
        for (let i = 0; i < items.length; i += chunkSize) {
            const chunkIndex = Math.floor(i / chunkSize) + 1;
            const chunk = items.slice(i, i + chunkSize);
            this.logger.log(`${logPrefix}Processing chunk ${chunkIndex}/${chunkCount} (${chunk.length} items)`);
            const chunkPromises = chunk.map(item => asyncOperation(item));
            const chunkResults = await Promise.all(chunkPromises);
            results.push(...chunkResults);
            if (i + chunkSize < items.length && delayMs > 0) {
                await this.delay(delayMs);
            }
        }
        this.logger.log(`${logPrefix}Completed processing ${items.length} items`);
        return results;
    }
    static delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
exports.ConcurrencyUtils = ConcurrencyUtils;
ConcurrencyUtils.logger = new sdk_nestjs_common_1.OriginLogger(ConcurrencyUtils.name);
//# sourceMappingURL=concurrency.utils.js.map