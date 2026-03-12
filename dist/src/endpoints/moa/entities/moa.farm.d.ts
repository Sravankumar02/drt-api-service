import { MoaFarmType } from "./moa.farm.type";
import { MoaToken } from "./moa.token";
export declare class MoaFarm {
    constructor(init?: Partial<MoaFarm>);
    type: MoaFarmType;
    version?: string;
    address: string;
    id: string;
    symbol: string;
    name: string;
    price: number;
    farmingId: string;
    farmingSymbol: string;
    farmingName: string;
    farmingPrice: number;
    farmedId: string;
    farmedSymbol: string;
    farmedName: string;
    farmedPrice: number;
    static fromFarmQueryResponse(response: any): MoaFarm;
    static fromStakingFarmResponse(response: any, pairs: Record<string, MoaToken>): MoaFarm;
}
