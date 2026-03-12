import { ApiConfigService } from "src/common/api-config/api.config.service";
import { DappConfig } from "./entities/dapp-config";
import { GatewayService } from "src/common/gateway/gateway.service";
export declare class DappConfigService {
    private readonly apiConfigService;
    private readonly gatewayService;
    private readonly dappConfig;
    constructor(apiConfigService: ApiConfigService, gatewayService: GatewayService);
    getDappConfiguration(): Promise<DappConfig | undefined>;
    getDappConfigurationRaw(): DappConfig | undefined;
}
