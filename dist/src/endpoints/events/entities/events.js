"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
const swagger_1 = require("@nestjs/swagger");
let Events = class Events {
    constructor(init) {
        this.txHash = '';
        this.logAddress = '';
        this.identifier = '';
        this.address = '';
        this.data = '';
        this.topics = [];
        this.shardID = 0;
        this.additionalData = [];
        this.txOrder = 0;
        this.order = 0;
        this.timestamp = 0;
        Object.assign(this, init);
    }
};
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: "Transaction hash." }),
    tslib_1.__metadata("design:type", String)
], Events.prototype, "txHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: "Log address." }),
    tslib_1.__metadata("design:type", String)
], Events.prototype, "logAddress", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: "Event identifier." }),
    tslib_1.__metadata("design:type", String)
], Events.prototype, "identifier", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: "Event address." }),
    tslib_1.__metadata("design:type", String)
], Events.prototype, "address", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: "Event data." }),
    tslib_1.__metadata("design:type", String)
], Events.prototype, "data", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: "Event topics." }),
    tslib_1.__metadata("design:type", Array)
], Events.prototype, "topics", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: "Event shard ID." }),
    tslib_1.__metadata("design:type", Number)
], Events.prototype, "shardID", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: "Event additional data." }),
    tslib_1.__metadata("design:type", Array)
], Events.prototype, "additionalData", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: "Event tx order." }),
    tslib_1.__metadata("design:type", Number)
], Events.prototype, "txOrder", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: "Event block order." }),
    tslib_1.__metadata("design:type", Number)
], Events.prototype, "order", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: "Event timestamp." }),
    tslib_1.__metadata("design:type", Number)
], Events.prototype, "timestamp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: "Event timestamp in milliseconds.", nullable: true, required: false }),
    tslib_1.__metadata("design:type", Number)
], Events.prototype, "timestampMs", void 0);
Events = tslib_1.__decorate([
    (0, graphql_1.ObjectType)("Events", { description: "Events object type." }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Events);
exports.Events = Events;
//# sourceMappingURL=events.js.map