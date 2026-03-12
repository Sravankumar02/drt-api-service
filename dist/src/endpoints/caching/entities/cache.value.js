"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheValue = void 0;
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
class CacheValue {
    constructor() {
        this.ttl = sdk_nestjs_common_1.Constants.oneSecond() * 6;
    }
}
exports.CacheValue = CacheValue;
//# sourceMappingURL=cache.value.js.map