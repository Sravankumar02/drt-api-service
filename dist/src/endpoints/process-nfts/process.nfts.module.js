"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessNftsModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const nft_worker_module_1 = require("../../queue.worker/nft.worker/nft.worker.module");
const account_module_1 = require("../accounts/account.module");
const collection_module_1 = require("../collections/collection.module");
const nft_module_1 = require("../nfts/nft.module");
const process_nfts_service_1 = require("./process.nfts.service");
let ProcessNftsModule = class ProcessNftsModule {
};
ProcessNftsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nft_worker_module_1.NftWorkerModule,
            nft_module_1.NftModule,
            collection_module_1.CollectionModule,
            account_module_1.AccountModule,
        ],
        providers: [
            process_nfts_service_1.ProcessNftsService,
        ],
        exports: [
            process_nfts_service_1.ProcessNftsService,
        ],
    })
], ProcessNftsModule);
exports.ProcessNftsModule = ProcessNftsModule;
//# sourceMappingURL=process.nfts.module.js.map