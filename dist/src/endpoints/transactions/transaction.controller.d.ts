import { QueryConditionOptions } from '@sravankumar02/sdk-nestjs-elastic';
import { SortOrder } from 'src/common/entities/sort.order';
import { TransactionDecodeDto } from './entities/dtos/transaction.decode.dto';
import { Transaction } from './entities/transaction';
import { TransactionCreate } from './entities/transaction.create';
import { TransactionDetailed } from './entities/transaction.detailed';
import { TransactionSendResult } from './entities/transaction.send.result';
import { TransactionStatus } from './entities/transaction.status';
import { TransactionService } from './transaction.service';
import { PpuMetadata } from './entities/ppu.metadata';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    getTransactions(from: number, size: number, sender?: string, receiver?: string[], relayer?: string, token?: string, senderShard?: number, receiverShard?: number, miniBlockHash?: string, hashes?: string[], status?: TransactionStatus, functions?: string[], condition?: QueryConditionOptions, before?: number, after?: number, round?: number, order?: SortOrder, fields?: string[], withScResults?: boolean, withOperations?: boolean, withLogs?: boolean, withScamInfo?: boolean, withUsername?: boolean, withBlockInfo?: boolean, isRelayed?: boolean, isScCall?: boolean, withActionTransferValue?: boolean, withRelayedScresults?: boolean): Promise<Transaction[]>;
    getTransactionCount(sender?: string, receiver?: string[], token?: string, senderShard?: number, receiverShard?: number, miniBlockHash?: string, hashes?: string[], status?: TransactionStatus, functions?: string[], condition?: QueryConditionOptions, before?: number, after?: number, round?: number, relayer?: string, isRelayed?: boolean, isScCall?: boolean, withRelayedScresults?: boolean): Promise<number>;
    getTransactionCountAlternative(sender?: string, receiver?: string[], token?: string, senderShard?: number, receiverShard?: number, miniBlockHash?: string, hashes?: string[], status?: TransactionStatus, functions?: string[], condition?: QueryConditionOptions, before?: number, after?: number, round?: number, relayer?: string, isRelayed?: boolean, isScCall?: boolean, withRelayedScresults?: boolean): Promise<number>;
    getTransaction(txHash: string, fields?: string[], withActionTransferValue?: boolean): Promise<TransactionDetailed>;
    createTransaction(transaction: TransactionCreate): Promise<TransactionSendResult>;
    decodeTransaction(transaction: TransactionDecodeDto): Promise<TransactionDecodeDto>;
    getPpuByShardId(shardId: number): Promise<PpuMetadata>;
}
