import { TransactionType } from "src/endpoints/transactions/entities/transaction.type";
export declare class TransactionInPool {
    constructor(init?: Partial<TransactionInPool>);
    txHash: string;
    sender: string;
    receiver: string;
    receiverUsername: string;
    guardian: string;
    guardianSignature: string;
    nonce: number;
    value: string;
    data: string;
    gasPrice: number;
    gasLimit: number;
    senderShard: number;
    receiverShard: number;
    signature: string;
    function: string;
    type: TransactionType;
}
