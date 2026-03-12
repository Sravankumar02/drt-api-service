import { TransactionType } from "src/endpoints/transactions/entities/transaction.type";
export declare class PoolFilter {
    constructor(init?: Partial<PoolFilter>);
    sender?: string;
    receiver?: string;
    senderShard?: number;
    receiverShard?: number;
    type?: TransactionType;
    functions?: string[];
}
