"use strict";
var ApplicationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const elastic_indexer_service_1 = require("../../common/indexer/elastic/elastic.indexer.service");
const application_1 = require("./entities/application");
const assets_service_1 = require("../../common/assets/assets.service");
const gateway_service_1 = require("../../common/gateway/gateway.service");
const transfer_service_1 = require("../transfers/transfer.service");
const transaction_filter_1 = require("../transactions/entities/transaction.filter");
const transaction_type_1 = require("../transactions/entities/transaction.type");
const common_2 = require("@nestjs/common");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const cache_info_1 = require("../../utils/cache.info");
let ApplicationService = ApplicationService_1 = class ApplicationService {
    constructor(elasticIndexerService, assetsService, gatewayService, transferService, cacheService) {
        this.elasticIndexerService = elasticIndexerService;
        this.assetsService = assetsService;
        this.gatewayService = gatewayService;
        this.transferService = transferService;
        this.cacheService = cacheService;
        this.logger = new common_2.Logger(ApplicationService_1.name);
    }
    async getApplications(pagination, filter) {
        filter.validate(pagination.size);
        if (!filter.isSet) {
            return await this.cacheService.getOrSet(cache_info_1.CacheInfo.Applications(pagination).key, async () => await this.getApplicationsRaw(pagination, filter), cache_info_1.CacheInfo.Applications(pagination).ttl);
        }
        return await this.getApplicationsRaw(pagination, filter);
    }
    async getApplicationsRaw(pagination, filter) {
        const elasticResults = await this.elasticIndexerService.getApplications(filter, pagination);
        const assets = await this.assetsService.getAllAccountAssets();
        if (!elasticResults) {
            return [];
        }
        const applications = elasticResults.map(item => new application_1.Application(Object.assign({ contract: item.address, deployer: item.deployer, owner: item.currentOwner, codeHash: item.initialCodeHash, timestamp: item.timestamp, assets: assets[item.address], balance: '0' }, (filter.withTxCount && { txCount: 0 }))));
        const balancePromises = applications.map(application => this.getApplicationBalance(application.contract)
            .then(balance => { application.balance = balance; }));
        await Promise.all(balancePromises);
        if (filter.withTxCount) {
            for (const application of applications) {
                application.txCount = await this.getApplicationTxCount(application.contract);
            }
        }
        return applications;
    }
    async getApplicationsCount(filter) {
        return await this.elasticIndexerService.getApplicationCount(filter);
    }
    async getApplication(address) {
        const indexResult = await this.elasticIndexerService.getApplication(address);
        const assets = await this.assetsService.getAllAccountAssets();
        const result = new application_1.Application({
            contract: indexResult.address,
            deployer: indexResult.deployer,
            owner: indexResult.currentOwner,
            codeHash: indexResult.initialCodeHash,
            timestamp: indexResult.timestamp,
            assets: assets[address],
            balance: '0',
            txCount: 0,
        });
        result.txCount = await this.getApplicationTxCount(result.contract);
        result.balance = await this.getApplicationBalance(result.contract);
        return result;
    }
    async getApplicationTxCount(address) {
        return await this.transferService.getTransfersCount(new transaction_filter_1.TransactionFilter({ address, type: transaction_type_1.TransactionType.Transaction }));
    }
    async getApplicationBalance(address) {
        try {
            const { account: { balance } } = await this.gatewayService.getAddressDetails(address);
            return balance;
        }
        catch (error) {
            this.logger.error(`Error when getting balance for contract ${address}`, error);
            return '0';
        }
    }
};
ApplicationService = ApplicationService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [elastic_indexer_service_1.ElasticIndexerService,
        assets_service_1.AssetsService,
        gateway_service_1.GatewayService,
        transfer_service_1.TransferService,
        sdk_nestjs_cache_1.CacheService])
], ApplicationService);
exports.ApplicationService = ApplicationService;
//# sourceMappingURL=application.service.js.map