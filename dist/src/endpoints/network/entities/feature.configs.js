"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureConfigs = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class FeatureConfigs {
    constructor(init) {
        this.eventsNotifier = false;
        this.guestCaching = false;
        this.transactionPool = false;
        this.transactionPoolWarmer = false;
        this.updateCollectionExtraDetails = false;
        this.updateAccountsExtraDetails = false;
        this.marketplace = false;
        this.exchange = false;
        this.dataApi = false;
        this.auth = false;
        this.stakingV4 = false;
        this.chainAndromeda = false;
        this.stakingV5 = false;
        this.stakingV5ActivationEpoch = 0;
        this.nodeEpochsLeft = false;
        this.transactionProcessor = false;
        this.transactionCompleted = false;
        this.transactionBatch = false;
        this.deepHistory = false;
        this.elasticCircuitBreaker = false;
        this.statusChecker = false;
        this.nftScamInfo = false;
        this.processNfts = false;
        this.tps = false;
        this.nodesFetch = false;
        this.tokensFetch = false;
        this.providersFetch = false;
        this.assetsFetch = false;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Events notifier flag activation value' }),
    tslib_1.__metadata("design:type", Boolean)
], FeatureConfigs.prototype, "eventsNotifier", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Guest caching flag activation value' }),
    tslib_1.__metadata("design:type", Boolean)
], FeatureConfigs.prototype, "guestCaching", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Transaction pool flag activation value' }),
    tslib_1.__metadata("design:type", Boolean)
], FeatureConfigs.prototype, "transactionPool", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Transaction pool warmer flag activation value' }),
    tslib_1.__metadata("design:type", Boolean)
], FeatureConfigs.prototype, "transactionPoolWarmer", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Update Collection extra details flag activation value' }),
    tslib_1.__metadata("design:type", Boolean)
], FeatureConfigs.prototype, "updateCollectionExtraDetails", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Accounts extra details update flag activation value' }),
    tslib_1.__metadata("design:type", Boolean)
], FeatureConfigs.prototype, "updateAccountsExtraDetails", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Marketplace flag activation value' }),
    tslib_1.__metadata("design:type", Boolean)
], FeatureConfigs.prototype, "marketplace", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Exchange flag activation value' }),
    tslib_1.__metadata("design:type", Boolean)
], FeatureConfigs.prototype, "exchange", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data API flag activation value' }),
    tslib_1.__metadata("design:type", Boolean)
], FeatureConfigs.prototype, "dataApi", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Authentication flag activation value' }),
    tslib_1.__metadata("design:type", Boolean)
], FeatureConfigs.prototype, "auth", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Staking V4 flag activation value' }),
    tslib_1.__metadata("design:type", Boolean)
], FeatureConfigs.prototype, "stakingV4", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Chain Andromeda flag activation value' }),
    tslib_1.__metadata("design:type", Boolean)
], FeatureConfigs.prototype, "chainAndromeda", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Staking v5 flag activation value' }),
    tslib_1.__metadata("design:type", Boolean)
], FeatureConfigs.prototype, "stakingV5", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Staking v5 activation epoch' }),
    tslib_1.__metadata("design:type", Number)
], FeatureConfigs.prototype, "stakingV5ActivationEpoch", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Node epochs left flag activation value' }),
    tslib_1.__metadata("design:type", Boolean)
], FeatureConfigs.prototype, "nodeEpochsLeft", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Transaction processor flag activation value' }),
    tslib_1.__metadata("design:type", Boolean)
], FeatureConfigs.prototype, "transactionProcessor", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Transaction completed flag activation value' }),
    tslib_1.__metadata("design:type", Boolean)
], FeatureConfigs.prototype, "transactionCompleted", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Transaction batch flag activation value' }),
    tslib_1.__metadata("design:type", Boolean)
], FeatureConfigs.prototype, "transactionBatch", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Deep history flag activation value' }),
    tslib_1.__metadata("design:type", Boolean)
], FeatureConfigs.prototype, "deepHistory", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Elastic circuit breaker flag activation value' }),
    tslib_1.__metadata("design:type", Boolean)
], FeatureConfigs.prototype, "elasticCircuitBreaker", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status checker flag activation value' }),
    tslib_1.__metadata("design:type", Boolean)
], FeatureConfigs.prototype, "statusChecker", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'NFT scam info flag activation value' }),
    tslib_1.__metadata("design:type", Boolean)
], FeatureConfigs.prototype, "nftScamInfo", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'NFT processing flag activation value' }),
    tslib_1.__metadata("design:type", Boolean)
], FeatureConfigs.prototype, "processNfts", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'TPS flag activation value' }),
    tslib_1.__metadata("design:type", Boolean)
], FeatureConfigs.prototype, "tps", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nodes fetch flag activation value' }),
    tslib_1.__metadata("design:type", Boolean)
], FeatureConfigs.prototype, "nodesFetch", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tokens fetch flag activation value' }),
    tslib_1.__metadata("design:type", Boolean)
], FeatureConfigs.prototype, "tokensFetch", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Providers fetch flag activation value' }),
    tslib_1.__metadata("design:type", Boolean)
], FeatureConfigs.prototype, "providersFetch", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Assets fetch flag activation value' }),
    tslib_1.__metadata("design:type", Boolean)
], FeatureConfigs.prototype, "assetsFetch", void 0);
exports.FeatureConfigs = FeatureConfigs;
//# sourceMappingURL=feature.configs.js.map