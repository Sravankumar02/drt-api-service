import { PoolService } from "./pool.service";
import { TransactionInPool } from "./entities/transaction.in.pool.dto";
import { TransactionType } from "../transactions/entities/transaction.type";
export declare class PoolController {
    private readonly poolService;
    constructor(poolService: PoolService);
    getTransactionPool(from: number, size: number, sender?: string, receiver?: string, senderShard?: number, receiverShard?: number, type?: TransactionType, functions?: string[]): Promise<TransactionInPool[]>;
    getTransactionPoolCount(sender?: string, receiver?: string, senderShard?: number, receiverShard?: number, type?: TransactionType): Promise<number>;
    getTransactionPoolCountAlternative(sender?: string, receiver?: string, type?: TransactionType): Promise<number>;
    getTransactionFromPool(txHash: string): Promise<TransactionInPool>;
}
