"use strict";
var GatewayProxyController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GatewayProxyController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const vm_query_request_1 = require("../vm.query/entities/vm.query.request");
const vm_query_service_1 = require("../vm.query/vm.query.service");
const gateway_service_1 = require("../../common/gateway/gateway.service");
const gateway_component_request_1 = require("../../common/gateway/entities/gateway.component.request");
const plugin_service_1 = require("../../common/plugins/plugin.service");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const sdk_nestjs_common_2 = require("@sravankumar02/sdk-nestjs-common");
const deep_history_interceptor_1 = require("../../interceptors/deep-history.interceptor");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
let GatewayProxyController = GatewayProxyController_1 = class GatewayProxyController {
    constructor(gatewayService, vmQueryService, cachingService, pluginService) {
        this.gatewayService = gatewayService;
        this.vmQueryService = vmQueryService;
        this.cachingService = cachingService;
        this.pluginService = pluginService;
        this.logger = new sdk_nestjs_common_2.OriginLogger(GatewayProxyController_1.name);
    }
    async getAddress(address) {
        return await this.gatewayGet(`address/${address}`, gateway_component_request_1.GatewayComponentRequest.addressDetails);
    }
    async getAddressBalance(address) {
        return await this.gatewayGet(`address/${address}/balance`, gateway_component_request_1.GatewayComponentRequest.addressBalance);
    }
    async getAddressNonce(address) {
        return await this.gatewayGet(`address/${address}/nonce`, gateway_component_request_1.GatewayComponentRequest.addressNonce);
    }
    async getAddressShard(address) {
        return await this.gatewayGet(`address/${address}/shard`, gateway_component_request_1.GatewayComponentRequest.addressShard);
    }
    async getAddressKeys(address) {
        var _a;
        try {
            return await this.gatewayGet(`address/${address}/keys`, gateway_component_request_1.GatewayComponentRequest.addressKeys);
        }
        catch (error) {
            this.logger.error(`Error fetching address keys for address ${address}: ${error.message}`);
            throw new common_1.BadRequestException(((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || 'An error occurred while fetching address keys');
        }
    }
    async getAddressStorageKey(address, key) {
        return await this.gatewayGet(`address/${address}/key/${key}`, gateway_component_request_1.GatewayComponentRequest.addressStorage, undefined, async (error) => {
            var _a, _b, _c;
            if ((_c = (_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.includes('get value for key error')) {
                throw error;
            }
            return false;
        });
    }
    async getAddressTransactions(address) {
        return await this.gatewayGet(`address/${address}/transactions`, gateway_component_request_1.GatewayComponentRequest.addressTransactions);
    }
    async getAddressGuardianData(address) {
        return await this.gatewayGet(`address/${address}/guardian-data`, gateway_component_request_1.GatewayComponentRequest.guardianData);
    }
    async getAddressDcdt(address) {
        return await this.gatewayGet(`address/${address}/dcdt`, gateway_component_request_1.GatewayComponentRequest.addressDetails, undefined, async (error) => {
            var _a, _b;
            const message = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error;
            if (message && message.includes('account was not found')) {
                throw error;
            }
            return false;
        });
    }
    async transactionSend(body) {
        if (!body.sender) {
            throw new common_1.BadRequestException('Sender must be provided');
        }
        if (!body.receiver) {
            throw new common_1.BadRequestException('Receiver must be provided');
        }
        const pluginTransaction = await this.pluginService.processTransactionSend(body);
        if (pluginTransaction) {
            return pluginTransaction;
        }
        return await this.gatewayPost('transaction/send', gateway_component_request_1.GatewayComponentRequest.sendTransaction, body, async (error) => {
            var _a, _b;
            const message = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error;
            if (message && message.includes('transaction generation failed')) {
                throw error;
            }
            return false;
        });
    }
    async transactionSimulate(checkSignature, body) {
        let url = 'transaction/simulate';
        if (checkSignature !== undefined) {
            url += `?checkSignature=${checkSignature}`;
        }
        return await this.gatewayPost(url, gateway_component_request_1.GatewayComponentRequest.simulateTransaction, body);
    }
    async transactionSendMultiple(body) {
        return await this.gatewayPost('transaction/send-multiple', gateway_component_request_1.GatewayComponentRequest.sendTransactionMultiple, body);
    }
    async transactionSendUserFunds(body) {
        return await this.gatewayPost('transaction/send-user-funds', gateway_component_request_1.GatewayComponentRequest.sendUserFunds, body);
    }
    async transactionCost(body) {
        return await this.gatewayPost('transaction/cost', gateway_component_request_1.GatewayComponentRequest.transactionCost, body);
    }
    async getTransactionPool(request) {
        const url = request.url.replace(/^\//, '');
        return await this.gatewayGet(url, gateway_component_request_1.GatewayComponentRequest.transactionPool);
    }
    async getTransaction(hash, sender, withResults) {
        return await this.gatewayGet(`transaction/${hash}`, gateway_component_request_1.GatewayComponentRequest.transactionDetails, { sender, withResults });
    }
    async getTransactionProcessStatus(hash) {
        return await this.gatewayGet(`transaction/${hash}/process-status`, gateway_component_request_1.GatewayComponentRequest.transactionProcessStatus);
    }
    async getTransactionStatus(hash, sender) {
        return await this.gatewayGet(`transaction/${hash}/status`, gateway_component_request_1.GatewayComponentRequest.transactionDetails, { sender }, async (error) => {
            var _a, _b;
            const message = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error;
            if (message === 'transaction not found') {
                throw error;
            }
            return false;
        });
    }
    async vmValuesHex(body) {
        return await this.gatewayPost('vm-values/hex', gateway_component_request_1.GatewayComponentRequest.vmQuery, body, async (error) => {
            var _a, _b;
            const message = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error;
            if (message && message.includes('doGetVMValue: no return data')) {
                throw error;
            }
            return false;
        });
    }
    async vmValuesString(body) {
        return await this.gatewayPost('vm-values/string', gateway_component_request_1.GatewayComponentRequest.vmQuery, body);
    }
    async vmValuesInt(body) {
        return await this.gatewayPost('vm-values/int', gateway_component_request_1.GatewayComponentRequest.vmQuery, body);
    }
    async queryLegacy(query, timestamp) {
        try {
            return await this.vmQueryService.vmQueryFullResult(query.scAddress, query.funcName, query.caller, query.args, query.value, timestamp);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.response.data);
        }
    }
    async getNetworkStatusShard(shard) {
        return await this.gatewayGet(`network/status/${shard}`, gateway_component_request_1.GatewayComponentRequest.networkStatus);
    }
    async getNetworkConfig() {
        return await this.gatewayGet('network/config', gateway_component_request_1.GatewayComponentRequest.networkConfig);
    }
    async getNetworkEconomics() {
        return await this.gatewayGet('network/economics', gateway_component_request_1.GatewayComponentRequest.networkEconomics);
    }
    async getNetworkTotalStaked() {
        return await this.gatewayGet('network/total-staked', gateway_component_request_1.GatewayComponentRequest.networkTotalStaked);
    }
    async getNodeHeartbeatStatus(res) {
        try {
            const heartbeatStatus = await this.cachingService.getOrSet('heartbeatstatus', async () => {
                const result = await this.gatewayService.getRaw('node/heartbeatstatus', gateway_component_request_1.GatewayComponentRequest.nodeHeartbeat);
                return result.data;
            }, sdk_nestjs_common_1.Constants.oneMinute() * 2);
            res.type('application/json').send(heartbeatStatus);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.response.data);
        }
    }
    async getNodeWaitingEpochsLeft(bls) {
        return await this.gatewayGet(`node/waiting-epochs-left/${bls}`, gateway_component_request_1.GatewayComponentRequest.getNodeWaitingEpochsLeft);
    }
    async getValidatorStatistics(res) {
        try {
            const validatorStatistics = await this.cachingService.getOrSet('validatorstatistics', async () => {
                const result = await this.gatewayService.getRaw('validator/statistics', gateway_component_request_1.GatewayComponentRequest.validatorStatistics);
                return result.data;
            }, sdk_nestjs_common_1.Constants.oneMinute() * 2);
            res.type('application/json').send(validatorStatistics);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.response.data);
        }
    }
    async getValidatorAuction(res) {
        try {
            const result = await this.gatewayService.getRaw('validator/auction', gateway_component_request_1.GatewayComponentRequest.validatorAuction);
            res.type('application/json').send(result.data);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.response.data);
        }
    }
    async getBlockByShardAndNonce(shard, nonce, withTxs) {
        return await this.gatewayGet(`block/${shard}/by-nonce/${nonce}`, gateway_component_request_1.GatewayComponentRequest.blockByNonce, { withTxs });
    }
    async getBlockByShardAndHash(shard, hash, withTxs) {
        return await this.gatewayGet(`block/${shard}/by-hash/${hash}`, gateway_component_request_1.GatewayComponentRequest.blockByHash, { withTxs }, async (error) => {
            var _a, _b;
            const message = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error;
            if (message && (message.includes('key not found') || message.includes('getting block failed'))) {
                throw error;
            }
            return false;
        });
    }
    async getBlockAtlas(shard, nonce) {
        return await this.gatewayGet(`block-atlas/${shard}/${nonce}`, gateway_component_request_1.GatewayComponentRequest.blockAtlas);
    }
    async getHyperblockByNonce(nonce) {
        try {
            return await this.cachingService.getOrSet(`hyperblock/by-nonce/${nonce}`, async () => await this.gatewayGet(`hyperblock/by-nonce/${nonce}`, gateway_component_request_1.GatewayComponentRequest.hyperblockByNonce, undefined, async (error) => {
                var _a, _b;
                const message = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error;
                if (message === 'sending request error') {
                    throw error;
                }
                return false;
            }), sdk_nestjs_common_1.Constants.oneHour());
        }
        catch (error) {
            throw new common_1.BadRequestException(error.response);
        }
    }
    async getHyperblockByHash(hash) {
        return await this.gatewayGet(`hyperblock/by-hash/${hash}`, gateway_component_request_1.GatewayComponentRequest.hyperblockByHash);
    }
    async getGasConfigs() {
        return await this.gatewayGet('network/gas-configs', gateway_component_request_1.GatewayComponentRequest.gasConfigs);
    }
    async gatewayGet(url, component, params = undefined, errorHandler) {
        if (params) {
            url += '?' + Object.keys(params).filter(key => params[key] !== undefined).map(key => `${key}=${params[key]}`).join('&');
        }
        try {
            const result = await this.gatewayService.getRaw(url, component, errorHandler);
            return result.data;
        }
        catch (error) {
            if (error.response) {
                if (error.response.data) {
                    throw new common_1.BadRequestException(error.response.data);
                }
                throw new common_1.BadRequestException(error.response);
            }
            this.logger.error(`Unhandled exception when calling gateway url '${url}'`);
            throw new common_1.BadRequestException(`Unhandled exception when calling gateway url '${url}'`);
        }
    }
    async gatewayPost(url, component, data, errorHandler) {
        try {
            const result = await this.gatewayService.createRaw(url, component, data, errorHandler);
            return result.data;
        }
        catch (error) {
            if (error.response) {
                if (error.response.data) {
                    throw new common_1.BadRequestException(error.response.data);
                }
                throw new common_1.BadRequestException(error.response);
            }
            this.logger.error(`Unhandled exception when calling gateway url '${url}'`);
            throw new common_1.BadRequestException(`Unhandled exception when calling gateway url '${url}'`);
        }
    }
    async forwardGateway(url, component, params, errorHandler) {
        return await this.gatewayGet(url, component, params, errorHandler);
    }
    async forwardRequest(request) {
        const url = request.url.startsWith('/') ? request.url.substring(1) : request.url;
        const queryParams = request.query;
        return await this.forwardGateway(url.replace('gateway/', ''), gateway_component_request_1.GatewayComponentRequest.forward, queryParams);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('/address/:address'),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "getAddress", null);
tslib_1.__decorate([
    (0, common_1.Get)('/address/:address/balance'),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "getAddressBalance", null);
tslib_1.__decorate([
    (0, common_1.Get)('/address/:address/nonce'),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "getAddressNonce", null);
tslib_1.__decorate([
    (0, common_1.Get)('/address/:address/shard'),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "getAddressShard", null);
tslib_1.__decorate([
    (0, common_1.Get)('/address/:address/keys'),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "getAddressKeys", null);
tslib_1.__decorate([
    (0, common_1.Get)('/address/:address/key/:key'),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Param)('key')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "getAddressStorageKey", null);
tslib_1.__decorate([
    (0, common_1.Get)('/address/:address/transactions'),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "getAddressTransactions", null);
tslib_1.__decorate([
    (0, common_1.Get)('/address/:address/guardian-data'),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "getAddressGuardianData", null);
tslib_1.__decorate([
    (0, common_1.Get)('/address/:address/dcdt'),
    tslib_1.__param(0, (0, common_1.Param)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "getAddressDcdt", null);
tslib_1.__decorate([
    (0, common_1.Post)('/transaction/send'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "transactionSend", null);
tslib_1.__decorate([
    (0, common_1.Post)('/transaction/simulate'),
    tslib_1.__param(0, (0, common_1.Query)('checkSignature', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Boolean, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "transactionSimulate", null);
tslib_1.__decorate([
    (0, common_1.Post)('/transaction/send-multiple'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "transactionSendMultiple", null);
tslib_1.__decorate([
    (0, common_1.Post)('/transaction/send-user-funds'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "transactionSendUserFunds", null);
tslib_1.__decorate([
    (0, common_1.Post)('/transaction/cost'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "transactionCost", null);
tslib_1.__decorate([
    (0, common_1.Get)('/transaction/pool'),
    (0, sdk_nestjs_cache_1.NoCache)(),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "getTransactionPool", null);
tslib_1.__decorate([
    (0, common_1.Get)('/transaction/:hash'),
    (0, swagger_1.ApiQuery)({ name: 'sender', description: 'Sender', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'withResults', description: 'Include results which correspond to the hash', required: false }),
    tslib_1.__param(0, (0, common_1.Param)('hash', sdk_nestjs_common_1.ParseTransactionHashPipe)),
    tslib_1.__param(1, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(2, (0, common_1.Query)('withResults')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "getTransaction", null);
tslib_1.__decorate([
    (0, common_1.Get)('/transaction/:hash/process-status'),
    tslib_1.__param(0, (0, common_1.Param)('hash', sdk_nestjs_common_1.ParseTransactionHashPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "getTransactionProcessStatus", null);
tslib_1.__decorate([
    (0, common_1.Get)('/transaction/:hash/status'),
    (0, swagger_1.ApiQuery)({ name: 'sender', description: 'Sender', required: false }),
    tslib_1.__param(0, (0, common_1.Param)('hash', sdk_nestjs_common_1.ParseTransactionHashPipe)),
    tslib_1.__param(1, (0, common_1.Query)('sender', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "getTransactionStatus", null);
tslib_1.__decorate([
    (0, common_1.Post)('/vm-values/hex'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "vmValuesHex", null);
tslib_1.__decorate([
    (0, common_1.Post)('/vm-values/string'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "vmValuesString", null);
tslib_1.__decorate([
    (0, common_1.Post)('/vm-values/int'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "vmValuesInt", null);
tslib_1.__decorate([
    (0, common_1.Post)('/vm-values/query'),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Returns the result of the query (legacy)',
    }),
    (0, common_1.UseInterceptors)(deep_history_interceptor_1.DeepHistoryInterceptor),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Query)('timestamp', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [vm_query_request_1.VmQueryRequest, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "queryLegacy", null);
tslib_1.__decorate([
    (0, common_1.Get)('/network/status/:shard'),
    tslib_1.__param(0, (0, common_1.Param)('shard')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "getNetworkStatusShard", null);
tslib_1.__decorate([
    (0, common_1.Get)('/network/config'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "getNetworkConfig", null);
tslib_1.__decorate([
    (0, common_1.Get)('/network/economics'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "getNetworkEconomics", null);
tslib_1.__decorate([
    (0, common_1.Get)('/network/total-staked'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "getNetworkTotalStaked", null);
tslib_1.__decorate([
    (0, common_1.Get)('/node/heartbeatstatus'),
    (0, sdk_nestjs_cache_1.NoCache)(),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "getNodeHeartbeatStatus", null);
tslib_1.__decorate([
    (0, common_1.Get)('/node/waiting-epochs-left/:bls'),
    tslib_1.__param(0, (0, common_1.Param)('bls', sdk_nestjs_common_1.ParseBlsHashPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "getNodeWaitingEpochsLeft", null);
tslib_1.__decorate([
    (0, common_1.Get)('/validator/statistics'),
    (0, sdk_nestjs_cache_1.NoCache)(),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "getValidatorStatistics", null);
tslib_1.__decorate([
    (0, common_1.Get)('/validator/auction'),
    (0, sdk_nestjs_cache_1.NoCache)(),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "getValidatorAuction", null);
tslib_1.__decorate([
    (0, common_1.Get)('/block/:shard/by-nonce/:nonce'),
    (0, swagger_1.ApiQuery)({ name: 'withTxs', description: 'Include transactions', required: false }),
    tslib_1.__param(0, (0, common_1.Param)('shard')),
    tslib_1.__param(1, (0, common_1.Param)('nonce')),
    tslib_1.__param(2, (0, common_1.Query)('withTxs')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, String]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "getBlockByShardAndNonce", null);
tslib_1.__decorate([
    (0, common_1.Get)('/block/:shard/by-hash/:hash'),
    (0, swagger_1.ApiQuery)({ name: 'withTxs', description: 'Include transactions', required: false }),
    tslib_1.__param(0, (0, common_1.Param)('shard')),
    tslib_1.__param(1, (0, common_1.Param)('hash')),
    tslib_1.__param(2, (0, common_1.Query)('withTxs')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number, String]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "getBlockByShardAndHash", null);
tslib_1.__decorate([
    (0, common_1.Get)('/block-atlas/:shard/:nonce'),
    tslib_1.__param(0, (0, common_1.Param)('shard')),
    tslib_1.__param(1, (0, common_1.Param)('nonce')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "getBlockAtlas", null);
tslib_1.__decorate([
    (0, common_1.Get)('/hyperblock/by-nonce/:nonce'),
    tslib_1.__param(0, (0, common_1.Param)('nonce')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "getHyperblockByNonce", null);
tslib_1.__decorate([
    (0, common_1.Get)('/hyperblock/by-hash/:hash'),
    tslib_1.__param(0, (0, common_1.Param)('hash', sdk_nestjs_common_1.ParseBlockHashPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "getHyperblockByHash", null);
tslib_1.__decorate([
    (0, common_1.Get)('/network/gas-configs'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "getGasConfigs", null);
tslib_1.__decorate([
    (0, common_1.Get)('/gateway/*'),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], GatewayProxyController.prototype, "forwardRequest", null);
GatewayProxyController = GatewayProxyController_1 = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('proxy'),
    (0, swagger_1.ApiExcludeController)(),
    (0, sdk_nestjs_http_1.DisableFieldsInterceptorOnController)(),
    tslib_1.__metadata("design:paramtypes", [gateway_service_1.GatewayService,
        vm_query_service_1.VmQueryService,
        sdk_nestjs_cache_1.CacheService,
        plugin_service_1.PluginService])
], GatewayProxyController);
exports.GatewayProxyController = GatewayProxyController;
//# sourceMappingURL=gateway.proxy.controller.js.map