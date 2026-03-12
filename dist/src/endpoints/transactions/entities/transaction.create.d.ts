export declare class TransactionCreate {
    constructor(init?: Partial<TransactionCreate>);
    chainId: string;
    data: string;
    gasLimit: number;
    gasPrice: number;
    nonce: number;
    receiver: string;
    receiverUsername: string | undefined;
    sender: string;
    senderUsername: string | undefined;
    signature: string;
    value: string;
    version: number;
    options?: number;
    guardian?: string;
    guardianSignature?: string;
    relayer?: string;
    relayerSignature?: string;
}
