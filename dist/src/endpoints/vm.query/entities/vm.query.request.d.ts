export declare class VmQueryRequest {
    constructor(init?: Partial<VmQueryRequest>);
    scAddress: string;
    funcName: string;
    caller: string | undefined;
    args: string[];
    value: string | undefined;
}
