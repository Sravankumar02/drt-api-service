export declare class TransactionQueryOptions {
    private static readonly SCAM_INFO_MAX_SIZE;
    private static readonly USERNAME_MAX_SIZE;
    private static readonly ACTION_TRANSFER_VALUE_MAX_SIZE;
    constructor(init?: Partial<TransactionQueryOptions>);
    withScResults?: boolean;
    withOperations?: boolean;
    withLogs?: boolean;
    withScResultLogs?: boolean;
    withScamInfo?: boolean;
    withUsername?: boolean;
    withBlockInfo?: boolean;
    withActionTransferValue?: boolean;
    withTxsOrder?: boolean;
    static applyDefaultOptions(size: number, options: TransactionQueryOptions): TransactionQueryOptions;
}
