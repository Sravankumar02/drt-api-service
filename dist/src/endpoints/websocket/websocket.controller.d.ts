import { WebsocketConfig } from "./entities/websocket.config";
import { WebsocketService } from "./websocket.service";
export declare class WebsocketController {
    private readonly websocketConfigService;
    constructor(websocketConfigService: WebsocketService);
    getConfiguration(): WebsocketConfig;
}
