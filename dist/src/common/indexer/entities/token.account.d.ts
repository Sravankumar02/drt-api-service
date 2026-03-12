export interface TokenAccount {
    identifier: string;
    address: string;
    balance: string;
    balanceNum: number;
    token: string;
    timestamp: number;
    type: TokenType;
    data: any;
    nft_scamInfoType: string;
    nft_scamInfoDescription: string;
}
export declare enum TokenType {
    FungibleDCDT = "FungibleDCDT",
    NonFungibleDCDT = "NonFungibleDCDT",
    SemiFungibleDCDT = "SemiFungibleDCDT",
    MetaDCDT = "MetaDCDT"
}
