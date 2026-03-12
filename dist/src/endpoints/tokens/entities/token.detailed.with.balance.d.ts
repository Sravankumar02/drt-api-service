import { TokenDetailed } from "./token.detailed";
export declare class TokenDetailedWithBalance extends TokenDetailed {
    constructor(init?: Partial<TokenDetailedWithBalance>);
    balance: string;
    valueUsd: number | undefined;
    attributes: string | undefined;
}
