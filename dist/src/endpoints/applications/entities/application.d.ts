import { AccountAssets } from '../../../common/assets/entities/account.assets';
export declare class Application {
    constructor(init?: Partial<Application>);
    contract: string;
    deployer: string;
    owner: string;
    codeHash: string;
    timestamp: number;
    assets: AccountAssets | undefined;
    balance: string;
    txCount?: number;
}
