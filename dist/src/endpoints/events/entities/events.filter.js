"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsFilter = void 0;
class EventsFilter {
    constructor(init) {
        this.identifier = '';
        this.address = '';
        this.txHash = '';
        this.shard = 0;
        this.before = 0;
        this.after = 0;
        this.order = 0;
        this.logAddress = '';
        this.topics = [];
        Object.assign(this, init);
    }
}
exports.EventsFilter = EventsFilter;
//# sourceMappingURL=events.filter.js.map