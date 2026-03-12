"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeUtils = void 0;
class TimeUtils {
    static isTimestampInSeconds(input) {
        return input < TimeUtils.TIMESTAMP_IN_SECONDS_THRESHOLD;
    }
}
exports.TimeUtils = TimeUtils;
TimeUtils.TIMESTAMP_IN_SECONDS_THRESHOLD = 100000000000;
//# sourceMappingURL=time.utils.js.map