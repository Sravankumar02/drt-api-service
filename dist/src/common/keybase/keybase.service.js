"use strict";
var KeybaseService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeybaseService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const node_service_1 = require("../../endpoints/nodes/node.service");
const provider_service_1 = require("../../endpoints/providers/provider.service");
const keybase_identity_1 = require("./entities/keybase.identity");
const cache_info_1 = require("../../utils/cache.info");
const assets_service_1 = require("../assets/assets.service");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const api_config_service_1 = require("../api-config/api.config.service");
let KeybaseService = KeybaseService_1 = class KeybaseService {
    constructor(cachingService, nodeService, providerService, assetsService, apiConfigService) {
        this.cachingService = cachingService;
        this.nodeService = nodeService;
        this.providerService = providerService;
        this.assetsService = assetsService;
        this.apiConfigService = apiConfigService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(KeybaseService_1.name);
    }
    async getDistinctIdentities() {
        const identities = await this.assetsService.getAllIdentitiesRaw();
        return Object.keys(identities);
    }
    async confirmIdentities() {
        const distinctIdentities = await this.getDistinctIdentities();
        const heartbeatEntries = await this.nodeService.getHeartbeatValidatorsAndQueue();
        const blsIdentityDict = heartbeatEntries.filter(x => x.identity).toRecord(x => x.bls, x => { var _a; return (_a = x.identity) !== null && _a !== void 0 ? _a : ''; });
        const confirmations = {};
        const providerAddresses = await this.providerService.getProviderAddresses();
        for (const identity of distinctIdentities) {
            await this.confirmIdentity(identity, providerAddresses, blsIdentityDict, confirmations);
        }
        for (const key of Object.keys(confirmations)) {
            await this.cachingService.set(cache_info_1.CacheInfo.ConfirmedIdentity(key).key, confirmations[key], cache_info_1.CacheInfo.ConfirmedIdentity(key).ttl);
        }
    }
    async getOwners(identity) {
        const info = await this.readIdentityInfo(identity);
        if (!info || !info.owners) {
            return undefined;
        }
        return info.owners;
    }
    async confirmIdentity(identity, providerAddresses, blsIdentityDict, confirmations) {
        const keys = await this.getOwners(identity);
        if (!keys) {
            return;
        }
        for (const key of keys) {
            if (sdk_nestjs_common_1.AddressUtils.isAddressValid(key)) {
                if (providerAddresses.includes(key)) {
                    await this.cachingService.set(cache_info_1.CacheInfo.ConfirmedProvider(key).key, identity, cache_info_1.CacheInfo.ConfirmedProvider(key).ttl);
                }
                try {
                    const blses = await this.nodeService.getOwnerBlses(key);
                    this.logger.log(`Confirmed identity '${identity}' for address '${key}' with ${blses.length} BLS keys`);
                    for (const bls of blses) {
                        confirmations[bls] = identity;
                    }
                }
                catch (error) {
                    this.logger.error(`Failed to get BLS keys for address ${key}`);
                    this.logger.error(error);
                }
            }
            if (sdk_nestjs_common_1.AddressUtils.isAddressValid(key) && !providerAddresses.includes(key)) {
                const blses = await this.nodeService.getOwnerBlses(key);
                for (const bls of blses) {
                    confirmations[bls] = identity;
                }
            }
            if (key.length === 192 && blsIdentityDict[key] === identity && confirmations[key] === undefined) {
                confirmations[key] = identity;
            }
        }
    }
    async confirmIdentityProfiles() {
        const identities = await this.getDistinctIdentities();
        const keybaseIdentities = await Promise.all(identities.map(identity => this.getProfile(identity)));
        await this.cachingService.set(cache_info_1.CacheInfo.IdentityProfilesKeybases.key, keybaseIdentities, cache_info_1.CacheInfo.IdentityProfilesKeybases.ttl);
    }
    async getProfile(identity) {
        const keybaseLocal = await this.getProfileFromAssets(identity);
        if (keybaseLocal) {
            this.logger.log(`Got profile details from assets for identity '${identity}'`);
            return keybaseLocal;
        }
        return null;
    }
    async readIdentityInfo(identity) {
        const identityInfo = await this.assetsService.getIdentityInfo(identity);
        return identityInfo;
    }
    async getProfileFromAssets(identity) {
        const info = await this.readIdentityInfo(identity);
        if (!info) {
            return null;
        }
        const network = this.apiConfigService.getNetwork();
        const folder = network === 'mainnet' ? '' : `/${network}`;
        return new keybase_identity_1.KeybaseIdentity(Object.assign({ identity, avatar: `https://raw.githubusercontent.com/terradharitri/drt-assets/master${folder}/identities/${identity}/logo.png` }, info));
    }
};
KeybaseService = KeybaseService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => node_service_1.NodeService))),
    tslib_1.__param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => provider_service_1.ProviderService))),
    tslib_1.__metadata("design:paramtypes", [sdk_nestjs_cache_1.CacheService,
        node_service_1.NodeService,
        provider_service_1.ProviderService,
        assets_service_1.AssetsService,
        api_config_service_1.ApiConfigService])
], KeybaseService);
exports.KeybaseService = KeybaseService;
//# sourceMappingURL=keybase.service.js.map