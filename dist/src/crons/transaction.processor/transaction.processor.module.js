"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionProcessorModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const nft_module_1 = require("../../endpoints/nfts/nft.module");
const node_module_1 = require("../../endpoints/nodes/node.module");
const shard_module_1 = require("../../endpoints/shards/shard.module");
const transaction_module_1 = require("../../endpoints/transactions/transaction.module");
const nft_worker_module_1 = require("../../queue.worker/nft.worker/nft.worker.module");
const dynamic_module_utils_1 = require("../../utils/dynamic.module.utils");
const transaction_processor_service_1 = require("./transaction.processor.service");
let TransactionProcessorModule = class TransactionProcessorModule {
};
TransactionProcessorModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            transaction_module_1.TransactionModule,
            shard_module_1.ShardModule,
            node_module_1.NodeModule,
            nft_module_1.NftModule,
            nft_worker_module_1.NftWorkerModule,
        ],
        providers: [
            dynamic_module_utils_1.DynamicModuleUtils.getPubSubService(),
            transaction_processor_service_1.TransactionProcessorService,
        ],
    })
], TransactionProcessorModule);
exports.TransactionProcessorModule = TransactionProcessorModule;
//# sourceMappingURL=transaction.processor.module.js.map