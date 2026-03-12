"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const indexer_service_1 = require("../../common/indexer/indexer.service");
const events_1 = require("./entities/events");
let EventsService = class EventsService {
    constructor(indexerService) {
        this.indexerService = indexerService;
    }
    async getEvents(pagination, filter) {
        const results = await this.indexerService.getEvents(pagination, filter);
        return results ? results.map(this.mapEvent) : [];
    }
    async getEvent(txHash) {
        const result = await this.indexerService.getEvent(txHash);
        return result ? new events_1.Events(this.mapEvent(result)) : undefined;
    }
    async getEventsCount(filter) {
        return await this.indexerService.getEventsCount(filter);
    }
    mapEvent(eventData) {
        return new events_1.Events({
            txHash: eventData._id,
            logAddress: eventData.logAddress,
            identifier: eventData.identifier,
            address: eventData.address,
            data: eventData.data,
            topics: eventData.topics,
            shardID: eventData.shardID,
            additionalData: eventData.additionalData,
            txOrder: eventData.txOrder,
            order: eventData.order,
            timestamp: eventData.timestamp,
        });
    }
};
EventsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [indexer_service_1.IndexerService])
], EventsService);
exports.EventsService = EventsService;
//# sourceMappingURL=events.service.js.map