"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const events_service_1 = require("./events.service");
let EventsModule = class EventsModule {
};
EventsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [events_service_1.EventsService],
        exports: [events_service_1.EventsService],
    })
], EventsModule);
exports.EventsModule = EventsModule;
//# sourceMappingURL=events.module.js.map