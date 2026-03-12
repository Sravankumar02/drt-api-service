export declare class Economics {
    constructor(init?: Partial<Economics>);
    totalSupply: number;
    circulatingSupply: number;
    staked: number;
    price: number | undefined;
    marketCap: number | undefined;
    apr: number;
    topUpApr: number;
    baseApr: number;
    tokenMarketCap: number | undefined;
}
