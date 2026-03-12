import { Request } from "express";
import { ApiService } from "@sravankumar02/sdk-nestjs-http";
import { ApiConfigService } from "src/common/api-config/api.config.service";
export declare class IndexProxyController {
    private readonly apiService;
    private readonly apiConfigService;
    constructor(apiService: ApiService, apiConfigService: ApiConfigService);
    forwardIndexSearchGet(collection: string, request: Request): Promise<any>;
    forwardIndexCountGet(collection: string, request: Request): Promise<any>;
    forwardIndexSearchPost(collection: string, body: any, request: Request): Promise<any>;
    forwardIndexCountPost(collection: string, body: any, request: Request): Promise<any>;
    private performIndexGetRequest;
    private performIndexPostRequest;
}
