import { ApiService } from "@sravankumar02/sdk-nestjs-http";
import { ApiConfigService } from "../api-config/api.config.service";
import { GithubUserInfo } from "./entities/github.user.info";
export declare class GithubService {
    private readonly apiConfigService;
    protected readonly apiService: ApiService;
    private readonly logger;
    constructor(apiConfigService: ApiConfigService, apiService: ApiService);
    getUserInfo(username: string): Promise<GithubUserInfo | undefined>;
    getRepoFileContents(username: string, repository: string, path: string): Promise<string | undefined>;
    protected post(path: string, body: any, userToken?: string): Promise<any>;
    protected get(path: string, userToken?: string): Promise<any>;
    protected getHeaders(userToken?: string): Record<string, string>;
}
