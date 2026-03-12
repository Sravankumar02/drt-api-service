/// <reference types="node" />
export declare function fundAddress(chainSimulatorUrl: string, address: string): Promise<void>;
export declare function getNonce(chainSimulatorUrl: string, address: string): Promise<number>;
export declare function deploySc(args: DeployScArgs): Promise<string>;
export declare function issueDcdt(args: IssueDcdtArgs): Promise<string>;
export declare function transferDcdt(args: TransferDcdtArgs): Promise<string>;
export declare function sendTransaction(args: SendTransactionArgs): Promise<string>;
export declare function issueMultipleDcdts(chainSimulatorUrl: string, issuer: string, numTokens: number): Promise<string[]>;
export declare class SendTransactionArgs {
    chainSimulatorUrl: string;
    sender: string;
    receiver: string;
    dataField: string;
    value?: string;
    gasLimit?: number;
    nonceOffset?: number;
    gasPrice?: string;
    constructor(options?: Partial<SendTransactionArgs>);
}
export declare class IssueDcdtArgs {
    chainSimulatorUrl: string;
    issuer: string;
    tokenName: string;
    tokenTicker: string;
    constructor(options?: Partial<IssueDcdtArgs>);
}
export declare class TransferDcdtArgs {
    chainSimulatorUrl: string;
    sender: string;
    receiver: string;
    tokenIdentifier: string;
    plainAmountOfTokens: number;
    constructor(options?: Partial<TransferDcdtArgs>);
}
export declare class DeployScArgs {
    chainSimulatorUrl: string;
    deployer: string;
    contractCodeRaw: Buffer;
    hexArguments: string[];
    constructor(options?: Partial<DeployScArgs>);
}
export declare function issueCollection(args: IssueNftArgs, type: 'NonFungible' | 'SemiFungible'): Promise<string>;
export declare function issueNftCollection(args: IssueNftArgs): Promise<string>;
export declare function issueSftCollection(args: IssueNftArgs): Promise<string>;
export declare function issueMultipleNftsCollections(chainSimulatorUrl: string, issuer: string, numCollections: number, numNfts: number, collectionType?: 'nft' | 'sft' | 'both'): Promise<string[]>;
export declare class IssueNftArgs {
    chainSimulatorUrl: string;
    issuer: string;
    tokenName: string;
    tokenTicker: string;
    constructor(options?: Partial<IssueNftArgs>);
}
export declare function issueMultipleMetaDCDTCollections(chainSimulatorUrl: string, issuer: string, numberOfCollections: number, tokensPerCollection: number): Promise<string[]>;
export declare function transferNft(args: TransferNftArgs): Promise<string>;
export declare class TransferNftArgs {
    chainSimulatorUrl: string;
    sender: string;
    receiver: string;
    collectionIdentifier: string;
    nonce: string | number;
    quantity: number;
    constructor(options?: Partial<TransferNftArgs>);
}
export declare function transferNftFromTo(chainSimulatorUrl: string, senderAddress: string, receiverAddress: string, collectionIdentifier: string, nftNonce: string | number, quantity?: number): Promise<string>;
export declare function transferRewa(chainSimulatorUrl: string, senderAddress: string, receiverAddress: string, amountInRewaNominated: number): Promise<string>;
