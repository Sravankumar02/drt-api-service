"use strict";
var GithubService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("../api-config/api.config.service");
let GithubService = GithubService_1 = class GithubService {
    constructor(apiConfigService, apiService) {
        this.apiConfigService = apiConfigService;
        this.apiService = apiService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(GithubService_1.name);
    }
    async getUserInfo(username) {
        try {
            const profile = await this.get(`users/${username}`);
            if (!profile) {
                return undefined;
            }
            return {
                username,
                name: profile.name,
                avatar_url: profile.avatar_url,
                bio: profile.bio,
                location: profile.location,
                twitter_username: profile.twitter_username,
                blog: profile.blog,
            };
        }
        catch (error) {
            this.logger.error(`An unhandled error occurred when getting Github user info for username '${username}'`);
            this.logger.error(error);
            return undefined;
        }
    }
    async getRepoFileContents(username, repository, path) {
        const result = await this.get(`repos/${username}/${repository}/contents/${path}`);
        if (!result) {
            return undefined;
        }
        return sdk_nestjs_common_1.BinaryUtils.base64Decode(result.content);
    }
    async post(path, body, userToken) {
        const headers = this.getHeaders(userToken);
        const result = await this.apiService.post(`https://api.github.com/${path}`, body, { headers });
        return result === null || result === void 0 ? void 0 : result.data;
    }
    async get(path, userToken) {
        const headers = this.getHeaders(userToken);
        const result = await this.apiService.get(`https://api.github.com/${path}`, { headers }, async (error) => { var _a; return ((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === common_1.HttpStatus.NOT_FOUND; });
        return result === null || result === void 0 ? void 0 : result.data;
    }
    getHeaders(userToken) {
        const token = userToken !== null && userToken !== void 0 ? userToken : this.apiConfigService.getGithubToken();
        if (!token) {
            return {};
        }
        return {
            Authorization: `token ${token}`,
        };
    }
};
GithubService = GithubService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [api_config_service_1.ApiConfigService,
        sdk_nestjs_http_1.ApiService])
], GithubService);
exports.GithubService = GithubService;
//# sourceMappingURL=github.service.js.map