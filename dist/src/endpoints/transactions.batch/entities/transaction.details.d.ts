export declare class TransactionDetails {
    chainID: string;
    data: string | undefined;
    gasLimit: number;
    gasPrice: number;
    nonce: number;
    receiver: string;
    sender: string;
    signature: string;
    value: string;
    version: number;
    options?: number;
    guardian?: string;
    guardianSignature?: string;
}
