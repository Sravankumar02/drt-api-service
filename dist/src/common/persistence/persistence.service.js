"use strict";
var _a;
var _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistenceService = void 0;
const tslib_1 = require("tslib");
const configuration_1 = tslib_1.__importDefault(require("../../../config/configuration"));
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const nft_media_db_1 = require("./entities/nft.media.db");
const nft_metadata_db_1 = require("./entities/nft.metadata.db");
const nft_trait_summary_db_1 = require("./entities/nft.trait.summary.db");
const metrics_events_constants_1 = require("../../utils/metrics-events.constants");
const log_performance_decorator_1 = require("../../utils/log.performance.decorator");
const keybase_confirmation_db_1 = require("./entities/keybase.confirmation.db");
const hot_swappable_setting_1 = require("./entities/hot.swappable.setting");
const typeorm_2 = require("@nestjs/typeorm");
const isPassThrough = process.env.PERSISTENCE === 'passthrough' || ((_a = (0, configuration_1.default)().database) === null || _a === void 0 ? void 0 : _a.enabled) === false;
let PersistenceService = class PersistenceService {
    constructor(nftMetadataRepository, nftMediaRepository, nftTraitSummaryRepository, keybaseConfirmationRepository, settingsRepository) {
        this.nftMetadataRepository = nftMetadataRepository;
        this.nftMediaRepository = nftMediaRepository;
        this.nftTraitSummaryRepository = nftTraitSummaryRepository;
        this.keybaseConfirmationRepository = keybaseConfirmationRepository;
        this.settingsRepository = settingsRepository;
    }
    async getMetadata(identifier) {
        const metadataDb = await this.nftMetadataRepository.findOne({ where: { id: identifier } });
        if (!metadataDb) {
            return null;
        }
        return metadataDb.content;
    }
    async batchGetMetadata(identifiers) {
        const metadatasDb = await this.nftMetadataRepository.find({
            where: {
                id: {
                    $in: identifiers,
                },
            },
        });
        return metadatasDb.toRecord(metadata => metadata.id, metadata => metadata.content);
    }
    async setMetadata(identifier, content) {
        let metadata = await this.nftMetadataRepository.findOne({ where: { id: identifier } });
        if (!metadata) {
            metadata = new nft_metadata_db_1.NftMetadataDb();
        }
        metadata.id = identifier;
        metadata.content = content;
        await this.save(this.nftMetadataRepository, metadata);
    }
    async save(repository, entity) {
        try {
            await repository.save(entity);
        }
        catch (error) {
            if (error.code !== 11000) {
                throw error;
            }
        }
    }
    async deleteMetadata(identifier) {
        return await this.nftMetadataRepository.delete({ id: identifier });
    }
    async getMedia(identifier) {
        const media = await this.nftMediaRepository.findOne({ where: { id: identifier } });
        if (!media) {
            return null;
        }
        return media.content;
    }
    async batchGetMedia(identifiers) {
        const mediasDb = await this.nftMediaRepository.find({
            where: {
                id: {
                    $in: identifiers,
                },
            },
        });
        return mediasDb.toRecord(media => { var _a; return (_a = media.id) !== null && _a !== void 0 ? _a : ''; }, media => media.content);
    }
    async setMedia(identifier, media) {
        let value = await this.nftMediaRepository.findOne({ where: { id: identifier } });
        if (!value) {
            value = new nft_media_db_1.NftMediaDb();
        }
        value.id = identifier;
        value.content = media;
        await this.save(this.nftMediaRepository, value);
    }
    async getCollectionTraits(collection) {
        const summary = await this.nftTraitSummaryRepository.findOne({ where: { identifier: collection } });
        if (!summary) {
            return null;
        }
        return summary.traitTypes;
    }
    async getKeybaseConfirmationForIdentity(identity) {
        const keybaseConfirmation = await this.keybaseConfirmationRepository.findOne({ where: { identity } });
        if (!keybaseConfirmation) {
            return undefined;
        }
        return keybaseConfirmation.keys;
    }
    async setKeybaseConfirmationForIdentity(identity, keys) {
        let keybaseConfirmation = await this.keybaseConfirmationRepository.findOne({ where: { identity } });
        if (!keybaseConfirmation) {
            keybaseConfirmation = new keybase_confirmation_db_1.KeybaseConfirmationDb();
        }
        keybaseConfirmation.identity = identity;
        keybaseConfirmation.keys = keys;
        await this.save(this.keybaseConfirmationRepository, keybaseConfirmation);
    }
    async getSetting(name) {
        const setting = await this.settingsRepository.findOne({ where: { name } });
        if (!setting) {
            return undefined;
        }
        return JSON.parse(setting.value);
    }
    async setSetting(name, value) {
        let item = await this.settingsRepository.findOne({ where: { name } });
        if (!item) {
            item = new hot_swappable_setting_1.HotSwappableSettingDb();
        }
        item.name = name;
        item.value = value;
        await this.save(this.settingsRepository, item);
    }
    async getAllSettings() {
        const settings = await this.settingsRepository.find();
        return settings.map(setting => ({
            name: setting.name,
            value: setting.value,
        }));
    }
};
tslib_1.__decorate([
    (0, sdk_nestjs_common_1.PassthroughAsync)(isPassThrough, null),
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetPersistenceDuration, 'getMetadata'),
    (0, sdk_nestjs_common_1.ErrorLoggerAsync)({ logArgs: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], PersistenceService.prototype, "getMetadata", null);
tslib_1.__decorate([
    (0, sdk_nestjs_common_1.PassthroughAsync)(isPassThrough, {}),
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetPersistenceDuration, 'batchGetMetadata'),
    (0, sdk_nestjs_common_1.ErrorLoggerAsync)({ logArgs: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], PersistenceService.prototype, "batchGetMetadata", null);
tslib_1.__decorate([
    (0, sdk_nestjs_common_1.PassthroughAsync)(isPassThrough),
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetPersistenceDuration, 'setMetadata'),
    (0, sdk_nestjs_common_1.ErrorLoggerAsync)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PersistenceService.prototype, "setMetadata", null);
tslib_1.__decorate([
    (0, sdk_nestjs_common_1.PassthroughAsync)(isPassThrough, {}),
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetPersistenceDuration, 'deleteMetadata'),
    (0, sdk_nestjs_common_1.ErrorLoggerAsync)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], PersistenceService.prototype, "deleteMetadata", null);
tslib_1.__decorate([
    (0, sdk_nestjs_common_1.PassthroughAsync)(isPassThrough, {}),
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetPersistenceDuration, 'getMedia'),
    (0, sdk_nestjs_common_1.ErrorLoggerAsync)({ logArgs: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], PersistenceService.prototype, "getMedia", null);
tslib_1.__decorate([
    (0, sdk_nestjs_common_1.PassthroughAsync)(isPassThrough, {}),
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetPersistenceDuration, 'batchGetMedia'),
    (0, sdk_nestjs_common_1.ErrorLoggerAsync)({ logArgs: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Array]),
    tslib_1.__metadata("design:returntype", Promise)
], PersistenceService.prototype, "batchGetMedia", null);
tslib_1.__decorate([
    (0, sdk_nestjs_common_1.PassthroughAsync)(isPassThrough),
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetPersistenceDuration, 'setMedia'),
    (0, sdk_nestjs_common_1.ErrorLoggerAsync)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], PersistenceService.prototype, "setMedia", null);
