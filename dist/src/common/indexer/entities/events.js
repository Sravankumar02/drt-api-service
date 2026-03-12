"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
class Events {
    constructor() {
        this._id = '';
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
    }
}
exports.Events = Events;
//# sourceMappingURL=events.js.map