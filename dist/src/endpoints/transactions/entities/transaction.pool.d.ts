export declare class TransactionPool {
    constructor(init?: Partial<TransactionPool>);
    txHash?: string;
    sender?: string;
    receiver?: string;
    value?: number;
    nonce?: number;
    data?: string;
    gasPrice?: number;
    gasLimit?: number;
}
