export declare class RoomKeyGenerator {
    static generate(prefix: string, data: Record<string, any>, dtoClass: Function): string[];
    private static collectActiveFilters;
    private static addTokenFilters;
    private static isValidFilterValue;
    private static buildRoomKeys;
    static deterministicStringify(obj: Record<string, any>): string;
    private static getKeys;
}
