"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketCronService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const transaction_gateway_1 = require("./transaction.gateway");
const blocks_gateway_1 = require("./blocks.gateway");
const network_gateway_1 = require("./network.gateway");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const pool_gateway_1 = require("./pool.gateway");
const events_gateway_1 = require("./events.gateway");
const websockets_1 = require("@nestjs/websockets");
const event_emitter_1 = require("@nestjs/event-emitter");
const metrics_events_constants_1 = require("../../utils/metrics-events.constants");
const socket_io_1 = require("socket.io");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const cache_info_1 = require("../../utils/cache.info");
const round_service_1 = require("../../endpoints/rounds/round.service");
const round_filter_1 = require("../../endpoints/rounds/entities/round.filter");
const sdk_nestjs_elastic_1 = require("@sravankumar02/sdk-nestjs-elastic");
const network_service_1 = require("../../endpoints/network/network.service");
const transaction_custom_gateway_1 = require("./transaction.custom.gateway");
const connection_handler_1 = require("./connection.handler");
const events_custom_gateway_1 = require("./events.custom.gateway");
const transfers_custom_gateway_1 = require("./transfers.custom.gateway");
const api_config_service_1 = require("../../common/api-config/api.config.service");
let WebsocketCronService = class WebsocketCronService {
    constructor(transactionsGateway, blocksGateway, networkGateway, poolGateway, eventsGateway, eventEmitter, cacheService, roundService, elasticService, networkService, transactionsCustomGateway, eventsCustomGateway, connectionHandler, transfersCustomGateway, apiConfigService, schedulerRegistry) {
        this.transactionsGateway = transactionsGateway;
        this.blocksGateway = blocksGateway;
        this.networkGateway = networkGateway;
        this.poolGateway = poolGateway;
        this.eventsGateway = eventsGateway;
        this.eventEmitter = eventEmitter;
        this.cacheService = cacheService;
        this.roundService = roundService;
        this.elasticService = elasticService;
        this.networkService = networkService;
        this.transactionsCustomGateway = transactionsCustomGateway;
        this.eventsCustomGateway = eventsCustomGateway;
        this.connectionHandler = connectionHandler;
        this.transfersCustomGateway = transfersCustomGateway;
        this.apiConfigService = apiConfigService;
        this.schedulerRegistry = schedulerRegistry;
    }
    onModuleInit() {
        const intervalMs = this.apiConfigService.getWebsocketSubscriptionBroadcastIntervalMs();
        this.registerDynamicInterval('push-transactions', intervalMs, 'Push transactions to subscribers', () => this.handleTransactionsUpdate());
        this.registerDynamicInterval('push-blocks', intervalMs, 'Push blocks to subscribers', () => this.handleBlocksUpdate());
        this.registerDynamicInterval('push-stats', intervalMs, 'Push stats to subscribers', () => this.handleStatsUpdate());
        this.registerDynamicInterval('push-pool', intervalMs, 'Push pool transactions to subscribers', () => this.handlePoolUpdate());
        this.registerDynamicInterval('push-events', intervalMs, 'Push events to subscribers', () => this.handleEventsUpdate());
        this.registerDynamicInterval('push-custom-data', intervalMs, 'Push custom data to subscribers', () => this.handleCustomDataUpdate());
    }
    registerDynamicInterval(name, ms, lockMessage, callback) {
        const interval = setInterval(async () => {
            await sdk_nestjs_common_1.Locker.lock(lockMessage, async () => {
                await callback();
            }, true);
        }, ms);
        this.schedulerRegistry.addInterval(name, interval);
    }
    async handleTransactionsUpdate() {
        await this.transactionsGateway.pushTransactions();
    }
    async handleBlocksUpdate() {
        await this.blocksGateway.pushBlocks();
    }
    async handleStatsUpdate() {
        await this.networkGateway.pushStats();
    }
    async handlePoolUpdate() {
        await this.poolGateway.pushPool();
    }
    async handleEventsUpdate() {
        await this.eventsGateway.pushEvents();
    }
    async handleCustomDataUpdate() {
        var _a;
        if (this.connectionHandler.hasSubscriptionsWithPrefixes([transaction_custom_gateway_1.TransactionsCustomGateway.keyPrefix, transfers_custom_gateway_1.TransfersCustomGateway.keyPrefix, events_custom_gateway_1.EventsCustomGateway.keyPrefix]) === false) {
            this.cacheService.deleteLocal(cache_info_1.CacheInfo.WsTimestampMsToProcess().key);
            return;
        }
        const latestRoundOnChainData = await this.getLatestRoundOnChainData();
        latestRoundOnChainData.timestampMs = (_a = latestRoundOnChainData.timestampMs) !== null && _a !== void 0 ? _a : latestRoundOnChainData.timestamp * 1000;
        let roundToProcessTimestampMs = await this.cacheService.getOrSetLocal(cache_info_1.CacheInfo.WsTimestampMsToProcess().key, async () => { var _a; return await Promise.resolve((_a = latestRoundOnChainData.timestampMs) !== null && _a !== void 0 ? _a : latestRoundOnChainData.timestamp * 1000); }, cache_info_1.CacheInfo.WsTimestampMsToProcess().ttl);
        const stats = await this.networkService.getStats();
        const pollingDelay = stats.refreshRate / 2;
        const pollingMaxAttempts = 10;
        while (roundToProcessTimestampMs <= latestRoundOnChainData.timestampMs) {
            await this.pollUntil(async () => await this.isElasticDataAvailableForTimestampMs(roundToProcessTimestampMs, stats), pollingDelay, pollingMaxAttempts);
            await Promise.all([
                this.transactionsCustomGateway.pushTransactionsForTimestampMs(roundToProcessTimestampMs),
                this.eventsCustomGateway.pushEventsForTimestampMs(roundToProcessTimestampMs),
                this.transfersCustomGateway.pushTransfersForTimestampMs(roundToProcessTimestampMs),
            ]);
            roundToProcessTimestampMs += stats.refreshRate;
        }
        this.cacheService.setLocal(cache_info_1.CacheInfo.WsTimestampMsToProcess().key, roundToProcessTimestampMs, cache_info_1.CacheInfo.WsTimestampMsToProcess().ttl);
    }
    handleWebsocketMetrics() {
        var _a, _b, _c;
        const connectedClients = (_a = this.server.sockets.sockets.size) !== null && _a !== void 0 ? _a : 0;
        const adapter = this.server.sockets.adapter;
        const sids = (_b = adapter === null || adapter === void 0 ? void 0 : adapter.sids) !== null && _b !== void 0 ? _b : new Map();
        const topicPrefixes = [
            { key: 'tx', prefix: transaction_gateway_1.TransactionsGateway.keyPrefix },
            { key: 'customTx', prefix: transaction_custom_gateway_1.TransactionsCustomGateway.keyPrefix },
            { key: 'events', prefix: events_gateway_1.EventsGateway.keyPrefix },
            { key: 'customEvents', prefix: events_custom_gateway_1.EventsCustomGateway.keyPrefix },
            { key: 'blocks', prefix: blocks_gateway_1.BlocksGateway.keyPrefix },
            { key: 'pool', prefix: pool_gateway_1.PoolGateway.keyPrefix },
            { key: 'stats', room: 'statsRoom' },
        ];
        const topics = {};
        for (const { key } of topicPrefixes)
            topics[key] = 0;
        if (sids && sids.size > 0) {
            for (const [, rooms] of sids) {
                const matched = {};
                for (const roomName of rooms) {
                    for (const { key, prefix } of topicPrefixes) {
                        if (!prefix || matched[key])
                            continue;
                        if (roomName.startsWith(prefix)) {
                            topics[key] += 1;
                            matched[key] = true;
                        }
                    }
                }
            }
        }
        const rooms = (_c = adapter === null || adapter === void 0 ? void 0 : adapter.rooms) !== null && _c !== void 0 ? _c : new Map();
        const statsRoomSet = rooms.get('statsRoom');
        if (statsRoomSet) {
            topics['stats'] = statsRoomSet.size;
        }
        this.eventEmitter.emit(metrics_events_constants_1.MetricsEvents.SetWebsocketMetrics, {
            connectedClients,
            topics,
        });
    }
    async getLatestRoundOnChainData() {
        const rounds = await this.roundService.getRounds(new round_filter_1.RoundFilter({ size: 1 }));
        return rounds[0];
    }
    async isElasticDataAvailableForTimestampMs(timestampMs, networkStats) {
        const nextRoundTimestampMs = timestampMs + networkStats.refreshRate;
        const rounds = await this.elasticService.getCount('rounds', sdk_nestjs_elastic_1.ElasticQuery.create().withMustCondition(sdk_nestjs_elastic_1.QueryType.Match('timestampMs', nextRoundTimestampMs)));
        return rounds === networkStats.shards + 1;
    }
    async pollUntil(conditionFn, intervalMs = 1000, maxAttempts = 30) {
        let attempts = 0;
        while (!await conditionFn()) {
            if (++attempts >= maxAttempts)
                throw new Error('Polling timeout exceeded');
            await new Promise(r => setTimeout(r, intervalMs));
        }
    }
};
tslib_1.__decorate([
    (0, websockets_1.WebSocketServer)(),
    tslib_1.__metadata("design:type", socket_io_1.Server)
], WebsocketCronService.prototype, "server", void 0);
tslib_1.__decorate([
    (0, schedule_1.Cron)('*/10 * * * * *'),
    (0, sdk_nestjs_common_1.Lock)({ name: 'Push websocket subscriptions metrics', verbose: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], WebsocketCronService.prototype, "handleWebsocketMetrics", null);
WebsocketCronService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' }, path: '/ws/subscription' }),
    tslib_1.__metadata("design:paramtypes", [transaction_gateway_1.TransactionsGateway,
        blocks_gateway_1.BlocksGateway,
        network_gateway_1.NetworkGateway,
        pool_gateway_1.PoolGateway,
        events_gateway_1.EventsGateway,
        event_emitter_1.EventEmitter2,
        sdk_nestjs_cache_1.CacheService,
        round_service_1.RoundService,
        sdk_nestjs_elastic_1.ElasticService,
        network_service_1.NetworkService,
        transaction_custom_gateway_1.TransactionsCustomGateway,
        events_custom_gateway_1.EventsCustomGateway,
        connection_handler_1.ConnectionHandler,
        transfers_custom_gateway_1.TransfersCustomGateway,
        api_config_service_1.ApiConfigService,
        schedule_1.SchedulerRegistry])
], WebsocketCronService);
exports.WebsocketCronService = WebsocketCronService;
//# sourceMappingURL=websocket.cron.service.js.map