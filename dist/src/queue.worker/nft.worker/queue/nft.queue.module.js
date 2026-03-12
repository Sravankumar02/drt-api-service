"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftQueueModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const nft_queue_controller_1 = require("./nft.queue.controller");
const nft_job_processor_module_1 = require("./job-services/nft.job.processor.module");
const nft_module_1 = require("../../../endpoints/nfts/nft.module");
const dynamic_module_utils_1 = require("../../../utils/dynamic.module.utils");
let NftQueueModule = class NftQueueModule {
};
NftQueueModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nft_job_processor_module_1.NftJobProcessorModule,
            nft_module_1.NftModule,
        ],
        providers: [
            dynamic_module_utils_1.DynamicModuleUtils.getPubSubService(),
        ],
        controllers: [nft_queue_controller_1.NftQueueController],
        exports: [],
    })
], NftQueueModule);
exports.NftQueueModule = NftQueueModule;
//# sourceMappingURL=nft.queue.module.js.map