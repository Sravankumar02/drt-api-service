export declare class ScamInfo {
    constructor(init?: Partial<ScamInfo>);
    type?: string | null;
    info?: string | null;
    static isScam(scamInfo: ScamInfo): boolean;
    static none(): ScamInfo;
}
