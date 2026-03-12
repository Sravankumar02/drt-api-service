"use strict";
var GraphQlService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQlService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("../api-config/api.config.service");
const graphql_request_1 = require("graphql-request");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
let GraphQlService = GraphQlService_1 = class GraphQlService {
    constructor(apiConfigService) {
        this.apiConfigService = apiConfigService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(GraphQlService_1.name);
    }
    async getExchangeServiceData(query, variables) {
        const exchangeServiceUrl = this.apiConfigService.getExchangeServiceUrlMandatory();
        const graphqlClient = new graphql_request_1.GraphQLClient(exchangeServiceUrl, {
            fetch: this.createFetchWithTimeout(60000),
            headers: {
                'origin': this.apiConfigService.getSelfUrl(),
            },
        });
        try {
            const data = variables
                ? await graphqlClient.request(query, variables)
                : await graphqlClient.request(query);
            if (!data) {
                return null;
            }
            return data;
        }
        catch (error) {
            this.logger.log(`Unexpected error when running graphql query`);
            this.logger.error(error);
            return null;
        }
    }
    async getNftServiceData(query, variables) {
        const nftMarketplaceUrl = this.apiConfigService.getMarketplaceServiceUrl();
        const graphqlClient = new graphql_request_1.GraphQLClient(nftMarketplaceUrl, {
            fetch: this.createFetchWithTimeout(600000),
        });
        try {
            const data = await graphqlClient.request(query, variables);
            if (!data) {
                return null;
            }
            return data;
        }
        catch (error) {
            this.logger.log(`Unexpected error when running graphql query`);
            this.logger.error(error);
            return null;
        }
    }
    createFetchWithTimeout(timeout) {
        return (url, init) => {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), timeout);
            const initWithSignal = Object.assign(Object.assign({}, init), { signal: controller.signal });
            return (0, node_fetch_1.default)(url, initWithSignal).finally(() => clearTimeout(id));
        };
    }
};
GraphQlService = GraphQlService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [api_config_service_1.ApiConfigService])
], GraphQlService);
exports.GraphQlService = GraphQlService;
//# sourceMappingURL=graphql.service.js.map