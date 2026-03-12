"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const public_app_module_1 = require("./public.app.module");
const fs_1 = require("fs");
const path_1 = require("path");
const api_config_service_1 = require("./common/api-config/api.config.service");
const private_app_module_1 = require("./private.app.module");
const cache_warmer_module_1 = require("./crons/cache.warmer/cache.warmer.module");
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
const nest_winston_1 = require("nest-winston");
const redis_1 = require("redis");
const transaction_processor_module_1 = require("./crons/transaction.processor/transaction.processor.module");
const pub_sub_listener_module_1 = require("./common/pubsub/pub.sub.listener.module");
const nft_queue_module_1 = require("./queue.worker/nft.worker/queue/nft.queue.module");
const elastic_updater_module_1 = require("./crons/elastic.updater/elastic.updater.module");
const plugin_service_1 = require("./common/plugins/plugin.service");
const transaction_completed_module_1 = require("./crons/transaction.processor/transaction.completed.module");
const socket_adapter_1 = require("./common/websockets/socket-adapter");
const api_config_module_1 = require("./common/api-config/api.config.module");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_monitoring_1 = require("@sravankumar02/sdk-nestjs-monitoring");
const sdk_nestjs_http_1 = require("@sravankumar02/sdk-nestjs-http");
const drtnest_config_service_impl_service_1 = require("./common/api-config/drtnest-config-service-impl.service");
const rabbitmq_module_1 = require("./common/rabbitmq/rabbitmq.module");
const transaction_logging_interceptor_1 = require("./interceptors/transaction.logging.interceptor");
const batch_transaction_processor_module_1 = require("./crons/transaction.processor/batch.transaction.processor.module");
const settings_service_1 = require("./common/settings/settings.service");
const status_checker_module_1 = require("./crons/status.checker/status.checker.module");
const sdk_nestjs_auth_1 = require("@sravankumar02/sdk-nestjs-auth");
const web_socket_publisher_module_1 = require("./common/websockets/web-socket-publisher-module");
const indexer_service_1 = require("./common/indexer/indexer.service");
const not_writable_error_1 = require("./common/indexer/entities/not.writable.error");
const bodyParser = tslib_1.__importStar(require("body-parser"));
const requestIp = tslib_1.__importStar(require("request-ip"));
const compression_1 = tslib_1.__importDefault(require("compression"));
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const websocket_subscription_module_1 = require("./crons/websocket/websocket.subscription.module");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrapper');
    sdk_nestjs_common_1.LoggerInitializer.initialize(logger);
    const apiConfigApp = await core_1.NestFactory.create(api_config_module_1.ApiConfigModule);
    const apiConfigService = apiConfigApp.get(api_config_service_1.ApiConfigService);
    if (apiConfigService.getUseTracingFlag() === true) {
        require('dd-trace').init();
    }
    if (apiConfigService.getIsPublicApiActive()) {
        const publicApp = await core_1.NestFactory.create(public_app_module_1.PublicAppModule);
        await configurePublicApp(publicApp, apiConfigService);
        await publicApp.listen(apiConfigService.getPublicApiPort());
        if (apiConfigService.getIsWebsocketApiActive()) {
            const websocketPublisherApp = await core_1.NestFactory.createMicroservice(web_socket_publisher_module_1.WebSocketPublisherModule, {
                transport: microservices_1.Transport.REDIS,
                options: {
                    host: apiConfigService.getRedisUrl(),
                    port: 6379,
                    retryAttempts: 100,
                    retryDelay: 1000,
                    retryStrategy: () => 1000,
                },
            });
            websocketPublisherApp.useWebSocketAdapter(new socket_adapter_1.SocketAdapter(websocketPublisherApp));
            websocketPublisherApp.listen();
        }
    }
    if (apiConfigService.getIsPrivateApiActive()) {
        const privateApp = await core_1.NestFactory.create(private_app_module_1.PrivateAppModule);
        await privateApp.listen(apiConfigService.getPrivateApiPort());
    }
    if (apiConfigService.getIsTransactionProcessorCronActive()) {
        const processorApp = await core_1.NestFactory.create(transaction_processor_module_1.TransactionProcessorModule);
        await processorApp.listen(5001);
    }
    if (apiConfigService.getIsWebsocketSubscriptionActive()) {
        const websocketSubscriptionApp = await core_1.NestFactory.create(websocket_subscription_module_1.WebsocketSubscriptionModule);
        websocketSubscriptionApp.useWebSocketAdapter(new platform_socket_io_1.IoAdapter(websocketSubscriptionApp));
        await websocketSubscriptionApp.listen(apiConfigService.getWebsocketSubscriptionPort());
    }
    if (apiConfigService.getIsCacheWarmerCronActive()) {
        const cacheWarmerApp = await core_1.NestFactory.create(cache_warmer_module_1.CacheWarmerModule);
        await configureCacheWarmerApp(cacheWarmerApp, apiConfigService);
        await cacheWarmerApp.listen(6001);
    }
    if (apiConfigService.getIsTransactionCompletedCronActive()) {
        const processorApp = await core_1.NestFactory.create(transaction_completed_module_1.TransactionCompletedModule);
        await processorApp.listen(7001);
    }
    if (apiConfigService.getIsTransactionBatchCronActive()) {
        const processorApp = await core_1.NestFactory.create(batch_transaction_processor_module_1.BatchTransactionProcessorModule);
        await processorApp.listen(7002);
    }
    if (apiConfigService.getIsElasticUpdaterCronActive()) {
        const elasticUpdaterApp = await core_1.NestFactory.create(elastic_updater_module_1.ElasticUpdaterModule);
        await elasticUpdaterApp.listen(8001);
    }
    if (apiConfigService.getIsApiStatusCheckerActive()) {
        const cacheApiStatusChecker = await core_1.NestFactory.create(status_checker_module_1.StatusCheckerModule);
        await cacheApiStatusChecker.listen(9001);
    }
    if (apiConfigService.getIsQueueWorkerCronActive()) {
        const queueWorkerApp = await core_1.NestFactory.createMicroservice(nft_queue_module_1.NftQueueModule, {
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: [apiConfigService.getRabbitmqUrl()],
                queue: apiConfigService.getNftQueueName(),
                noAck: false,
                prefetchCount: apiConfigService.getNftProcessParallelism(),
                queueOptions: {
                    durable: true,
                    deadLetterExchange: apiConfigService.getNftQueueDlqName(),
                },
            },
        });
        await queueWorkerApp.listen();
    }
    if (apiConfigService.isEventsNotifierFeatureActive()) {
        const eventsNotifierApp = await core_1.NestFactory.create(rabbitmq_module_1.RabbitMqModule.register());
        await eventsNotifierApp.listen(apiConfigService.getEventsNotifierFeaturePort());
    }
    const pubSubApp = await core_1.NestFactory.createMicroservice(pub_sub_listener_module_1.PubSubListenerModule, {
        transport: microservices_1.Transport.REDIS,
        options: {
            host: apiConfigService.getRedisUrl(),
            port: 6379,
            retryAttempts: 100,
            retryDelay: 1000,
            retryStrategy: () => 1000,
        },
    });
    pubSubApp.useLogger(pubSubApp.get(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER));
    pubSubApp.useWebSocketAdapter(new socket_adapter_1.SocketAdapter(pubSubApp));
    pubSubApp.listen();
    logger.log(`Public API active: ${apiConfigService.getIsPublicApiActive()}`);
    logger.log(`Private API active: ${apiConfigService.getIsPrivateApiActive()}`);
    logger.log(`Transaction processor cron active: ${apiConfigService.getIsTransactionProcessorCronActive()}`);
    logger.log(`Transaction completed cron active: ${apiConfigService.getIsTransactionCompletedCronActive()}`);
    logger.log(`Transaction batch cron active: ${apiConfigService.getIsTransactionBatchCronActive()}`);
    logger.log(`Cache warmer active: ${apiConfigService.getIsCacheWarmerCronActive()}`);
    logger.log(`Queue worker active: ${apiConfigService.getIsQueueWorkerCronActive()}`);
    logger.log(`Elastic updater active: ${apiConfigService.getIsElasticUpdaterCronActive()}`);
    logger.log(`Events notifier feature active: ${apiConfigService.isEventsNotifierFeatureActive()}`);
    logger.log(`Exchange feature active: ${apiConfigService.isExchangeEnabled()}`);
    logger.log(`Marketplace feature active: ${apiConfigService.isMarketplaceFeatureEnabled()}`);
    logger.log(`Auth active: ${apiConfigService.getIsAuthActive()}`);
    logger.log(`WebSocket subscription active: ${apiConfigService.getIsWebsocketSubscriptionActive()}`);
    logger.log(`Use tracing: ${apiConfigService.getUseTracingFlag()}`);
    logger.log(`Process NFTs flag: ${apiConfigService.getIsProcessNftsFlagActive()}`);
    logger.log(`Staking v4 enabled: ${apiConfigService.isStakingV4Enabled()}`);
    logger.log(`Events notifier enabled: ${apiConfigService.isEventsNotifierFeatureActive()}`);
    logger.log(`Guest caching enabled: ${apiConfigService.isGuestCacheFeatureActive()}`);
    logger.log(`Transaction pool enabled: ${apiConfigService.isTransactionPoolEnabled()}`);
    logger.log(`Transaction pool cache warmer enabled: ${apiConfigService.isTransactionPoolCacheWarmerEnabled()}`);
}
async function configurePublicApp(publicApp, apiConfigService) {
    if (apiConfigService.getCompressionEnabled()) {
        publicApp.use((0, compression_1.default)({
            filter: (req, res) => {
                if (req.headers['x-no-compression']) {
                    return false;
                }
                return compression_1.default.filter(req, res);
            },
            level: apiConfigService.getCompressionLevel(),
            threshold: apiConfigService.getCompressionThreshold(),
            memLevel: 8,
            chunkSize: apiConfigService.getCompressionChunkSize(),
        }));
    }
    publicApp.use(bodyParser.json({ limit: '1mb' }));
    publicApp.use(requestIp.mw());
    publicApp.enableCors();
    publicApp.useLogger(publicApp.get(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER));
    publicApp.disable('etag');
    publicApp.disable('x-powered-by');
    publicApp.useStaticAssets((0, path_1.join)(__dirname, 'public/assets'));
    const metricsService = publicApp.get(sdk_nestjs_monitoring_1.MetricsService);
    const pluginService = publicApp.get(plugin_service_1.PluginService);
    const httpAdapterHostService = publicApp.get(core_1.HttpAdapterHost);
    const cachingService = publicApp.get(sdk_nestjs_cache_1.CacheService);
    const settingsService = publicApp.get(settings_service_1.SettingsService);
    if (apiConfigService.getIsAuthActive()) {
        publicApp.useGlobalGuards(new sdk_nestjs_auth_1.JwtOrNativeAuthGuard(new drtnest_config_service_impl_service_1.DrtnestConfigServiceImpl(apiConfigService), cachingService));
    }
    const httpServer = httpAdapterHostService.httpAdapter.getHttpServer();
    httpServer.keepAliveTimeout = apiConfigService.getServerTimeout();
    httpServer.headersTimeout = apiConfigService.getHeadersTimeout();
    const globalInterceptors = [];
    globalInterceptors.push(new sdk_nestjs_http_1.QueryCheckInterceptor(httpAdapterHostService));
    if (apiConfigService.isGuestCacheFeatureActive()) {
        const guestCacheService = publicApp.get(sdk_nestjs_cache_1.GuestCacheService);
        globalInterceptors.push(new sdk_nestjs_cache_1.GuestCacheInterceptor(guestCacheService, {
            ignoreAuthorizationHeader: true,
        }));
    }
    globalInterceptors.push(new sdk_nestjs_http_1.OriginInterceptor());
    globalInterceptors.push(new sdk_nestjs_http_1.ComplexityInterceptor());
    globalInterceptors.push(new sdk_nestjs_monitoring_1.RequestCpuTimeInterceptor(metricsService));
    globalInterceptors.push(new sdk_nestjs_monitoring_1.LoggingInterceptor(metricsService));
    const getUseRequestCachingFlag = await settingsService.getUseRequestCachingFlag();
    const cacheDuration = apiConfigService.getCacheDuration();
    if (getUseRequestCachingFlag) {
        const cachingInterceptor = new sdk_nestjs_cache_1.CachingInterceptor(cachingService, httpAdapterHostService, metricsService, cacheDuration);
        globalInterceptors.push(cachingInterceptor);
    }
    globalInterceptors.push(new sdk_nestjs_http_1.ExcludeFieldsInterceptor());
    globalInterceptors.push(new sdk_nestjs_http_1.FieldsInterceptor());
    const getUseRequestLoggingFlag = await settingsService.getUseRequestLoggingFlag();
    if (getUseRequestLoggingFlag) {
        globalInterceptors.push(new sdk_nestjs_monitoring_1.LogRequestsInterceptor(httpAdapterHostService));
    }
    globalInterceptors.push(new sdk_nestjs_http_1.ExtractInterceptor());
    globalInterceptors.push(new sdk_nestjs_http_1.CleanupInterceptor());
    globalInterceptors.push(new sdk_nestjs_http_1.PaginationInterceptor(apiConfigService.getIndexerMaxPagination()));
    globalInterceptors.push(new transaction_logging_interceptor_1.TransactionLoggingInterceptor());
    await pluginService.bootstrapPublicApp(publicApp);
    publicApp.useGlobalInterceptors(...globalInterceptors);
    const description = (0, fs_1.readFileSync)((0, path_1.join)(__dirname, '..', 'docs', 'swagger.md'), 'utf8');
    const documentBuilder = new swagger_1.DocumentBuilder()
        .setTitle('Dharitri API')
        .setDescription(description)
        .setVersion('1.8.0')
        .setExternalDoc('Find out more about Dharitri API', 'https://docs.dharitri.org/sdk-and-tools/rest-api/rest-api/');
    const config = documentBuilder.build();
    const options = {
        customSiteTitle: 'Dharitri API',
        customCss: `.topbar-wrapper img
          {
            content:url(\'/img/drt-ledger-icon-mint.png\'); width:100px; height:auto;
          }
          .swagger-ui .topbar { background-color: #FAFAFA; }
          .swagger-ui .scheme-container {background-color: #FAFAFA;}`,
        customfavIcon: '/img/drt-ledger-icon-mint.png',
        swaggerOptions: {
            filter: true,
            displayRequestDuration: true,
        },
    };
    const document = swagger_1.SwaggerModule.createDocument(publicApp, config);
    swagger_1.SwaggerModule.setup('docs', publicApp, document, options);
    swagger_1.SwaggerModule.setup('', publicApp, document, options);
    const logger = new common_1.Logger('Public App initializer');
    logger.log(`Use request caching: ${await settingsService.getUseRequestCachingFlag()}`);
    logger.log(`Use request logging: ${await settingsService.getUseRequestLoggingFlag()}`);
    logger.log(`Use vm query tracing: ${await settingsService.getUseVmQueryTracingFlag()}`);
    logger.log(`Compression enabled: ${apiConfigService.getCompressionEnabled()}`);
    if (apiConfigService.getCompressionEnabled()) {
        logger.log(`Compression level: ${apiConfigService.getCompressionLevel()} (threshold: ${apiConfigService.getCompressionThreshold()} bytes)`);
    }
}
async function configureCacheWarmerApp(cacheWarmerApp, apiConfigService) {
    const indexerService = cacheWarmerApp.get(indexer_service_1.IndexerService);
    const logger = new common_1.Logger('Cache warmer initializer');
    try {
        if (apiConfigService.isUpdateAccountExtraDetailsEnabled()) {
            await indexerService.ensureAccountsWritable();
        }
        if (apiConfigService.isUpdateCollectionExtraDetailsEnabled()) {
            await indexerService.ensureTokensWritable();
        }
    }
    catch (error) {
        if (error instanceof not_writable_error_1.NotWritableError) {
            logger.error(error.message);
        }
        else {
            logger.error(`An unhandled error occurred while ensuring database schema is writable`);
            logger.error(error);
        }
        process.kill(process.pid, 'SIGTERM');
    }
    logger.log(`Update account extra details: ${apiConfigService.isUpdateAccountExtraDetailsEnabled()}`);
    logger.log(`Update collection extra details: ${apiConfigService.isUpdateCollectionExtraDetailsEnabled()}`);
}
bootstrap();
redis_1.RedisClient.prototype.on_error = function (err) {
    if (this.closing) {
        return;
    }
    err.message =
        'Redis connection to ' + this.address + ' failed - ' + err.message;
    this.connected = false;
    this.ready = false;
    if (!this.options.retry_strategy) {
    }
    this.connection_gone('error', err);
};
//# sourceMappingURL=main.js.map