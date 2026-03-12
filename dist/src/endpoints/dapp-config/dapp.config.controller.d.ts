import { DappConfig } from './entities/dapp-config';
import { DappConfigService } from "./dapp.config.service";
export declare class DappConfigController {
    private readonly dappConfigService;
    constructor(dappConfigService: DappConfigService);
    getDappConfiguration(): Promise<DappConfig | undefined>;
}
