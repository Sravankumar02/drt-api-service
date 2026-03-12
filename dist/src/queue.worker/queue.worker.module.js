"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueWorkerModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const nft_queue_module_1 = require("./nft.worker/queue/nft.queue.module");
let QueueWorkerModule = class QueueWorkerModule {
};
QueueWorkerModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nft_queue_module_1.NftQueueModule,
        ],
        controllers: [],
        providers: [],
    })
], QueueWorkerModule);
exports.QueueWorkerModule = QueueWorkerModule;
//# sourceMappingURL=queue.worker.module.js.map