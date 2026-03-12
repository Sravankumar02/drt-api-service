export declare class MoaToken {
    constructor(init?: Partial<MoaToken>);
    id: string;
    symbol: string;
    name: string;
    price: number;
    previous24hPrice: number;
    previous24hVolume: number | undefined;
    tradesCount: number | undefined;
}
