import { TransactionMetadataTransfer } from "./transaction.metadata.transfer";
export declare class TransactionMetadata {
    constructor(init?: Partial<TransactionMetadata>);
    sender: string;
    receiver: string;
    value: BigInt;
    functionName?: string;
    functionArgs: string[];
    timestamp: number;
    transfers?: TransactionMetadataTransfer[];
}
