import { Token } from "./token";
import { MoaPairType } from "src/endpoints/moa/entities/moa.pair.type";
export declare class TokenWithBalance extends Token {
    constructor(init?: Partial<TokenWithBalance>);
    balance: string;
    valueUsd: number | undefined;
    attributes: string | undefined;
    moaPairType: MoaPairType;
}
