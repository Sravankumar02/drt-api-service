export declare class TransactionSendResult {
    constructor(init?: Partial<TransactionSendResult>);
    receiver: string;
    receiverShard: number;
    sender: string;
    senderShard: number;
    status: string;
    txHash: string;
}
