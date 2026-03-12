import { MoaSettings } from './moa.settings';
export declare class MoaEconomics {
    constructor(init?: Partial<MoaEconomics>);
    totalSupply: number;
    circulatingSupply: number;
    price: number;
    marketCap: number;
    volume24h: number;
    marketPairs: number;
    static fromQueryResponse(response: any, settings: MoaSettings): MoaEconomics;
}
