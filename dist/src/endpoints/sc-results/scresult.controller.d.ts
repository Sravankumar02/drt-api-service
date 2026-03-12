import { SmartContractResult } from "./entities/smart.contract.result";
import { SmartContractResultService } from "./scresult.service";
export declare class SmartContractResultController {
    private readonly scResultService;
    constructor(scResultService: SmartContractResultService);
    getScResults(from: number, size: number, miniBlockHash?: string, originalTxHashes?: string[], sender?: string, receiver?: string, functions?: string[], withActionTransferValue?: boolean): Promise<SmartContractResult[]>;
    getScResultsCount(sender?: string, receiver?: string, functions?: string[]): Promise<number>;
    getScResult(scHash: string): Promise<SmartContractResult>;
}
