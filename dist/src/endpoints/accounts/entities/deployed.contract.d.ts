import { AccountAssets } from "src/common/assets/entities/account.assets";
export declare class DeployedContract {
    constructor(init?: Partial<DeployedContract>);
    address: string;
    deployTxHash: string;
    timestamp: number;
    assets: AccountAssets | undefined;
}
