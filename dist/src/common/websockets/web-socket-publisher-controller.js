"use strict";
var WebSocketPublisherController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketPublisherController = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const web_socket_publisher_service_1 = require("./web-socket-publisher-service");
const event_emitter_1 = require("@nestjs/event-emitter");
const metrics_events_constants_1 = require("../../utils/metrics-events.constants");
let WebSocketPublisherController = WebSocketPublisherController_1 = class WebSocketPublisherController {
    constructor(webSocketPublisherService, eventEmitter) {
        this.webSocketPublisherService = webSocketPublisherService;
        this.eventEmitter = eventEmitter;
        this.logger = new sdk_nestjs_common_1.OriginLogger(WebSocketPublisherController_1.name);
    }
    async transactionsCompleted(transactions) {
        for (const transaction of transactions) {
            await this.webSocketPublisherService.onTransactionCompleted(transaction);
        }
        this.eventEmitter.emit(metrics_events_constants_1.MetricsEvents.SetTransactionsCompleted, {
            transactions,
        });
    }
    async transactionsPendingResults(transactions) {
        for (const transaction of transactions) {
            await this.webSocketPublisherService.onTransactionPendingResults(transaction);
        }
        this.eventEmitter.emit(metrics_events_constants_1.MetricsEvents.SetTransactionsPendingResults, {
            transactions,
        });
    }
    onBatchUpdated(payload) {
        this.logger.log(`Notifying batch updated for address ${payload.address}, batch id '${payload.batchId}', hashes ${payload.txHashes} `);
        this.webSocketPublisherService.onBatchUpdated(payload.address, payload.batchId, payload.txHashes);
        this.eventEmitter.emit(metrics_events_constants_1.MetricsEvents.SetBatchUpdated);
    }
};
tslib_1.__decorate([
    (0, microservices_1.EventPattern)('transactionsCompleted'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], WebSocketPublisherController.prototype, "transactionsCompleted", null);
tslib_1.__decorate([
    (0, microservices_1.EventPattern)('transactionsPendingResults'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], WebSocketPublisherController.prototype, "transactionsPendingResults", null);
tslib_1.__decorate([
    (0, microservices_1.EventPattern)('onBatchUpdated'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], WebSocketPublisherController.prototype, "onBatchUpdated", null);
WebSocketPublisherController = WebSocketPublisherController_1 = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [web_socket_publisher_service_1.WebSocketPublisherService,
        event_emitter_1.EventEmitter2])
], WebSocketPublisherController);
exports.WebSocketPublisherController = WebSocketPublisherController;
//# sourceMappingURL=web-socket-publisher-controller.js.map