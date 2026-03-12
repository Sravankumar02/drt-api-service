import { QueryPagination } from "src/common/entities/query.pagination";
import { TransactionFilter } from "../transactions/entities/transaction.filter";
import { Transaction } from "../transactions/entities/transaction";
import { TransactionService } from "../transactions/transaction.service";
import { IndexerService } from "src/common/indexer/indexer.service";
import { TransactionQueryOptions } from "../transactions/entities/transactions.query.options";
export declare class TransferService {
    private readonly indexerService;
    private readonly transactionService;
    private readonly logger;
    constructor(indexerService: IndexerService, transactionService: TransactionService);
    private sortElasticTransfers;
    private sortElasticTransfersByTxsOrder;
    getTransfers(filter: TransactionFilter, pagination: QueryPagination, queryOptions: TransactionQueryOptions, fields?: string[]): Promise<Transaction[]>;
    getTransfersCount(filter: TransactionFilter): Promise<number>;
}
