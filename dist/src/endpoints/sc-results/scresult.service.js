"use strict";
var SmartContractResultService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartContractResultService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const common_1 = require("@nestjs/common");
const assets_service_1 = require("../../common/assets/assets.service");
const indexer_service_1 = require("../../common/indexer/indexer.service");
const transaction_1 = require("../transactions/entities/transaction");
const transaction_type_1 = require("../transactions/entities/transaction.type");
const transaction_action_service_1 = require("../transactions/transaction-action/transaction.action.service");
const smart_contract_result_1 = require("./entities/smart.contract.result");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
let SmartContractResultService = SmartContractResultService_1 = class SmartContractResultService {
    constructor(indexerService, transactionActionService, assetsService) {
        this.indexerService = indexerService;
        this.transactionActionService = transactionActionService;
        this.assetsService = assetsService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(SmartContractResultService_1.name);
    }
    async getScResults(pagination, filter, options) {
        const elasticResult = await this.indexerService.getScResults(pagination, filter);
        const smartContractResults = elasticResult.map(scResult => sdk_nestjs_http_1.ApiUtils.mergeObjects(new smart_contract_result_1.SmartContractResult(), scResult));
        const accountAssets = await this.assetsService.getAllAccountAssets();
        for (const smartContractResult of smartContractResults) {
            const transaction = sdk_nestjs_http_1.ApiUtils.mergeObjects(new transaction_1.Transaction(), smartContractResult);
            transaction.type = transaction_type_1.TransactionType.SmartContractResult;
            try {
                smartContractResult.action = await this.transactionActionService.getTransactionAction(transaction, options.withActionTransferValue);
            }
            catch (error) {
                this.logger.error(`Failed to get transaction action for smart contract result with hash '${smartContractResult.hash}'`);
                this.logger.error(error);
            }
            smartContractResult.senderAssets = accountAssets[smartContractResult.sender];
            smartContractResult.receiverAssets = accountAssets[smartContractResult.receiver];
        }
        return smartContractResults;
    }
    async getScResult(scHash) {
        const scResult = await this.indexerService.getScResult(scHash);
        if (!scResult) {
            return undefined;
        }
        const smartContractResult = sdk_nestjs_http_1.ApiUtils.mergeObjects(new smart_contract_result_1.SmartContractResult(), scResult);
        const transaction = sdk_nestjs_http_1.ApiUtils.mergeObjects(new transaction_1.Transaction(), smartContractResult);
        transaction.type = transaction_type_1.TransactionType.SmartContractResult;
        try {
            smartContractResult.action = await this.transactionActionService.getTransactionAction(transaction);
        }
        catch (error) {
            this.logger.error(`Failed to get transaction action for smart contract result with hash '${smartContractResult.hash}'`);
            this.logger.error(error);
        }
        return smartContractResult;
    }
    async getScResultsCount(filter) {
        return await this.indexerService.getScResultsCount(filter);
    }
    async getAccountScResults(address, pagination) {
        const elasticResult = await this.indexerService.getAccountScResults(address, pagination);
        const smartContractResults = elasticResult.map(scResult => sdk_nestjs_http_1.ApiUtils.mergeObjects(new smart_contract_result_1.SmartContractResult(), scResult));
        for (const smartContractResult of smartContractResults) {
            const transaction = sdk_nestjs_http_1.ApiUtils.mergeObjects(new transaction_1.Transaction(), smartContractResult);
            transaction.type = transaction_type_1.TransactionType.SmartContractResult;
            try {
                smartContractResult.action = await this.transactionActionService.getTransactionAction(transaction);
            }
            catch (error) {
                this.logger.error(`Failed to get transaction action for smart contract result with hash '${smartContractResult.hash}'`);
                this.logger.error(error);
            }
        }
        return smartContractResults;
    }
    async getAccountScResultsCount(address) {
        return await this.indexerService.getAccountScResultsCount(address);
    }
};
SmartContractResultService = SmartContractResultService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => transaction_action_service_1.TransactionActionService))),
    tslib_1.__metadata("design:paramtypes", [indexer_service_1.IndexerService,
        transaction_action_service_1.TransactionActionService,
        assets_service_1.AssetsService])
], SmartContractResultService);
exports.SmartContractResultService = SmartContractResultService;
//# sourceMappingURL=scresult.service.js.map