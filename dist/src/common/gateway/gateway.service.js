"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayService = void 0;
const tslib_1 = require("tslib");
const gateway_component_request_1 = require("./entities/gateway.component.request");
const metrics_events_constants_1 = require("../../utils/metrics-events.constants");
const log_performance_decorator_1 = require("../../utils/log.performance.decorator");
const trie_statistics_1 = require("./entities/trie.statistics");
const nft_data_1 = require("./entities/nft.data");
const token_data_1 = require("./entities/token.data");
const common_1 = require("@nestjs/common");
const api_config_service_1 = require("../api-config/api.config.service");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
let GatewayService = class GatewayService {
    constructor(apiConfigService, apiService) {
        this.apiConfigService = apiConfigService;
        this.apiService = apiService;
        this.snapshotlessRequestsSet = new Set([
            gateway_component_request_1.GatewayComponentRequest.addressBalance,
            gateway_component_request_1.GatewayComponentRequest.addressDetails,
            gateway_component_request_1.GatewayComponentRequest.addressDcdt,
            gateway_component_request_1.GatewayComponentRequest.addressNftByNonce,
            gateway_component_request_1.GatewayComponentRequest.vmQuery,
            gateway_component_request_1.GatewayComponentRequest.transactionPool,
            gateway_component_request_1.GatewayComponentRequest.guardianData,
            gateway_component_request_1.GatewayComponentRequest.validatorAuction,
        ]);
        this.deepHistoryRequestsSet = new Set([
            gateway_component_request_1.GatewayComponentRequest.addressDetails,
            gateway_component_request_1.GatewayComponentRequest.addressDcdt,
            gateway_component_request_1.GatewayComponentRequest.addressDcdtBalance,
            gateway_component_request_1.GatewayComponentRequest.addressNftByNonce,
            gateway_component_request_1.GatewayComponentRequest.vmQuery,
        ]);
    }
    async getVersion() {
        const result = await this.get('about', gateway_component_request_1.GatewayComponentRequest.about);
        if (result && result.appVersion && result.appVersion !== "undefined") {
            return result.appVersion;
        }
        return undefined;
    }
    async getValidatorAuctions() {
        const result = await this.get('validator/auction', gateway_component_request_1.GatewayComponentRequest.validatorAuction);
        return result.auctionList;
    }
    async getNetworkStatus(shardId) {
        const result = await this.get(`network/status/${shardId}`, gateway_component_request_1.GatewayComponentRequest.networkStatus);
        return result.status;
    }
    async getNetworkConfig() {
        const result = await this.get('network/config', gateway_component_request_1.GatewayComponentRequest.networkConfig);
        return result.config;
    }
    async getNetworkEconomics() {
        const result = await this.get('network/economics', gateway_component_request_1.GatewayComponentRequest.networkEconomics);
        return result.metrics;
    }
    async getNodeHeartbeatStatus() {
        const result = await this.get('node/heartbeatstatus', gateway_component_request_1.GatewayComponentRequest.nodeHeartbeat);
        return result.heartbeats;
    }
    async getTrieStatistics(shardId) {
        const result = await this.get(`network/trie-statistics/${shardId}`, gateway_component_request_1.GatewayComponentRequest.trieStatistics);
        return new trie_statistics_1.TrieStatistics({
            accounts_snapshot_num_nodes: result['accounts-snapshot-num-nodes'],
        });
    }
    async getAddressDetails(address) {
        const result = await this.get(`address/${address}`, gateway_component_request_1.GatewayComponentRequest.addressDetails);
        return result;
    }
    async getAccountsBulk(addresses) {
        const result = await this.create('address/bulk', gateway_component_request_1.GatewayComponentRequest.addressesBulk, addresses);
        return result.accounts;
    }
    async getDcdtSupply(identifier) {
        const result = await this.get(`network/dcdt/supply/${identifier}`, gateway_component_request_1.GatewayComponentRequest.dcdtSupply);
        return result;
    }
    async getDcdtFungibleTokens() {
        const result = await this.get('network/dcdt/fungible-tokens', gateway_component_request_1.GatewayComponentRequest.allFungibleTokens);
        return result.tokens;
    }
    async getAddressDcdtRoles(address) {
        const result = await this.get(`address/${address}/dcdts/roles`, gateway_component_request_1.GatewayComponentRequest.addressDcdtAllRoles);
        return result;
    }
    async getGuardianData(address) {
        const result = await this.get(`address/${address}/guardian-data`, gateway_component_request_1.GatewayComponentRequest.guardianData);
        return result;
    }
    async getNodeWaitingEpochsLeft(bls) {
        const result = await this.get(`node/waiting-epochs-left/${bls}`, gateway_component_request_1.GatewayComponentRequest.getNodeWaitingEpochsLeft);
        return result.epochsLeft;
    }
    async getTransactionProcessStatus(txHash) {
        const result = await this.get(`transaction/${txHash}/process-status`, gateway_component_request_1.GatewayComponentRequest.transactionProcessStatus, async (error) => {
            var _a, _b;
            const errorMessage = (_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error;
            if (errorMessage && errorMessage.includes('transaction not found')) {
                return true;
            }
            return false;
        });
        return result;
    }
    async getAddressDcdt(address, identifier) {
        const result = await this.get(`address/${address}/dcdt/${identifier}`, gateway_component_request_1.GatewayComponentRequest.addressDcdtBalance, async (error) => {
            var _a, _b;
            const errorMessage = (_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error;
            if (errorMessage && errorMessage.includes('account was not found')) {
                return true;
            }
            return false;
        });
        return new token_data_1.TokenData(result.tokenData);
    }
    async getAddressNft(address, identifier) {
        const dcdtIdentifier = identifier.split('-').slice(0, 2).join('-');
        const nonceHex = identifier.split('-').last();
        const nonceNumeric = sdk_nestjs_common_1.BinaryUtils.hexToNumber(nonceHex);
        const result = await this.get(`address/${address}/nft/${dcdtIdentifier}/nonce/${nonceNumeric}`, gateway_component_request_1.GatewayComponentRequest.addressNftByNonce, async (error) => {
            var _a, _b;
            const errorMessage = (_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error;
            if (errorMessage && errorMessage.includes('account was not found')) {
                return true;
            }
            return false;
        });
        return new nft_data_1.NftData(result.tokenData);
    }
    async getTransactionPool() {
        return await this.get(`transaction/pool?fields=*`, gateway_component_request_1.GatewayComponentRequest.transactionPool);
    }
    async getTransaction(txHash) {
        const result = await this.get(`transaction/${txHash}?withResults=true`, gateway_component_request_1.GatewayComponentRequest.transactionDetails, async (error) => {
            if (error.response.data.error === 'transaction not found') {
                return true;
            }
            return false;
        });
        return result === null || result === void 0 ? void 0 : result.transaction;
    }
    async getBlockByShardAndNonce(shard, nonce, withTxs) {
        const result = await this.get(`block/${shard}/by-nonce/${nonce}?withTxs=${withTxs !== null && withTxs !== void 0 ? withTxs : false}`, gateway_component_request_1.GatewayComponentRequest.blockByNonce);
        return result.block;
    }
    async get(url, component, errorHandler) {
        var _a;
        const result = await this.getRaw(url, component, errorHandler);
        this.applyDeepHistoryBlockInfoIfRequired(component, result);
        return (_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.data;
    }
    async getRaw(url, component, errorHandler) {
        const fullUrl = this.getFullUrl(component, url);
        return await this.apiService.get(fullUrl, new sdk_nestjs_http_1.ApiSettings(), errorHandler);
    }
    async create(url, component, data, errorHandler) {
        var _a;
        const result = await this.createRaw(url, component, data, errorHandler);
        this.applyDeepHistoryBlockInfoIfRequired(component, result);
        return (_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.data;
    }
    async createRaw(url, component, data, errorHandler) {
        const fullUrl = this.getFullUrl(component, url);
        return await this.apiService.post(fullUrl, data, new sdk_nestjs_http_1.ApiSettings(), errorHandler);
    }
    getFullUrl(component, suffix) {
        const url = new URL(`${this.getGatewayUrl(component)}/${suffix}`);
        const context = sdk_nestjs_common_1.ContextTracker.get();
        if (context && context.deepHistoryBlockNonce && this.deepHistoryRequestsSet.has(component)) {
            url.searchParams.set('blockNonce', context.deepHistoryBlockNonce);
        }
        return url.href;
    }
    getGatewayUrl(component) {
        var _a;
        const context = sdk_nestjs_common_1.ContextTracker.get();
        if (context && context.deepHistoryBlockNonce && this.deepHistoryRequestsSet.has(component)) {
            return this.apiConfigService.getDeepHistoryGatewayUrl();
        }
        if (this.snapshotlessRequestsSet.has(component)) {
            return (_a = this.apiConfigService.getSnapshotlessGatewayUrl()) !== null && _a !== void 0 ? _a : this.apiConfigService.getGatewayUrl();
        }
        return this.apiConfigService.getGatewayUrl();
    }
    applyDeepHistoryBlockInfoIfRequired(component, result) {
        var _a, _b;
        const context = sdk_nestjs_common_1.ContextTracker.get();
        if (context && context.deepHistoryBlockNonce && this.deepHistoryRequestsSet.has(component)) {
            const blockInfo = (_b = (_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.blockInfo;
            if (blockInfo) {
                sdk_nestjs_common_1.ContextTracker.assign({
                    deepHistoryBlockInfo: blockInfo,
                });
            }
        }
    }
};
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetGatewayDuration, { argIndex: 1 }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayService.prototype, "get", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetGatewayDuration, { argIndex: 1 }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayService.prototype, "getRaw", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetGatewayDuration, { argIndex: 1 }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayService.prototype, "create", null);
tslib_1.__decorate([
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetGatewayDuration, { argIndex: 1 }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, Object, Function]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayService.prototype, "createRaw", null);
GatewayService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => sdk_nestjs_http_1.ApiService))),
    tslib_1.__metadata("design:paramtypes", [api_config_service_1.ApiConfigService,
        sdk_nestjs_http_1.ApiService])
], GatewayService);
exports.GatewayService = GatewayService;
//# sourceMappingURL=gateway.service.js.map