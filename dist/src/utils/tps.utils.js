"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TpsUtils = void 0;
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const tps_frequency_1 = require("../endpoints/tps/entities/tps.frequency");
const tps_interval_1 = require("../endpoints/tps/entities/tps.interval");
class TpsUtils {
    static getTimestampByFrequency(timestamp, frequency) {
        return Math.floor(timestamp / frequency) * frequency;
    }
    static getFrequencyByEnum(frequency) {
        switch (frequency) {
            case tps_frequency_1.TpsFrequency._5s:
                return 5;
            case tps_frequency_1.TpsFrequency._30s:
                return 30;
            case tps_frequency_1.TpsFrequency._10m:
                return 600;
            default:
                throw new Error('Invalid frequency');
        }
    }
    static getFrequencyByInterval(interval) {
        switch (interval) {
            case tps_interval_1.TpsInterval._10m:
                return 5;
            case tps_interval_1.TpsInterval._1h:
                return 30;
            case tps_interval_1.TpsInterval._1d:
                return 600;
            default:
                throw new Error('Invalid interval');
        }
    }
    static getIntervalByEnum(interval) {
        switch (interval) {
            case tps_interval_1.TpsInterval._10m:
                return sdk_nestjs_common_1.Constants.oneMinute() * 10;
            case tps_interval_1.TpsInterval._1h:
                return sdk_nestjs_common_1.Constants.oneHour();
            case tps_interval_1.TpsInterval._1d:
                return sdk_nestjs_common_1.Constants.oneDay();
            default:
                throw new Error('Invalid interval');
        }
    }
}
exports.TpsUtils = TpsUtils;
TpsUtils.Frequencies = [5, 30, 600];
//# sourceMappingURL=tps.utils.js.map