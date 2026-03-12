import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GatewayService } from "src/common/gateway/gateway.service";
import { ProtocolService } from "src/common/protocol/protocol.service";
import { SettingsService } from "src/common/settings/settings.service";
export declare class VmQueryService {
    private readonly cachingService;
    private readonly gatewayService;
    private readonly protocolService;
    private readonly eventEmitter;
    private readonly settingsService;
    private readonly logger;
    constructor(cachingService: CacheService, gatewayService: GatewayService, protocolService: ProtocolService, eventEmitter: EventEmitter2, settingsService: SettingsService);
    private computeTtls;
    vmQueryFullResult(contract: string, func: string, caller: string | undefined, args: string[] | undefined, value: string | undefined, timestamp: number | undefined): Promise<any>;
    vmQuery(contract: string, func: string, caller?: string | undefined, args?: string[], value?: string | undefined, skipCache?: boolean): Promise<string[]>;
    vmQueryRaw(contract: string, func: string, caller: string | undefined, args?: string[], value?: string | undefined): Promise<any>;
}
