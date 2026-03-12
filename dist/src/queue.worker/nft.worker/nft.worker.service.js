"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftWorkerService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const nft_thumbnail_service_1 = require("./queue/job-services/thumbnails/nft.thumbnail.service");
const nft_metadata_service_1 = require("./queue/job-services/metadata/nft.metadata.service");
const nft_media_service_1 = require("./queue/job-services/media/nft.media.service");
const microservices_1 = require("@nestjs/microservices");
const nft_message_1 = require("./queue/entities/nft.message");
const nft_asset_service_1 = require("./queue/job-services/assets/nft.asset.service");
const persistence_service_1 = require("../../common/persistence/persistence.service");
const api_config_service_1 = require("../../common/api-config/api.config.service");
let NftWorkerService = class NftWorkerService {
    constructor(nftThumbnailService, nftMetadataService, nftMediaService, nftAssetService, client, persistenceService, apiConfigService) {
        this.nftThumbnailService = nftThumbnailService;
        this.nftMetadataService = nftMetadataService;
        this.nftMediaService = nftMediaService;
        this.nftAssetService = nftAssetService;
        this.client = client;
        this.persistenceService = persistenceService;
        this.apiConfigService = apiConfigService;
    }
    async addProcessNftQueueJob(nft, settings) {
        var _a, _b;
        nft.metadata = (_a = await this.nftMetadataService.getMetadata(nft)) !== null && _a !== void 0 ? _a : undefined;
        nft.media = (_b = await this.nftMediaService.getMedia(nft.identifier)) !== null && _b !== void 0 ? _b : undefined;
        const needsProcessing = await this.needsProcessing(nft, settings);
        if (!needsProcessing) {
            return false;
        }
        const message = new nft_message_1.NftMessage();
        message.identifier = nft.identifier;
        message.settings = settings;
        this.client.send({
            cmd: this.apiConfigService.getNftQueueName(),
        }, message).subscribe();
        return true;
    }
    async needsProcessing(nft, settings) {
        if (settings.forceRefreshMedia || settings.forceRefreshMetadata || settings.forceRefreshThumbnail) {
            return true;
        }
        const media = await this.persistenceService.getMedia(nft.identifier);
        if (media === null) {
            return true;
        }
        if (!nft.metadata) {
            return true;
        }
        if (!settings.skipRefreshThumbnail) {
            if (nft.media) {
                for (const media of nft.media) {
                    const hasThumbnailGenerated = await this.nftThumbnailService.hasThumbnailGenerated(nft.identifier, media.url);
                    if (!hasThumbnailGenerated) {
                        return true;
                    }
                }
            }
        }
        if (settings.uploadAsset) {
            for (const mediaItem of media) {
                const isAssetUploaded = await this.nftAssetService.isAssetUploaded(mediaItem);
                if (!isAssetUploaded) {
                    return true;
                }
            }
        }
        return false;
    }
};
NftWorkerService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(4, (0, common_1.Inject)('QUEUE_SERVICE')),
    tslib_1.__metadata("design:paramtypes", [nft_thumbnail_service_1.NftThumbnailService,
        nft_metadata_service_1.NftMetadataService,
        nft_media_service_1.NftMediaService,
        nft_asset_service_1.NftAssetService,
        microservices_1.ClientProxy,
        persistence_service_1.PersistenceService,
        api_config_service_1.ApiConfigService])
], NftWorkerService);
exports.NftWorkerService = NftWorkerService;
//# sourceMappingURL=nft.worker.service.js.map