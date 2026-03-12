"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakeActionRecognizerService = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const common_1 = require("@nestjs/common");
const identities_service_1 = require("../../../../identities/identities.service");
const provider_service_1 = require("../../../../providers/provider.service");
const transaction_action_1 = require("../../entities/transaction.action");
const transaction_action_category_1 = require("../../entities/transaction.action.category");
const stake_function_1 = require("./entities/stake.function");
let StakeActionRecognizerService = class StakeActionRecognizerService {
    constructor(providerService, identitiesService, cachingService) {
        this.providerService = providerService;
        this.identitiesService = identitiesService;
        this.cachingService = cachingService;
    }
    async getProviders() {
        var _a;
        let providersDetails = this.cachingService.getLocal('plugins:staking:providerAddresses');
        if (!providersDetails) {
            const providers = await this.providerService.getAllProviders();
            const identities = await this.identitiesService.getAllIdentities();
            providersDetails = {};
            for (const provider of providers) {
                let providerName = (_a = provider.identity) !== null && _a !== void 0 ? _a : provider.provider;
                let providerAvatar = '';
                const matchingIdentities = identities.filter(x => x.identity === provider.identity);
                if (matchingIdentities.length > 0) {
                    const name = matchingIdentities[0].name;
                    if (name && name.length !== 192) {
                        providerName = name;
                    }
                    const avatar = matchingIdentities[0].avatar;
                    if (avatar) {
                        providerAvatar = avatar;
                    }
                }
                providersDetails[provider.provider] = { providerName, providerAvatar };
            }
            this.cachingService.setLocal('plugins:staking:providerAddresses', providersDetails, sdk_nestjs_common_1.Constants.oneHour());
        }
        return providersDetails;
    }
    async recognize(metadata) {
        const providers = await this.getProviders();
        const providerDetails = providers[metadata.receiver];
        if (!providerDetails) {
            return undefined;
        }
        switch (metadata.functionName) {
            case stake_function_1.StakeFunction.delegate:
            case stake_function_1.StakeFunction.stake:
                return this.getDelegateAction(metadata, providerDetails);
            case stake_function_1.StakeFunction.unDelegate:
                return this.getUnDelegateAction(metadata, providerDetails);
            case stake_function_1.StakeFunction.claimRewards:
                return this.getAction(metadata, providerDetails, "Claim rewards");
            case stake_function_1.StakeFunction.reDelegateRewards:
                return this.getAction(metadata, providerDetails, "Redelegate rewards");
            case stake_function_1.StakeFunction.withdraw:
                return this.getAction(metadata, providerDetails, "Withdraw");
            default:
                return undefined;
        }
    }
    getDelegateAction(metadata, providerDetails) {
        const value = metadata.value;
        const valueDenominated = sdk_nestjs_common_1.NumberUtils.toDenominatedString(value, 18);
        const result = new transaction_action_1.TransactionAction();
        result.category = transaction_action_category_1.TransactionActionCategory.stake;
        result.name = stake_function_1.StakeFunction.delegate;
        result.description = `Delegate ${valueDenominated} REWA to staking provider ${providerDetails.providerName}`;
        result.arguments = Object.assign({ value: value.toString() }, providerDetails);
        return result;
    }
    getUnDelegateAction(metadata, providerDetails) {
        const value = sdk_nestjs_common_1.BinaryUtils.hexToBigInt(metadata.functionArgs[0]);
        const valueDenominated = sdk_nestjs_common_1.NumberUtils.toDenominatedString(value, 18);
        const result = new transaction_action_1.TransactionAction();
        result.category = transaction_action_category_1.TransactionActionCategory.stake;
        result.name = stake_function_1.StakeFunction.unDelegate;
        result.description = `Undelegate ${valueDenominated} REWA from staking provider ${providerDetails.providerName}`;
        result.arguments = Object.assign({ value: value.toString() }, providerDetails);
        return result;
    }
    getAction(metadata, providerDetails, action) {
        var _a;
        const result = new transaction_action_1.TransactionAction();
        result.category = transaction_action_category_1.TransactionActionCategory.stake;
        result.name = (_a = metadata.functionName) !== null && _a !== void 0 ? _a : '';
        result.description = `${action} from staking provider ${providerDetails.providerName}`;
        result.arguments = Object.assign({}, providerDetails);
        return result;
    }
};
StakeActionRecognizerService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => provider_service_1.ProviderService))),
    tslib_1.__param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => identities_service_1.IdentitiesService))),
    tslib_1.__metadata("design:paramtypes", [provider_service_1.ProviderService,
        identities_service_1.IdentitiesService,
        sdk_nestjs_cache_1.CacheService])
], StakeActionRecognizerService);
exports.StakeActionRecognizerService = StakeActionRecognizerService;
//# sourceMappingURL=transaction.action.stake.recognizer.service.js.map