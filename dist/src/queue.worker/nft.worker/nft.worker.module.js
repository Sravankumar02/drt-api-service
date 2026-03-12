"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftWorkerModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const persistence_module_1 = require("../../common/persistence/persistence.module");
const nft_worker_service_1 = require("./nft.worker.service");
const nft_asset_module_1 = require("./queue/job-services/assets/nft.asset.module");
const nft_media_module_1 = require("./queue/job-services/media/nft.media.module");
const nft_metadata_module_1 = require("./queue/job-services/metadata/nft.metadata.module");
const nft_thumbnail_module_1 = require("./queue/job-services/thumbnails/nft.thumbnail.module");
let NftWorkerModule = class NftWorkerModule {
};
NftWorkerModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nft_media_module_1.NftMediaModule,
            nft_metadata_module_1.NftMetadataModule,
            nft_thumbnail_module_1.NftThumbnailModule,
            nft_asset_module_1.NftAssetModule,
            persistence_module_1.PersistenceModule.forRoot(),
        ],
        providers: [
            nft_worker_service_1.NftWorkerService,
            {
                provide: 'QUEUE_SERVICE',
                useFactory: (configService) => {
                    return microservices_1.ClientProxyFactory.create({
                        transport: microservices_1.Transport.RMQ,
                        options: {
                            urls: [configService.getRabbitmqUrl()],
                            queue: configService.getNftQueueName(),
                            prefetchCount: configService.getNftProcessParallelism(),
                            queueOptions: {
                                durable: true,
                                deadLetterExchange: configService.getNftQueueDlqName(),
                            },
                        },
                    });
                },
                inject: [api_config_service_1.ApiConfigService],
            }
        ],
        exports: [nft_worker_service_1.NftWorkerService],
    })
], NftWorkerModule);
exports.NftWorkerModule = NftWorkerModule;
//# sourceMappingURL=nft.worker.module.js.map