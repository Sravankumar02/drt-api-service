"use strict";
var PersistenceModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistenceModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const configuration_1 = tslib_1.__importDefault(require("../../../config/configuration"));
const api_config_module_1 = require("../api-config/api.config.module");
const api_config_service_1 = require("../api-config/api.config.service");
const hot_swappable_setting_1 = require("./entities/hot.swappable.setting");
const keybase_confirmation_db_1 = require("./entities/keybase.confirmation.db");
const nft_media_db_1 = require("./entities/nft.media.db");
const nft_metadata_db_1 = require("./entities/nft.metadata.db");
const nft_trait_summary_db_1 = require("./entities/nft.trait.summary.db");
const persistence_service_1 = require("./persistence.service");
let PersistenceModule = PersistenceModule_1 = class PersistenceModule {
    static forRoot() {
        var _a;
        const isPassThrough = process.env.PERSISTENCE === 'passthrough' || ((_a = (0, configuration_1.default)().database) === null || _a === void 0 ? void 0 : _a.enabled) === false;
        if (isPassThrough) {
            return {
                module: PersistenceModule_1,
                imports: [],
                providers: [
                    {
                        provide: (0, typeorm_1.getRepositoryToken)(nft_metadata_db_1.NftMetadataDb),
                        useValue: {},
                    },
                    {
                        provide: (0, typeorm_1.getRepositoryToken)(nft_media_db_1.NftMediaDb),
                        useValue: {},
                    },
                    {
                        provide: (0, typeorm_1.getRepositoryToken)(nft_trait_summary_db_1.NftTraitSummaryDb),
                        useValue: {},
                    },
                    {
                        provide: (0, typeorm_1.getRepositoryToken)(keybase_confirmation_db_1.KeybaseConfirmationDb),
                        useValue: {},
                    },
                    {
                        provide: (0, typeorm_1.getRepositoryToken)(hot_swappable_setting_1.HotSwappableSettingDb),
                        useValue: {},
                    },
                    persistence_service_1.PersistenceService,
                ],
                exports: [persistence_service_1.PersistenceService],
            };
        }
        return {
            module: PersistenceModule_1,
            imports: [
                typeorm_1.TypeOrmModule.forRootAsync({
                    imports: [api_config_module_1.ApiConfigModule],
                    useFactory: (apiConfigService) => {
                        const options = {
                            type: 'mongodb',
                            entities: [nft_metadata_db_1.NftMetadataDb, nft_media_db_1.NftMediaDb, nft_trait_summary_db_1.NftTraitSummaryDb, keybase_confirmation_db_1.KeybaseConfirmationDb, hot_swappable_setting_1.HotSwappableSettingDb],
                            url: apiConfigService.getDatabaseUrl(),
                            tlsAllowInvalidCertificates: true,
                            retryAttempts: 300,
                            synchronize: true,
                        };
                        return options;
                    },
                    inject: [api_config_service_1.ApiConfigService],
                }),
                typeorm_1.TypeOrmModule.forFeature([nft_metadata_db_1.NftMetadataDb, nft_media_db_1.NftMediaDb, nft_trait_summary_db_1.NftTraitSummaryDb, keybase_confirmation_db_1.KeybaseConfirmationDb, hot_swappable_setting_1.HotSwappableSettingDb]),
            ],
            providers: [persistence_service_1.PersistenceService],
            exports: [persistence_service_1.PersistenceService, typeorm_1.TypeOrmModule.forFeature([nft_metadata_db_1.NftMetadataDb, nft_media_db_1.NftMediaDb, nft_trait_summary_db_1.NftTraitSummaryDb, keybase_confirmation_db_1.KeybaseConfirmationDb, hot_swappable_setting_1.HotSwappableSettingDb])],
        };
    }
};
PersistenceModule = PersistenceModule_1 = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], PersistenceModule);
exports.PersistenceModule = PersistenceModule;
//# sourceMappingURL=persistence.module.js.map