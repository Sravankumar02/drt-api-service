import { QueryPagination } from "src/common/entities/query.pagination";
import { GatewayService } from "src/common/gateway/gateway.service";
import { ApiConfigService } from "src/common/api-config/api.config.service";
import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { TransactionInPool } from "./entities/transaction.in.pool.dto";
import { PoolFilter } from "./entities/pool.filter";
import { ProtocolService } from "../../common/protocol/protocol.service";
import { TransactionActionService } from "../transactions/transaction-action/transaction.action.service";
export declare class PoolService {
    private readonly gatewayService;
    private readonly apiConfigService;
    private readonly cacheService;
    private readonly protocolService;
    private readonly transactionActionService;
    constructor(gatewayService: GatewayService, apiConfigService: ApiConfigService, cacheService: CacheService, protocolService: ProtocolService, transactionActionService: TransactionActionService);
    getTransactionFromPool(txHash: string): Promise<TransactionInPool | undefined>;
    getPoolCount(filter: PoolFilter): Promise<number>;
    getPool(queryPagination: QueryPagination, filter?: PoolFilter): Promise<TransactionInPool[]>;
    getPoolWithFilters(filter?: PoolFilter): Promise<TransactionInPool[]>;
    getTxPoolRaw(): Promise<TransactionInPool[]>;
    private parseTransactions;
    private processTransactionsWithType;
    private parseTransaction;
    private applyFilters;
    private poolTransactionToTransaction;
}
