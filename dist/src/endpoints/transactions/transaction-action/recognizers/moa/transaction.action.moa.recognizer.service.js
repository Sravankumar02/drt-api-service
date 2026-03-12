"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionActionMoaRecognizerService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const moa_farm_action_recognizer_service_1 = require("./moa.farm.action.recognizer.service");
const moa_pair_action_recognizer_service_1 = require("./moa.pair.action.recognizer.service");
const moa_wrap_action_recognizer_service_1 = require("./moa.wrap.action.recognizer.service");
const moa_distribution_action_recognizer_service_1 = require("./moa.distribution.action.recognizer.service");
const moa_locked_asset_action_recognizer_service_1 = require("./moa.locked.asset.action.recognizer.service");
const moa_settings_service_1 = require("../../../../moa/moa.settings.service");
const api_config_service_1 = require("../../../../../common/api-config/api.config.service");
let TransactionActionMoaRecognizerService = class TransactionActionMoaRecognizerService {
    constructor(pairActionRecognizer, farmActionRecognizer, wrapActionRecognizer, distributionRecognizer, lockedAssetRecognizer, moaSettingsService, apiConfigService) {
        this.pairActionRecognizer = pairActionRecognizer;
        this.farmActionRecognizer = farmActionRecognizer;
        this.wrapActionRecognizer = wrapActionRecognizer;
        this.distributionRecognizer = distributionRecognizer;
        this.lockedAssetRecognizer = lockedAssetRecognizer;
        this.moaSettingsService = moaSettingsService;
        this.apiConfigService = apiConfigService;
    }
    async isActive() {
        const microServiceUrl = this.apiConfigService.getExchangeServiceUrl();
        if (!microServiceUrl) {
            return false;
        }
        const settings = await this.moaSettingsService.getSettings();
        return settings !== undefined;
    }
    async recognize(metadata) {
        var _a, _b, _c, _d;
        const settings = await this.moaSettingsService.getSettings();
        if (!settings) {
            return undefined;
        }
        const isMoaInteraction = await this.moaSettingsService.isMoaInteraction(metadata);
        if (!isMoaInteraction) {
            return undefined;
        }
        return (_d = (_c = (_b = (_a = this.distributionRecognizer.recognize(settings, metadata)) !== null && _a !== void 0 ? _a : (await this.pairActionRecognizer.recognize(settings, metadata))) !== null && _b !== void 0 ? _b : this.farmActionRecognizer.recognize(settings, metadata)) !== null && _c !== void 0 ? _c : this.wrapActionRecognizer.recognize(settings, metadata)) !== null && _d !== void 0 ? _d : this.lockedAssetRecognizer.recognize(settings, metadata);
    }
};
TransactionActionMoaRecognizerService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [moa_pair_action_recognizer_service_1.MoaPairActionRecognizerService,
        moa_farm_action_recognizer_service_1.MoaFarmActionRecognizerService,
        moa_wrap_action_recognizer_service_1.MoaWrapActionRecognizerService,
        moa_distribution_action_recognizer_service_1.MoaDistributionActionRecognizerService,
        moa_locked_asset_action_recognizer_service_1.MoaLockedAssetActionRecognizerService,
        moa_settings_service_1.MoaSettingsService,
        api_config_service_1.ApiConfigService])
], TransactionActionMoaRecognizerService);
exports.TransactionActionMoaRecognizerService = TransactionActionMoaRecognizerService;
//# sourceMappingURL=transaction.action.moa.recognizer.service.js.map