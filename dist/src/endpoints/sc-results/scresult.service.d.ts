import { AssetsService } from "src/common/assets/assets.service";
import { QueryPagination } from "src/common/entities/query.pagination";
import { IndexerService } from "src/common/indexer/indexer.service";
import { TransactionActionService } from "../transactions/transaction-action/transaction.action.service";
import { SmartContractResult } from "./entities/smart.contract.result";
import { SmartContractResultFilter } from "./entities/smart.contract.result.filter";
import { SmartContractResultOptions } from "./entities/smart.contract.result.options";
export declare class SmartContractResultService {
    private readonly indexerService;
    private readonly transactionActionService;
    private readonly assetsService;
    private readonly logger;
    constructor(indexerService: IndexerService, transactionActionService: TransactionActionService, assetsService: AssetsService);
    getScResults(pagination: QueryPagination, filter: SmartContractResultFilter, options: SmartContractResultOptions): Promise<SmartContractResult[]>;
    getScResult(scHash: string): Promise<SmartContractResult | undefined>;
    getScResultsCount(filter: SmartContractResultFilter): Promise<number>;
    getAccountScResults(address: string, pagination: QueryPagination): Promise<SmartContractResult[]>;
    getAccountScResultsCount(address: string): Promise<number>;
}
