"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftCronModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const nft_worker_module_1 = require("../../queue.worker/nft.worker/nft.worker.module");
const collection_module_1 = require("../../endpoints/collections/collection.module");
const nft_module_1 = require("../../endpoints/nfts/nft.module");
const nft_cron_service_1 = require("./nft.cron.service");
const dynamic_module_utils_1 = require("../../utils/dynamic.module.utils");
const nft_asset_module_1 = require("../../queue.worker/nft.worker/queue/job-services/assets/nft.asset.module");
let NftCronModule = class NftCronModule {
};
NftCronModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            nft_worker_module_1.NftWorkerModule,
            nft_module_1.NftModule,
            collection_module_1.CollectionModule,
            nft_asset_module_1.NftAssetModule,
            dynamic_module_utils_1.DynamicModuleUtils.getCacheModule(),
        ],
        providers: [
            nft_cron_service_1.NftCronService,
        ],
    })
], NftCronModule);
exports.NftCronModule = NftCronModule;
//# sourceMappingURL=nft.cron.module.js.map