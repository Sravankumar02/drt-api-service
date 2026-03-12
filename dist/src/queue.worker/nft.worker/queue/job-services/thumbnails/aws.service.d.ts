/// <reference types="node" />
import { ApiConfigService } from "src/common/api-config/api.config.service";
export declare class AWSService {
    private readonly apiConfigService;
    constructor(apiConfigService: ApiConfigService);
    uploadToS3(path: string, buffer: Buffer, type: string): Promise<string>;
    getItemPath(path: string): string;
}
