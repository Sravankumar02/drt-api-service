"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const events_service_1 = require("./events.service");
const query_pagination_1 = require("../../common/entities/query.pagination");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const events_1 = require("./entities/events");
const events_filter_1 = require("./entities/events.filter");
const timestamp_parse_pipe_1 = require("../../utils/timestamp.parse.pipe");
let EventsController = class EventsController {
    constructor(eventsService) {
        this.eventsService = eventsService;
    }
    async getEvents(from, size, address, logAddress, identifier, txHash, shard, before, after, order, topics) {
        const topicsArray = topics ? (Array.isArray(topics) ? topics : [topics]) : [];
        return await this.eventsService.getEvents(new query_pagination_1.QueryPagination({ from, size }), new events_filter_1.EventsFilter({ address, logAddress, identifier, txHash, shard, after, before, order, topics: topicsArray }));
    }
    async getEventsCount(address, identifier, txHash, shard, before, after, topics) {
        const topicsArray = topics ? (Array.isArray(topics) ? topics : [topics]) : [];
        return await this.eventsService.getEventsCount(new events_filter_1.EventsFilter({ address, identifier, txHash, shard, after, before, topics: topicsArray }));
    }
    async getEvent(txHash) {
        const result = await this.eventsService.getEvent(txHash);
        if (!result) {
            throw new common_1.NotFoundException('Event not found');
        }
        return result;
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('/events'),
    (0, swagger_1.ApiOperation)({ summary: 'Events', description: 'Returns events' }),
    (0, swagger_1.ApiOkResponse)({ type: [events_1.Events] }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'address', description: 'Event address', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'logAddress', description: 'Event log address', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'identifier', description: 'Event identifier', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'txHash', description: 'Event transaction hash', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'shard', description: 'Event shard id', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Event before timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'Event after timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'order', description: 'Event order', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'topics', description: 'Event topics to filter by', required: false, isArray: true }),
    tslib_1.__param(0, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(3, (0, common_1.Query)('logAddress', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(4, (0, common_1.Query)('identifier')),
    tslib_1.__param(5, (0, common_1.Query)('txHash')),
    tslib_1.__param(6, (0, common_1.Query)('shard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(7, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(8, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(9, (0, common_1.Query)('order', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(10, (0, common_1.Query)('topics')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String, String, String, Number, Number, Number, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EventsController.prototype, "getEvents", null);
tslib_1.__decorate([
    (0, common_1.Get)('/events/count'),
    (0, swagger_1.ApiOperation)({ summary: 'Events count', description: 'Returns events count' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'address', description: 'Event address', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'identifier', description: 'Event identifier', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'txHash', description: 'Event transaction hash', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'shard', description: 'Event shard id', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'before', description: 'Event before timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'after', description: 'Event after timestamp or timestampMs', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'topics', description: 'Event topics to filter by', required: false, isArray: true }),
    tslib_1.__param(0, (0, common_1.Query)('address', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(1, (0, common_1.Query)('identifier')),
    tslib_1.__param(2, (0, common_1.Query)('txHash')),
    tslib_1.__param(3, (0, common_1.Query)('shard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(4, (0, common_1.Query)('before', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(5, (0, common_1.Query)('after', timestamp_parse_pipe_1.TimestampParsePipe)),
    tslib_1.__param(6, (0, common_1.Query)('topics')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String, Number, Number, Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], EventsController.prototype, "getEventsCount", null);
tslib_1.__decorate([
    (0, common_1.Get)('/events/:txHash'),
    (0, swagger_1.ApiOperation)({ summary: 'Event', description: 'Returns event' }),
    (0, swagger_1.ApiOkResponse)({ type: events_1.Events }),
    tslib_1.__param(0, (0, common_1.Param)('txHash')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], EventsController.prototype, "getEvent", null);
EventsController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('events'),
    tslib_1.__metadata("design:paramtypes", [events_service_1.EventsService])
], EventsController);
exports.EventsController = EventsController;
//# sourceMappingURL=events.controller.js.map