import { ApiConfigService } from "./api.config.service";
import { DrtnestConfigService } from "@sravankumar02/sdk-nestjs-common";
export declare class DrtnestConfigServiceImpl implements DrtnestConfigService {
    private readonly apiConfigService;
    constructor(apiConfigService: ApiConfigService);
    getSecurityAdmins(): string[];
    getJwtSecret(): string;
    getApiUrl(): string;
    getNativeAuthMaxExpirySeconds(): number;
    getNativeAuthAcceptedOrigins(): string[];
}
