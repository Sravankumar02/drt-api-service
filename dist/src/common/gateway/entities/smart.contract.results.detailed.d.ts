import { SmartContractResult } from "src/endpoints/sc-results/entities/smart.contract.result";
export declare class GatewaySmartContractResults extends SmartContractResult {
    constructor(init?: Partial<GatewaySmartContractResults>);
    tokens: string[];
    dcdtValues: string[];
    receivers: string[];
    receiversShardIDs: number[];
    operation: string;
}
