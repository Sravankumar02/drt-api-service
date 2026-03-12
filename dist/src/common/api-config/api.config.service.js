"use strict";
var ApiConfigService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiConfigService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const status_checker_thresholds_1 = require("./entities/status-checker-thresholds");
const log_topic_1 = require("@terradharitri/sdk-transaction-processor/lib/types/log-topic");
const time_utils_1 = require("../../utils/time.utils");
let ApiConfigService = ApiConfigService_1 = class ApiConfigService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(ApiConfigService_1.name);
    }
    getConfig(configKey) {
        return this.configService.get(configKey);
    }
    getSelfUrl() {
        const selfUrl = this.configService.get('urls.self');
        if (!selfUrl) {
            throw new Error('No self url present');
        }
        return selfUrl;
    }
    isGuestCacheFeatureActive() {
        var _a;
        return (_a = this.configService.get('features.guestCaching.enabled')) !== null && _a !== void 0 ? _a : false;
    }
    getGuestCacheHitsThreshold() {
        var _a;
        return (_a = this.configService.get('features.guestCaching.hitsThreshold')) !== null && _a !== void 0 ? _a : 100;
    }
    getGuestCacheTtl() {
        var _a;
        return (_a = this.configService.get('features.guestCaching.ttl')) !== null && _a !== void 0 ? _a : 12;
    }
    getVerifierUrl() {
        const verifierUrl = this.configService.get('urls.verifier');
        if (!verifierUrl) {
            throw new Error('No verifier url present');
        }
        return verifierUrl;
    }
    getGatewayUrl() {
        const gatewayUrls = this.configService.get('urls.gateway');
        if (!gatewayUrls) {
            throw new Error('No gateway urls present');
        }
        return gatewayUrls[Math.floor(Math.random() * gatewayUrls.length)];
    }
    getSnapshotlessGatewayUrl() {
        var _a;
        const gatewayUrls = (_a = this.configService.get('urls.snapshotlessGateway')) !== null && _a !== void 0 ? _a : this.configService.get('urls.lightGateway');
        if (!gatewayUrls) {
            return undefined;
        }
        return gatewayUrls[Math.floor(Math.random() * gatewayUrls.length)];
    }
    getElasticUrl() {
        const elasticUrls = this.configService.get('urls.elastic');
        if (!elasticUrls) {
            throw new Error('No elastic urls present');
        }
        return elasticUrls[Math.floor(Math.random() * elasticUrls.length)];
    }
    getIpfsUrl() {
        var _a;
        return (_a = this.configService.get('urls.ipfs')) !== null && _a !== void 0 ? _a : 'https://ipfs.io/ipfs';
    }
    getSocketUrl() {
        const url = this.configService.get('urls.socket');
        if (!url) {
            throw new Error('No socket url present');
        }
        return url;
    }
    getMaiarIdUrl() {
        return this.configService.get('urls.durianId');
    }
    getDcdtContractAddress() {
        const address = this.configService.get('contracts.dcdt');
        if (!address) {
            throw new Error('No DCDT contract present');
        }
        return address;
    }
    getAuctionContractAddress() {
        return this.configService.get('contracts.auction');
    }
    getStakingContractAddress() {
        return this.configService.get('contracts.staking');
    }
    getStakingV4ActivationEpoch() {
        const activationEpoch = this.configService.get('features.stakingV4.activationEpoch');
        if (activationEpoch === undefined) {
            throw new Error('No stakingV4 activation epoch present');
        }
        return activationEpoch;
    }
    getDelegationContractAddress() {
        return this.configService.get('contracts.delegation');
    }
    getMetabondingContractAddress() {
        return this.configService.get('contracts.metabonding');
    }
    getDelegationManagerContractAddress() {
        const address = this.configService.get('contracts.delegationManager');
        if (!address) {
            throw new Error('No delegation manager contract present');
        }
        return address;
    }
    getVmQueryUrl() {
        return this.getGatewayUrl();
    }
    getRedisUrl() {
        const redisUrl = this.configService.get('urls.redis');
        if (!redisUrl) {
            throw new Error('No redis url present');
        }
        return redisUrl;
    }
    getRabbitmqUrl() {
        const rabbitmqUrl = this.configService.get('urls.rabbitmq');
        if (!rabbitmqUrl) {
            throw new Error('No rabbitmq url present');
        }
        return rabbitmqUrl;
    }
    getNftQueueName() {
        return this.configService.get('features.processNfts.nftQueueName', 'api-process-nfts');
    }
    getNftQueueDlqName() {
        return this.configService.get('features.processNfts.deadLetterQueueName', 'api-process-nfts-dlq');
    }
    getCacheTtl() {
        var _a;
        return (_a = this.configService.get('caching.cacheTtl')) !== null && _a !== void 0 ? _a : 6;
    }
    getNetwork() {
        const network = this.configService.get('network');
        if (!network) {
            throw new Error('No network present');
        }
        return network;
    }
    getCluster() {
        return this.configService.get('cluster');
    }
    getPoolLimit() {
        var _a;
        return (_a = this.configService.get('caching.poolLimit')) !== null && _a !== void 0 ? _a : 100;
    }
    getProcessTtl() {
        var _a;
        return (_a = this.configService.get('caching.processTtl')) !== null && _a !== void 0 ? _a : 60;
    }
    getAxiosTimeout() {
        var _a;
        return (_a = this.configService.get('keepAliveTimeout.downstream')) !== null && _a !== void 0 ? _a : 61000;
    }
    getServerTimeout() {
        var _a;
        return (_a = this.configService.get('keepAliveTimeout.upstream')) !== null && _a !== void 0 ? _a : 60000;
    }
    getHeadersTimeout() {
        return this.getServerTimeout() + 1000;
    }
    getUseRequestCachingFlag() {
        var _a;
        return (_a = this.configService.get('flags.useRequestCaching')) !== null && _a !== void 0 ? _a : true;
    }
    getUseRequestLoggingFlag() {
        var _a;
        return (_a = this.configService.get('flags.useRequestLogging')) !== null && _a !== void 0 ? _a : false;
    }
    getUseKeepAliveAgentFlag() {
        var _a;
        return (_a = this.configService.get('flags.useKeepAliveAgent')) !== null && _a !== void 0 ? _a : true;
    }
    getUseTracingFlag() {
        var _a;
        return (_a = this.configService.get('flags.useTracing')) !== null && _a !== void 0 ? _a : false;
    }
    getUseVmQueryTracingFlag() {
        var _a;
        return (_a = this.configService.get('flags.useVmQueryTracing')) !== null && _a !== void 0 ? _a : false;
    }
    getCollectionPropertiesFromGateway() {
        var _a;
        return (_a = this.configService.get('flags.collectionPropertiesFromGateway')) !== null && _a !== void 0 ? _a : false;
    }
    getProvidersUrl() {
        const providerUrl = this.configService.get('urls.providers');
        if (providerUrl) {
            return providerUrl;
        }
        const delegationUrl = this.configService.get('urls.delegation');
        if (delegationUrl) {
            return delegationUrl + '/providers';
        }
        throw new Error('No providers url present');
    }
    getDelegationUrl() {
        const delegationUrl = this.configService.get('urls.delegation');
        if (!delegationUrl) {
            throw new Error('No delegation url present');
        }
        return delegationUrl;
    }
    getTempUrl() {
        const tmpUrl = this.configService.get('urls.tmp');
        if (!tmpUrl) {
            throw new Error("No tmp url present");
        }
        return tmpUrl;
    }
    getIsTransactionProcessorCronActive() {
        var _a, _b;
        return (_b = (_a = this.configService.get('features.transactionProcessor.enabled')) !== null && _a !== void 0 ? _a : this.configService.get('cron.transactionProcessor')) !== null && _b !== void 0 ? _b : false;
    }
    getTransactionProcessorMaxLookBehind() {
        var _a, _b;
        return (_b = (_a = this.configService.get('features.transactionProcessor.maxLookBehind')) !== null && _a !== void 0 ? _a : this.configService.get('cron.transactionProcessorMaxLookBehind')) !== null && _b !== void 0 ? _b : 100;
    }
    getIsTransactionCompletedCronActive() {
        var _a, _b;
        return (_b = (_a = this.configService.get('features.transactionCompleted.enabled')) !== null && _a !== void 0 ? _a : this.configService.get('cron.transactionCompleted')) !== null && _b !== void 0 ? _b : false;
    }
    getTransactionCompletedMaxLookBehind() {
        var _a, _b;
        return (_b = (_a = this.configService.get('features.transactionCompleted.maxLookBehind')) !== null && _a !== void 0 ? _a : this.configService.get('cron.transactionCompletedMaxLookBehind')) !== null && _b !== void 0 ? _b : 100;
    }
    getTransactionCompletedLogLevel() {
        var _a;
        return (_a = this.configService.get('features.transactionCompleted.logLevel')) !== null && _a !== void 0 ? _a : log_topic_1.LogTopic.CrossShardSmartContractResult;
    }
    getIsTransactionBatchCronActive() {
        var _a, _b;
        return (_b = (_a = this.configService.get('features.transactionBatch.enabled')) !== null && _a !== void 0 ? _a : this.configService.get('cron.transactionBatch')) !== null && _b !== void 0 ? _b : false;
    }
    getTransactionBatchMaxLookBehind() {
        var _a, _b;
        return (_b = (_a = this.configService.get('features.transactionBatch.maxLookBehind')) !== null && _a !== void 0 ? _a : this.configService.get('cron.transactionBatchMaxLookBehind')) !== null && _b !== void 0 ? _b : 100;
    }
    getIsCacheWarmerCronActive() {
        const isCronActive = this.configService.get('cron.cacheWarmer');
        if (isCronActive === undefined) {
            throw new Error('No cron.cacheWarmer flag present');
        }
        return isCronActive;
    }
    getIsApiStatusCheckerActive() {
        var _a, _b;
        return (_b = (_a = this.configService.get('features.statusChecker.enabled')) !== null && _a !== void 0 ? _a : this.configService.get('cron.statusChecker')) !== null && _b !== void 0 ? _b : false;
    }
    getStatusCheckerThresholds() {
        const thresholds = this.configService.get('features.statusChecker.thresholds');
        return new status_checker_thresholds_1.StatusCheckerThresholds(thresholds);
    }
    getIsElasticUpdaterCronActive() {
        var _a;
        return (_a = this.configService.get('cron.elasticUpdater')) !== null && _a !== void 0 ? _a : false;
    }
    getIsNftScamInfoEnabled() {
        var _a;
        return (_a = this.configService.get('features.nftScamInfo.enabled')) !== null && _a !== void 0 ? _a : false;
    }
    getIsQueueWorkerCronActive() {
        const isQueueWorkerActive = this.configService.get('cron.queueWorker');
        if (isQueueWorkerActive === undefined) {
            throw new Error('No queue worker cron flag present');
        }
        return isQueueWorkerActive;
    }
    getIsFastWarmerCronActive() {
        const isCronActive = this.configService.get('cron.fastWarm');
        if (isCronActive === undefined) {
            return false;
        }
        return isCronActive;
    }
    isEventsNotifierFeatureActive() {
        const isEventsNotifierActive = this.configService.get('features.eventsNotifier.enabled');
        if (isEventsNotifierActive === undefined) {
            return false;
        }
        return isEventsNotifierActive;
    }
    getEventsNotifierFeaturePort() {
        const eventsNotifierPort = this.configService.get('features.eventsNotifier.port');
        if (eventsNotifierPort === undefined) {
            throw new Error('No events notifier port present');
        }
        return eventsNotifierPort;
    }
    getEventsNotifierUrl() {
        const url = this.configService.get('features.eventsNotifier.url');
        if (!url) {
            throw new Error('No events notifier url present');
        }
        return url;
    }
    getEventsNotifierExchange() {
        const exchange = this.configService.get('features.eventsNotifier.exchange');
        if (!exchange) {
            throw new Error('No events notifier exchange present');
        }
        return exchange;
    }
    getIsProcessNftsFlagActive() {
        var _a, _b;
        return (_b = (_a = this.configService.get('features.processNfts.enabled')) !== null && _a !== void 0 ? _a : this.configService.get('flags.processNfts')) !== null && _b !== void 0 ? _b : false;
    }
    getIsPublicApiActive() {
        const isApiActive = this.configService.get('api.public');
        if (isApiActive === undefined) {
            throw new Error('No api.public flag present');
        }
        return isApiActive;
    }
    getPublicApiPort() {
        var _a;
        return (_a = this.configService.get('api.publicPort')) !== null && _a !== void 0 ? _a : 3001;
    }
    getIsPrivateApiActive() {
        const isApiActive = this.configService.get('api.private');
        if (isApiActive === undefined) {
            throw new Error('No api.private flag present');
        }
        return isApiActive;
    }
    isElasticCircuitBreakerEnabled() {
        const isEnabled = this.configService.get('features.elasticCircuitBreaker.enabled');
        return isEnabled !== undefined ? isEnabled : false;
    }
    getElasticCircuitBreakerConfig() {
        var _a, _b, _c;
        return {
            durationThresholdMs: (_a = this.configService.get('features.elasticCircuitBreaker.durationThresholdMs')) !== null && _a !== void 0 ? _a : 5000,
            failureCountThreshold: (_b = this.configService.get('features.elasticCircuitBreaker.failureCountThreshold')) !== null && _b !== void 0 ? _b : 5000,
            resetTimeoutMs: (_c = this.configService.get('features.elasticCircuitBreaker.resetTimeoutMs')) !== null && _c !== void 0 ? _c : 5000,
        };
    }
    getElasticMigratedIndicesConfig() {
        var _a;
        return (_a = this.configService.get('features.elasticMigratedIndices')) !== null && _a !== void 0 ? _a : {};
    }
    getIsWebsocketApiActive() {
        var _a;
        return (_a = this.configService.get('api.websocket')) !== null && _a !== void 0 ? _a : true;
    }
    getPrivateApiPort() {
        var _a;
        return (_a = this.configService.get('api.privatePort')) !== null && _a !== void 0 ? _a : 4001;
    }
    getIsAuthActive() {
        var _a, _b;
        return (_b = (_a = this.configService.get('features.auth.enabled')) !== null && _a !== void 0 ? _a : this.configService.get('api.auth')) !== null && _b !== void 0 ? _b : false;
    }
    getDatabaseType() {
        const databaseType = this.configService.get('database.type');
        if (!databaseType) {
            throw new Error('No database.type present');
        }
        return databaseType;
    }
    getDatabaseHost() {
        const databaseHost = this.configService.get('database.host');
        if (!databaseHost) {
            throw new Error('No database.host present');
        }
        return databaseHost;
    }
    getDatabasePort() {
        const databasePort = this.configService.get('database.port');
        if (!databasePort) {
            throw new Error('No database.port present');
        }
        return databasePort;
    }
    getDatabaseUsername() {
        const databaseUsername = this.configService.get('database.username');
        return databaseUsername;
    }
    getDatabasePassword() {
        const databasePassword = this.configService.get('database.password');
        return databasePassword;
    }
    getDatabaseName() {
        const databaseName = this.configService.get('database.database');
        if (!databaseName) {
            throw new Error('No database.database present');
        }
        return databaseName;
    }
    getDatabaseUrl() {
        const databaseUrl = this.configService.get('database.url');
        if (!databaseUrl) {
            throw new Error('No database.url present');
        }
        return databaseUrl;
    }
    getDatabaseConnection() {
        return {
            host: this.getDatabaseHost(),
            port: this.getDatabasePort(),
            username: this.getDatabaseUsername(),
            password: this.getDatabasePassword(),
            database: this.getDatabaseName(),
        };
    }
    getDatabaseSlaveConnections() {
        const slaves = this.configService.get('database.slaves');
        if (!slaves) {
            return [];
        }
        return slaves;
    }
    getImageWidth() {
        const imageWidth = this.configService.get('image.width');
        if (!imageWidth) {
            throw new Error('No imageWidth present');
        }
        return imageWidth;
    }
    getImageHeight() {
        const imageHeight = this.configService.get('image.height');
        if (!imageHeight) {
            throw new Error('No imageHeight present');
        }
        return imageHeight;
    }
    getImageType() {
        const imageType = this.configService.get('image.type');
        if (!imageType) {
            throw new Error('No imageType present');
        }
        return imageType;
    }
    getAwsS3KeyId() {
        const s3KeyId = this.configService.get('aws.s3KeyId');
        if (!s3KeyId) {
            throw new Error('No s3KeyId present');
        }
        return s3KeyId;
    }
    getAwsS3Secret() {
        const s3Secret = this.configService.get('aws.s3Secret');
        if (!s3Secret) {
            throw new Error('No s3Secret present');
        }
        return s3Secret;
    }
    getAwsS3Bucket() {
        const s3Bucket = this.configService.get('aws.s3Bucket');
        if (!s3Bucket) {
            throw new Error('No s3Bucket present');
        }
        return s3Bucket;
    }
    getAwsS3Region() {
        const s3Region = this.configService.get('aws.s3Region');
        if (!s3Region) {
            throw new Error('No s3Region present');
        }
        return s3Region;
    }
    getAwsS3Endpoint() {
        const s3Endpoint = this.configService.get('aws.s3Endpoint');
        return s3Endpoint && s3Endpoint.length > 0 ? s3Endpoint : undefined;
    }
    getMetaChainShardId() {
        const metaChainShardId = this.configService.get('metaChainShardId');
        if (metaChainShardId === undefined) {
            throw new Error('No metaChainShardId present');
        }
        return metaChainShardId;
    }
    getRateLimiterSecret() {
        return this.configService.get('rateLimiterSecret');
    }
    getInflationAmounts() {
        const inflationAmounts = this.configService.get('inflation');
        if (!inflationAmounts) {
            throw new Error('No inflation amounts present');
        }
        return inflationAmounts;
    }
    getStakingV5InflationAmounts() {
        const inflationAmounts = this.configService.get('stakingV5Inflation');
        if (!inflationAmounts) {
            throw new Error('No staking v5 inflation amounts present');
        }
        return inflationAmounts;
    }
    getMediaUrl() {
        const mediaUrl = this.configService.get('urls.media');
        if (!mediaUrl) {
            throw new Error('No media url present');
        }
        return mediaUrl;
    }
    getMediaInternalUrl() {
        return this.configService.get('urls.mediaInternal');
    }
    getExternalMediaUrl() {
        const mediaUrl = this.getMediaUrl();
        if (mediaUrl.endsWith('.')) {
            return mediaUrl.substring(0, mediaUrl.length - 1);
        }
        return mediaUrl;
    }
    getSecurityAdmins() {
        var _a;
        const admins = (_a = this.configService.get('features.auth.admins')) !== null && _a !== void 0 ? _a : this.configService.get('security.admins');
        if (admins === undefined) {
            throw new Error('No security admins value present');
        }
        return admins;
    }
    getJwtSecret() {
        var _a;
        const jwtSecret = (_a = this.configService.get('features.auth.jwtSecret')) !== null && _a !== void 0 ? _a : this.configService.get('security.jwtSecret');
        if (!jwtSecret) {
            throw new Error('No jwtSecret present');
        }
        return jwtSecret;
    }
    getMockKeybases() {
        return this.configService.get('test.mockKeybases');
    }
    getMockNodes() {
        return this.configService.get('test.mockNodes');
    }
    getMockTokens() {
        return this.configService.get('test.mockTokens');
    }
    getMockPath() {
        const mockPath = this.configService.get('test.mockPath');
        if (mockPath === undefined) {
            throw new Error('No mock path value present');
        }
        return mockPath;
    }
    getNftProcessParallelism() {
        var _a;
        return (_a = this.configService.get('nftProcess.parallelism')) !== null && _a !== void 0 ? _a : 1;
    }
    getNftProcessMaxRetries() {
        var _a;
        return (_a = this.configService.get('nftProcess.maxRetries')) !== null && _a !== void 0 ? _a : 3;
    }
    isExchangeEnabledInternal() {
        var _a;
        return (_a = this.configService.get('features.exchange.enabled')) !== null && _a !== void 0 ? _a : false;
    }
    getExchangeServiceUrlLegacy() {
        var _a;
        return (_a = this.configService.get('transaction-action.moa.microServiceUrl')) !== null && _a !== void 0 ? _a : this.configService.get('plugins.transaction-action.moa.microServiceUrl');
    }
    isExchangeEnabled() {
        const isExchangeEnabled = this.isExchangeEnabledInternal();
        if (isExchangeEnabled) {
            return true;
        }
        const legacyUrl = this.getExchangeServiceUrlLegacy();
        if (legacyUrl) {
            return true;
        }
        return false;
    }
    getExchangeServiceUrl() {
        const isExchangeEnabled = this.isExchangeEnabledInternal();
        if (isExchangeEnabled) {
            return this.configService.get('features.exchange.serviceUrl');
        }
        const legacyUrl = this.getExchangeServiceUrlLegacy();
        if (legacyUrl) {
            return legacyUrl;
        }
        return undefined;
    }
    getExchangeServiceUrlMandatory() {
        const microServiceUrl = this.getExchangeServiceUrl();
        if (!microServiceUrl) {
            throw new Error('No exchange service url present');
        }
        return microServiceUrl;
    }
    getGithubToken() {
        return this.configService.get('github.token');
    }
    isTransactionPoolEnabled() {
        var _a;
        return (_a = this.configService.get('features.transactionPool.enabled')) !== null && _a !== void 0 ? _a : false;
    }
    isTransactionPoolCacheWarmerEnabled() {
        var _a;
        return (_a = this.configService.get('features.transactionPoolWarmer.enabled')) !== null && _a !== void 0 ? _a : false;
    }
    isUpdateAccountExtraDetailsEnabled() {
        var _a;
        return (_a = this.configService.get('features.updateAccountExtraDetails.enabled')) !== null && _a !== void 0 ? _a : false;
    }
    getAccountExtraDetailsTransfersLast24hUrl() {
        return this.configService.get('features.updateAccountExtraDetails.transfersLast24hUrl');
    }
    getTransactionPoolCacheWarmerCronExpression() {
        const cronExpression = this.configService.get('features.transactionPoolWarmer.cronExpression');
        if (!cronExpression) {
            throw new Error('No transaction pool cron expression present');
        }
        return cronExpression;
    }
    getTransactionPoolCacheWarmerTtlInSeconds() {
        var _a;
        return (_a = this.configService.get('features.transactionPoolWarmer.ttlInSeconds')) !== null && _a !== void 0 ? _a : 6;
    }
    isStakingV4Enabled() {
        var _a;
        return (_a = this.configService.get('features.stakingV4.enabled')) !== null && _a !== void 0 ? _a : false;
    }
    getStakingV4CronExpression() {
        const cronExpression = this.configService.get('features.stakingV4.cronExpression');
        if (!cronExpression) {
            throw new Error('No staking V4 cron expression present');
        }
        return cronExpression;
    }
    isTpsEnabled() {
        var _a;
        return (_a = this.configService.get('features.tps.enabled')) !== null && _a !== void 0 ? _a : false;
    }
    getTpsMaxLookBehindNonces() {
        var _a;
        return (_a = this.configService.get('features.tps.maxLookBehindNonces')) !== null && _a !== void 0 ? _a : 100;
    }
    isNftExtendedAttributesEnabled() {
        var _a;
        return (_a = this.configService.get('features.nftExtendedAttributes.enabled')) !== null && _a !== void 0 ? _a : false;
    }
    getNftExtendedAttributesNsfwThreshold() {
        var _a;
        return (_a = this.configService.get('features.nftExtendedAttributes.nsfwThreshold')) !== null && _a !== void 0 ? _a : 0.85;
    }
    isNodeEpochsLeftEnabled() {
        var _a;
        return (_a = this.configService.get('features.nodeEpochsLeft.enabled')) !== null && _a !== void 0 ? _a : false;
    }
    getIndexerSlaveConnections() {
        const slaves = this.configService.get('indexer.slaves');
        if (!slaves) {
            return [];
        }
        return slaves;
    }
    getIndexerHost() {
        const indexerHost = this.configService.get('indexer.host');
        if (!indexerHost) {
            throw new Error('No indexer.host present');
        }
        return indexerHost;
    }
    getIndexerPort() {
        const indexerPort = this.configService.get('indexer.port');
        if (!indexerPort) {
            throw new Error('No indexer.port present');
        }
        return indexerPort;
    }
    getIndexerUsername() {
        const indexerUsername = this.configService.get('indexer.username');
        return indexerUsername;
    }
    getIndexerPassword() {
        const indexerPassword = this.configService.get('indexer.password');
        return indexerPassword;
    }
    getIndexerName() {
        const indexerName = this.configService.get('indexer.database');
        if (!indexerName) {
            throw new Error('No indexer.database present');
        }
        return indexerName;
    }
    getIndexerConnection() {
        return {
            host: this.getIndexerHost(),
            port: this.getIndexerPort(),
            username: this.getIndexerUsername(),
            password: this.getIndexerPassword(),
            database: this.getIndexerName(),
        };
    }
    getIndexerMaxPagination() {
        var _a;
        return (_a = this.configService.get('indexer.maxPagination')) !== null && _a !== void 0 ? _a : 10000;
    }
    isNodeSyncProgressEnabled() {
        var _a;
        return (_a = this.configService.get('features.nodeSyncProgress.enabled')) !== null && _a !== void 0 ? _a : false;
    }
    isUpdateCollectionExtraDetailsEnabled() {
        var _a;
        return (_a = this.configService.get('features.updateCollectionExtraDetails.enabled')) !== null && _a !== void 0 ? _a : false;
    }
    isMarketplaceFeatureEnabled() {
        var _a;
        return (_a = this.configService.get('features.marketplace.enabled')) !== null && _a !== void 0 ? _a : false;
    }
    getMarketplaceServiceUrl() {
        const serviceUrl = this.configService.get('features.marketplace.serviceUrl');
        if (!serviceUrl) {
            throw new Error('No marketplace service url present');
        }
        return serviceUrl;
    }
    getNativeAuthAcceptedOrigins() {
        var _a;
        return (_a = this.configService.get('features.auth.acceptedOrigins')) !== null && _a !== void 0 ? _a : [''];
    }
    getNativeAuthMaxExpirySeconds() {
        var _a;
        return (_a = this.configService.get('features.auth.maxExpirySeconds')) !== null && _a !== void 0 ? _a : sdk_nestjs_common_1.Constants.oneDay();
    }
    isDataApiFeatureEnabled() {
        var _a;
        return (_a = this.configService.get('features.dataApi.enabled')) !== null && _a !== void 0 ? _a : false;
    }
    getDataApiServiceUrl() {
        const serviceUrl = this.configService.get('features.dataApi.serviceUrl');
        if (!serviceUrl) {
            throw new Error('No data-api service url present');
        }
        return serviceUrl;
    }
    isDeepHistoryGatewayEnabled() {
        var _a;
        return (_a = this.configService.get('features.deepHistory.enabled')) !== null && _a !== void 0 ? _a : false;
    }
    getDeepHistoryGatewayUrl() {
        const deepHistoryUrl = this.configService.get('features.deepHistory.url');
        if (!deepHistoryUrl) {
            throw new Error('No deep history url present');
        }
        return deepHistoryUrl;
    }
    isChainAndromedaEnabled() {
        var _a;
        return (_a = this.configService.get('features.chainAndromeda.enabled')) !== null && _a !== void 0 ? _a : false;
    }
    getChainAndromedaActivationEpoch() {
        var _a;
        return (_a = this.configService.get('features.chainAndromeda.activationEpoch')) !== null && _a !== void 0 ? _a : 99999;
    }
    isStakingV5Enabled() {
        var _a;
        return (_a = this.configService.get('features.stakingV5.enabled')) !== null && _a !== void 0 ? _a : false;
    }
    getStakingV5ActivationEpoch() {
        var _a;
        return (_a = this.configService.get('features.stakingV5.activationEpoch')) !== null && _a !== void 0 ? _a : 99999;
    }
    isDeprecatedRelayedV1V2Enabled() {
        var _a;
        return (_a = this.configService.get('features.deprecatedRelayedV1V2.enabled')) !== null && _a !== void 0 ? _a : false;
    }
    getDeprecatedRelayedV1V2ActivationEpoch() {
        var _a;
        return (_a = this.configService.get('features.deprecatedRelayedV1V2.activationEpoch')) !== null && _a !== void 0 ? _a : 99999;
    }
    shouldDeprecateRelayedV1V2(epoch) {
        const isEnabled = this.isDeprecatedRelayedV1V2Enabled();
        if (!isEnabled) {
            return false;
        }
        return epoch >= this.getDeprecatedRelayedV1V2ActivationEpoch();
    }
    isAssetsCdnFeatureEnabled() {
        var _a;
        return (_a = this.configService.get('features.assetsFetch.enabled')) !== null && _a !== void 0 ? _a : false;
    }
    getAssetsCdnUrl() {
        var _a, _b;
        return (_b = (_a = this.configService.get('features.assetsFetch.assetsUrl')) !== null && _a !== void 0 ? _a : this.configService.get('features.assetsFetch.assetesUrl')) !== null && _b !== void 0 ? _b : 'https://tools.dharitri.org/assets-cdn';
    }
    isTokensFetchFeatureEnabled() {
        var _a;
        return (_a = this.configService.get('features.tokensFetch.enabled')) !== null && _a !== void 0 ? _a : false;
    }
    getTokensFetchServiceUrl() {
        const serviceUrl = this.configService.get('features.tokensFetch.serviceUrl');
        if (!serviceUrl) {
            throw new Error('No tokens fetch service url present');
        }
        return serviceUrl;
    }
    isNodesFetchFeatureEnabled() {
        var _a;
        return (_a = this.configService.get('features.nodesFetch.enabled')) !== null && _a !== void 0 ? _a : false;
    }
    getNodesFetchServiceUrl() {
        const serviceUrl = this.configService.get('features.nodesFetch.serviceUrl');
        if (!serviceUrl) {
            throw new Error('No nodes fetch service url present');
        }
        return serviceUrl;
    }
    isProvidersFetchFeatureEnabled() {
        var _a;
        return (_a = this.configService.get('features.providersFetch.enabled')) !== null && _a !== void 0 ? _a : false;
    }
    getProvidersFetchServiceUrl() {
        const serviceUrl = this.configService.get('features.providersFetch.serviceUrl');
        if (!serviceUrl) {
            throw new Error('No providers fetch service url present');
        }
        return serviceUrl;
    }
    getCacheDuration() {
        var _a;
        return (_a = this.configService.get('caching.cacheDuration')) !== null && _a !== void 0 ? _a : 3;
    }
    getCompressionEnabled() {
        var _a;
        return (_a = this.configService.get('compression.enabled')) !== null && _a !== void 0 ? _a : false;
    }
    getCompressionLevel() {
        var _a;
        return (_a = this.configService.get('compression.level')) !== null && _a !== void 0 ? _a : 6;
    }
    getCompressionThreshold() {
        var _a;
        return (_a = this.configService.get('compression.threshold')) !== null && _a !== void 0 ? _a : 1024;
    }
    getCompressionChunkSize() {
        var _a;
        return (_a = this.configService.get('compression.chunkSize')) !== null && _a !== void 0 ? _a : 16384;
    }
    getIsWebsocketSubscriptionActive() {
        const isWebsocketSubscriptionActive = this.configService.get('features.websocketSubscription.enabled');
        if (isWebsocketSubscriptionActive === undefined) {
            throw new Error('No features.websocketSubscription.enabled flag present');
        }
        return isWebsocketSubscriptionActive;
    }
    getWebsocketSubscriptionPort() {
        const port = this.configService.get('features.websocketSubscription.port');
        if (port === undefined) {
            throw new Error('No features.websocketSubscription.port present');
        }
        return port;
    }
    getWebsocketSubscriptionBroadcastIntervalMs() {
        var _a;
        return (_a = this.configService.get('features.websocketSubscription.broadcastIntervalMs')) !== null && _a !== void 0 ? _a : 6000;
    }
    getWebsocketMaxSubscriptionsPerInstance() {
        var _a;
        return (_a = this.configService.get('features.websocketSubscription.maxSubscriptionsPerInstance')) !== null && _a !== void 0 ? _a : 10000;
    }
    getWebsocketMaxSubscriptionsPerClient() {
        var _a;
        return (_a = this.configService.get('features.websocketSubscription.maxSubscriptionsPerClient')) !== null && _a !== void 0 ? _a : 5;
    }
    getHeadersForCustomUrl(url) {
        let customUrlConfigs = this.configService.get('customUrlHeaders');
        if (!customUrlConfigs) {
            return undefined;
        }
        if (typeof customUrlConfigs === 'string') {
            try {
                customUrlConfigs = JSON.parse(customUrlConfigs);
            }
            catch (error) {
                return undefined;
            }
        }
        if (!Array.isArray(customUrlConfigs) && typeof customUrlConfigs === 'object') {
            let workingConfig = customUrlConfigs;
            while (workingConfig && workingConfig[''] && typeof workingConfig[''] === 'object') {
                workingConfig = workingConfig[''];
            }
            const arrayValues = [];
            for (const key in workingConfig) {
                if (!isNaN(Number(key))) {
                    let item = workingConfig[key];
                    while (item && item[''] && typeof item[''] === 'object') {
                        item = item[''];
                    }
                    arrayValues[Number(key)] = item;
                }
            }
            if (arrayValues.length > 0) {
                customUrlConfigs = arrayValues.filter(item => item !== undefined);
                this.logger.log(`Loaded ${customUrlConfigs.length} custom URL header config(s)`);
            }
            else {
                return undefined;
            }
        }
        if (!Array.isArray(customUrlConfigs)) {
            return undefined;
        }
        for (const config of customUrlConfigs) {
            if (config && config.urlPattern && url.includes(config.urlPattern)) {
                let headers = config.headers;
                if (headers && headers[''] && typeof headers[''] === 'object') {
                    headers = headers[''];
                }
                this.logger.log(`Found custom headers for URL pattern '${config.urlPattern}': ${JSON.stringify(headers)}`);
                return headers;
            }
        }
        return undefined;
    }
    isChainBarnardEnabled() {
        var _a;
        return (_a = this.configService.get('features.chainBarnard.enabled')) !== null && _a !== void 0 ? _a : false;
    }
    getChainBarnardActivationEpoch() {
        const epoch = this.configService.get('features.chainBarnard.activationEpoch');
        if (epoch == null) {
            return time_utils_1.TimeUtils.TIMESTAMP_IN_SECONDS_THRESHOLD + 1;
        }
        return epoch;
    }
    getChainBarnardActivationTimestamp() {
        const timestamp = this.configService.get('features.chainBarnard.activationTimestamp');
        if (timestamp == null) {
            return time_utils_1.TimeUtils.TIMESTAMP_IN_SECONDS_THRESHOLD + 1;
        }
        return timestamp;
    }
};
ApiConfigService = ApiConfigService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [config_1.ConfigService])
], ApiConfigService);
exports.ApiConfigService = ApiConfigService;
//# sourceMappingURL=api.config.service.js.map