tslib_1.__decorate([
    (0, sdk_nestjs_common_1.PassthroughAsync)(isPassThrough, null),
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetPersistenceDuration, 'getCollectionTraits'),
    (0, sdk_nestjs_common_1.ErrorLoggerAsync)({ logArgs: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], PersistenceService.prototype, "getCollectionTraits", null);
tslib_1.__decorate([
    (0, sdk_nestjs_common_1.PassthroughAsync)(isPassThrough, null),
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetPersistenceDuration, 'getKeybaseConfirmationForIdentity'),
    (0, sdk_nestjs_common_1.ErrorLoggerAsync)({ logArgs: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], PersistenceService.prototype, "getKeybaseConfirmationForIdentity", null);
tslib_1.__decorate([
    (0, sdk_nestjs_common_1.PassthroughAsync)(isPassThrough, null),
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetPersistenceDuration, 'setKeybaseConfirmationForIdentity'),
    (0, sdk_nestjs_common_1.ErrorLoggerAsync)({ logArgs: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Array]),
    tslib_1.__metadata("design:returntype", Promise)
], PersistenceService.prototype, "setKeybaseConfirmationForIdentity", null);
tslib_1.__decorate([
    (0, sdk_nestjs_common_1.PassthroughAsync)(isPassThrough, null),
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetPersistenceDuration, 'getSetting'),
    (0, sdk_nestjs_common_1.ErrorLoggerAsync)({ logArgs: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], PersistenceService.prototype, "getSetting", null);
tslib_1.__decorate([
    (0, sdk_nestjs_common_1.PassthroughAsync)(isPassThrough, null),
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetPersistenceDuration, 'setSetting'),
    (0, sdk_nestjs_common_1.ErrorLoggerAsync)({ logArgs: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_b = typeof T !== "undefined" && T) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PersistenceService.prototype, "setSetting", null);
tslib_1.__decorate([
    (0, sdk_nestjs_common_1.PassthroughAsync)(isPassThrough, null),
    (0, log_performance_decorator_1.LogPerformanceAsync)(metrics_events_constants_1.MetricsEvents.SetPersistenceDuration, 'getAllSettings'),
    (0, sdk_nestjs_common_1.ErrorLoggerAsync)({ logArgs: true }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], PersistenceService.prototype, "getAllSettings", null);
PersistenceService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, typeorm_2.InjectRepository)(nft_metadata_db_1.NftMetadataDb)),
    tslib_1.__param(1, (0, typeorm_2.InjectRepository)(nft_media_db_1.NftMediaDb)),
    tslib_1.__param(2, (0, typeorm_2.InjectRepository)(nft_trait_summary_db_1.NftTraitSummaryDb)),
    tslib_1.__param(3, (0, typeorm_2.InjectRepository)(keybase_confirmation_db_1.KeybaseConfirmationDb)),
    tslib_1.__param(4, (0, typeorm_2.InjectRepository)(hot_swappable_setting_1.HotSwappableSettingDb)),
    tslib_1.__metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], PersistenceService);
exports.PersistenceService = PersistenceService;
//# sourceMappingURL=persistence.service.js.map