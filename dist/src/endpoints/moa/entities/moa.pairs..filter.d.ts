import { MoaPairExchange } from "./moa.pair.exchange";
export declare class MoaPairsFilter {
    constructor(init?: Partial<MoaPairsFilter>);
    exchange?: MoaPairExchange;
    includeFarms?: boolean;
}
