import { ApiConfigService } from "src/common/api-config/api.config.service";
import { WebsocketConfig } from "./entities/websocket.config";
export declare class WebsocketService {
    private readonly apiConfigService;
    constructor(apiConfigService: ApiConfigService);
    getConfiguration(): WebsocketConfig;
}
