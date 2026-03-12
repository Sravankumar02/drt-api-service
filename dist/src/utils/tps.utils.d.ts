import { TpsFrequency } from "src/endpoints/tps/entities/tps.frequency";
import { TpsInterval } from "src/endpoints/tps/entities/tps.interval";
export declare class TpsUtils {
    static getTimestampByFrequency(timestamp: number, frequency: number): number;
    static Frequencies: number[];
    static getFrequencyByEnum(frequency: TpsFrequency): number;
    static getFrequencyByInterval(interval: TpsInterval): number;
    static getIntervalByEnum(interval: TpsInterval): number;
}
