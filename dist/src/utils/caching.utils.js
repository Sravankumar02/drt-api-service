"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachingUtils = void 0;
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
class CachingUtils {
    static async executeOptimistic(param) {
        const logger = new sdk_nestjs_common_1.OriginLogger(CachingUtils.name);
        const cacheValue = await param.cachingService.getRemote(param.key);
        if (cacheValue) {
            logger.log(`Skipped ${param.description}`);
            return undefined;
        }
        logger.log(`Started ${param.description}`);
        await param.cachingService.setRemote(param.key, true, param.ttl);
        const result = await param.action();
        logger.log(`Finished ${param.description}`);
        await param.cachingService.deleteInCache(param.key);
        return result;
    }
}
exports.CachingUtils = CachingUtils;
//# sourceMappingURL=caching.utils.js.map