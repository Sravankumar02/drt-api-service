import { SortOrder } from "src/common/entities/sort.order";
import { Transaction } from "../transactions/entities/transaction";
import { TransactionStatus } from "../transactions/entities/transaction.status";
import { TransferService } from "./transfer.service";
export declare class TransferController {
    private readonly transferService;
    constructor(transferService: TransferService);
    getAccountTransfers(from: number, size: number, receiver?: string[], sender?: string[], token?: string, functions?: string[], senderShard?: number, receiverShard?: number, miniBlockHash?: string, hashes?: string[], status?: TransactionStatus, before?: number, after?: number, round?: number, order?: SortOrder, fields?: string[], relayer?: string, isRelayed?: boolean, isScCall?: boolean, withScamInfo?: boolean, withUsername?: boolean, withBlockInfo?: boolean, withLogs?: boolean, withOperations?: boolean, withActionTransferValue?: boolean, withTxsOrder?: boolean, withRefunds?: boolean): Promise<Transaction[]>;
    getAccountTransfersCount(sender?: string[], receiver?: string[], token?: string, senderShard?: number, receiverShard?: number, miniBlockHash?: string, hashes?: string[], status?: TransactionStatus, functions?: string[], before?: number, after?: number, round?: number, relayer?: string, isRelayed?: boolean, isScCall?: boolean, withRefunds?: boolean): Promise<number>;
    getAccountTransfersCountAlternative(sender?: string[], receiver?: string[], token?: string, senderShard?: number, receiverShard?: number, miniBlockHash?: string, hashes?: string[], status?: TransactionStatus, functions?: string[], before?: number, after?: number, round?: number, relayer?: string, isRelayed?: boolean, isScCall?: boolean, withRefunds?: boolean): Promise<number>;
}
