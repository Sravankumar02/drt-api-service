"use strict";
var _a, _b, _c, _d, _e, _f;
var RabbitMqConsumer_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMqConsumer = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const rabbitmq_consumers_1 = require("./rabbitmq.consumers");
const rabbitmq_nft_handler_service_1 = require("./rabbitmq.nft.handler.service");
const configuration_1 = tslib_1.__importDefault(require("../../../config/configuration"));
const notifier_event_identifier_1 = require("./entities/notifier.event.identifier");
const rabbitmq_token_handler_service_1 = require("./rabbitmq.token.handler.service");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
let RabbitMqConsumer = RabbitMqConsumer_1 = class RabbitMqConsumer {
    constructor(nftHandlerService, tokenHandlerService) {
        this.nftHandlerService = nftHandlerService;
        this.tokenHandlerService = tokenHandlerService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(RabbitMqConsumer_1.name);
    }
    async consumeEvents(rawEvents) {
        try {
            const events = rawEvents === null || rawEvents === void 0 ? void 0 : rawEvents.events;
            if (events) {
                await Promise.all(events.map((event) => this.handleEvent(event)));
            }
        }
        catch (error) {
            this.logger.error(`An unhandled error occurred when consuming events: ${JSON.stringify(rawEvents)}`);
            this.logger.error(error);
        }
    }
    async handleEvent(event) {
        switch (event.identifier) {
            case notifier_event_identifier_1.NotifierEventIdentifier.DCDTNFTCreate:
                await this.nftHandlerService.handleNftCreateEvent(event);
                break;
            case notifier_event_identifier_1.NotifierEventIdentifier.DCDTNFTUpdateAttributes:
                await this.nftHandlerService.handleNftUpdateAttributesEvent(event);
                break;
            case notifier_event_identifier_1.NotifierEventIdentifier.DCDTNFTBurn:
                await this.nftHandlerService.handleNftBurnEvent(event);
                break;
            case notifier_event_identifier_1.NotifierEventIdentifier.DCDTMetaDataUpdate:
            case notifier_event_identifier_1.NotifierEventIdentifier.DCDTMetaDataRecreate:
                await this.nftHandlerService.handleNftMetadataEvent(event);
                break;
            case notifier_event_identifier_1.NotifierEventIdentifier.DCDTModifyCreator:
                await this.nftHandlerService.handleNftModifyCreatorEvent(event);
                break;
            case notifier_event_identifier_1.NotifierEventIdentifier.transferOwnership:
                await this.tokenHandlerService.handleTransferOwnershipEvent(event);
                break;
        }
    }
};
tslib_1.__decorate([
    (0, rabbitmq_consumers_1.CompetingRabbitConsumer)({
        exchange: 'all_events',
        queueName: (_c = (_b = (_a = (0, configuration_1.default)().features) === null || _a === void 0 ? void 0 : _a.eventsNotifier) === null || _b === void 0 ? void 0 : _b.queue) !== null && _c !== void 0 ? _c : 'api-process-logs-and-events',
        deadLetterExchange: (_f = (_e = (_d = (0, configuration_1.default)().features) === null || _d === void 0 ? void 0 : _d.eventsNotifier) === null || _e === void 0 ? void 0 : _e.dlx) !== null && _f !== void 0 ? _f : 'api-process-logs-and-events-dlx',
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RabbitMqConsumer.prototype, "consumeEvents", null);
RabbitMqConsumer = RabbitMqConsumer_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [rabbitmq_nft_handler_service_1.RabbitMqNftHandlerService,
        rabbitmq_token_handler_service_1.RabbitMqTokenHandlerService])
], RabbitMqConsumer);
exports.RabbitMqConsumer = RabbitMqConsumer;
//# sourceMappingURL=rabbitmq.consumer.js.map