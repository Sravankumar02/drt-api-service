import { TokenTransferProperties } from "src/endpoints/tokens/entities/token.transfer.properties";
export declare class TransactionMetadataTransfer {
    constructor(init?: Partial<TransactionMetadataTransfer>);
    properties?: TokenTransferProperties;
    value: BigInt;
}
