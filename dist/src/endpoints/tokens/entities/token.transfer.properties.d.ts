import { DcdtType } from "../../dcdt/entities/dcdt.type";
export declare class TokenTransferProperties {
    constructor(init?: Partial<TokenTransferProperties>);
    type: DcdtType;
    token?: string;
    collection?: string;
    identifier?: string;
    ticker: string;
    decimals?: number;
    name: string;
    svgUrl: string;
    valueUsd?: number;
    valueRewa?: number;
}
