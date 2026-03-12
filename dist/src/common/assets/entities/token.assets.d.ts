import { TokenAssetStatus } from "../../../endpoints/tokens/entities/token.asset.status";
import { NftRankAlgorithm } from "./nft.rank.algorithm";
import { TokenAssetsPriceSource } from "./token.assets.price.source";
export declare class TokenAssets {
    constructor(init?: Partial<TokenAssets>);
    website: string;
    description: string;
    status: TokenAssetStatus;
    pngUrl: string;
    name: string;
    svgUrl: string;
    ledgerSignature: string | undefined;
    lockedAccounts: Record<string, string> | undefined;
    extraTokens: string[] | undefined;
    preferredRankAlgorithm: NftRankAlgorithm | undefined;
    priceSource: TokenAssetsPriceSource | undefined;
}
