"use strict";
var DcdtService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DcdtService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const cache_info_1 = require("../../utils/cache.info");
const token_properties_1 = require("../tokens/entities/token.properties");
const vm_query_service_1 = require("../vm.query/vm.query.service");
const token_helpers_1 = require("../../utils/token.helpers");
const api_config_service_1 = require("../../common/api-config/api.config.service");
const gateway_service_1 = require("../../common/gateway/gateway.service");
const token_roles_1 = require("../tokens/entities/token.roles");
const assets_service_1 = require("../../common/assets/assets.service");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const indexer_service_1 = require("../../common/indexer/indexer.service");
const dcdt_type_1 = require("./entities/dcdt.type");
const elastic_indexer_service_1 = require("../../common/indexer/elastic/elastic.indexer.service");
const crypto_1 = require("crypto");
const dcdt_sub_type_1 = require("./entities/dcdt.sub.type");
const plugin_service_1 = require("../../common/plugins/plugin.service");
let DcdtService = DcdtService_1 = class DcdtService {
    constructor(gatewayService, apiConfigService, cachingService, vmQueryService, indexerService, pluginService, assetsService, elasticIndexerService) {
        this.gatewayService = gatewayService;
        this.apiConfigService = apiConfigService;
        this.cachingService = cachingService;
        this.vmQueryService = vmQueryService;
        this.indexerService = indexerService;
        this.pluginService = pluginService;
        this.assetsService = assetsService;
        this.elasticIndexerService = elasticIndexerService;
        this.logger = new sdk_nestjs_common_1.OriginLogger(DcdtService_1.name);
    }
    async getDcdtTokenProperties(identifier) {
        try {
            const properties = await this.cachingService.getOrSet(cache_info_1.CacheInfo.DcdtProperties(identifier).key, async () => await this.getDcdtTokenPropertiesRaw(identifier), sdk_nestjs_common_1.Constants.oneWeek(), cache_info_1.CacheInfo.DcdtProperties(identifier).ttl);
            if (!properties) {
                return undefined;
            }
            return properties;
        }
        catch (error) {
            this.logger.error(`Error when getting dcdt token properties for identifier: ${identifier}`);
            this.logger.error(error);
            return undefined;
        }
    }
    async getCollectionProperties(identifier) {
        const properties = await this.cachingService.getOrSet(cache_info_1.CacheInfo.CollectionProperties(identifier).key, async () => await this.getDcdtTokenPropertiesRawFromGateway(identifier), sdk_nestjs_common_1.Constants.oneWeek(), cache_info_1.CacheInfo.CollectionProperties(identifier).ttl);
        if (!properties) {
            return undefined;
        }
        return properties;
    }
    async getDcdtAddressesRoles(identifier) {
        const addressesRoles = await this.cachingService.getOrSet(cache_info_1.CacheInfo.DcdtAddressesRoles(identifier).key, async () => await this.getDcdtAddressesRolesRaw(identifier), sdk_nestjs_common_1.Constants.oneWeek(), cache_info_1.CacheInfo.DcdtAddressesRoles(identifier).ttl);
        if (!addressesRoles) {
            return undefined;
        }
        return addressesRoles;
    }
    async getDcdtTokenPropertiesRaw(identifier) {
        const getCollectionPropertiesFromGateway = this.apiConfigService.getCollectionPropertiesFromGateway();
        if (!getCollectionPropertiesFromGateway) {
            return await this.getDcdtTokenPropertiesRawFromElastic(identifier);
        }
        else {
            return await this.getDcdtTokenPropertiesRawFromGateway(identifier);
        }
    }
    async getDcdtTokenPropertiesRawFromElastic(identifier) {
        const elasticProperties = await this.elasticIndexerService.getDcdtProperties(identifier);
        return this.mapDcdtTokenPropertiesFromElastic(elasticProperties);
    }
    async getDcdtTokenPropertiesRawFromGateway(identifier) {
        var _a, _b;
        const arg = Buffer.from(identifier, 'utf8').toString('hex');
        const tokenPropertiesEncoded = await this.vmQueryService.vmQuery(this.apiConfigService.getDcdtContractAddress(), 'getTokenProperties', undefined, [arg], undefined, true);
        if (!tokenPropertiesEncoded) {
            return null;
        }
        const tokenProperties = tokenPropertiesEncoded.map((encoded, index) => Buffer.from(encoded, 'base64').toString(index === 2 ? 'hex' : undefined));
        const [name, type, owner, _, __, decimals, isPaused, canUpgrade, canMint, canBurn, canChangeOwner, canPause, canFreeze, canWipe, canAddSpecialRoles, canTransferNFTCreateRole, NFTCreateStopped, wiped,] = tokenProperties;
        const tokenProps = {
            identifier,
            name,
            type,
            owner: sdk_nestjs_common_1.AddressUtils.bech32Encode(owner),
            decimals: parseInt((_a = decimals.split('-').pop()) !== null && _a !== void 0 ? _a : '0'),
            isPaused: token_helpers_1.TokenHelpers.canBool(isPaused),
            canUpgrade: token_helpers_1.TokenHelpers.canBool(canUpgrade),
            canMint: token_helpers_1.TokenHelpers.canBool(canMint),
            canBurn: token_helpers_1.TokenHelpers.canBool(canBurn),
            canChangeOwner: token_helpers_1.TokenHelpers.canBool(canChangeOwner),
            canPause: token_helpers_1.TokenHelpers.canBool(canPause),
            canFreeze: token_helpers_1.TokenHelpers.canBool(canFreeze),
            canWipe: token_helpers_1.TokenHelpers.canBool(canWipe),
            canAddSpecialRoles: token_helpers_1.TokenHelpers.canBool(canAddSpecialRoles),
            canTransferNFTCreateRole: token_helpers_1.TokenHelpers.canBool(canTransferNFTCreateRole),
            NFTCreateStopped: token_helpers_1.TokenHelpers.canBool(NFTCreateStopped),
            wiped: (_b = wiped.split('-').pop()) !== null && _b !== void 0 ? _b : '',
        };
        if (type === 'FungibleDCDT') {
            delete tokenProps.canTransferNFTCreateRole;
            delete tokenProps.NFTCreateStopped;
            delete tokenProps.wiped;
        }
        this.applySubType(tokenProps, type);
        return tokenProps;
    }
    async getAllFungibleTokenProperties() {
        if (!this.apiConfigService.getCollectionPropertiesFromGateway()) {
            return await this.getAllFungibleTokenPropertiesFromElastic();
        }
        else {
            return await this.getAllFungibleTokenPropertiesFromGateway();
        }
    }
    async getAllFungibleTokenPropertiesFromElastic() {
        const elasticProperties = await this.elasticIndexerService.getAllFungibleTokens();
        return elasticProperties.map(property => this.mapDcdtTokenPropertiesFromElastic(property));
    }
    async getAllFungibleTokenPropertiesFromGateway() {
        let tokensIdentifiers;
        try {
            tokensIdentifiers = await this.gatewayService.getDcdtFungibleTokens();
        }
        catch (error) {
            this.logger.error('Error when getting fungible tokens from gateway');
            this.logger.error(error);
            return [];
        }
        const tokensProperties = await this.cachingService.batchProcess(tokensIdentifiers, token => cache_info_1.CacheInfo.DcdtProperties(token).key, async (identifier) => await this.getDcdtTokenPropertiesRawFromGateway(identifier), sdk_nestjs_common_1.Constants.oneDay(), true);
        return tokensProperties.filter(x => x !== null);
    }
    mapDcdtTokenPropertiesFromElastic(elasticProperties) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
        const tokenProps = new token_properties_1.TokenProperties({
            identifier: elasticProperties.identifier,
            name: elasticProperties.name,
            type: elasticProperties.type,
            subType: elasticProperties.type,
            owner: elasticProperties.currentOwner,
            ownersHistory: elasticProperties.ownersHistory,
            decimals: elasticProperties.numDecimals,
            canUpgrade: (_b = (_a = elasticProperties.properties) === null || _a === void 0 ? void 0 : _a.canUpgrade) !== null && _b !== void 0 ? _b : false,
            canMint: (_d = (_c = elasticProperties.properties) === null || _c === void 0 ? void 0 : _c.canMint) !== null && _d !== void 0 ? _d : false,
            canBurn: (_f = (_e = elasticProperties.properties) === null || _e === void 0 ? void 0 : _e.canBurn) !== null && _f !== void 0 ? _f : false,
            canChangeOwner: (_h = (_g = elasticProperties.properties) === null || _g === void 0 ? void 0 : _g.canChangeOwner) !== null && _h !== void 0 ? _h : false,
            canPause: (_k = (_j = elasticProperties.properties) === null || _j === void 0 ? void 0 : _j.canPause) !== null && _k !== void 0 ? _k : false,
            canFreeze: (_m = (_l = elasticProperties.properties) === null || _l === void 0 ? void 0 : _l.canFreeze) !== null && _m !== void 0 ? _m : false,
            canWipe: (_p = (_o = elasticProperties.properties) === null || _o === void 0 ? void 0 : _o.canWipe) !== null && _p !== void 0 ? _p : false,
            canAddSpecialRoles: (_r = (_q = elasticProperties.properties) === null || _q === void 0 ? void 0 : _q.canAddSpecialRoles) !== null && _r !== void 0 ? _r : false,
            canTransferNFTCreateRole: (_t = (_s = elasticProperties.properties) === null || _s === void 0 ? void 0 : _s.canTransferNFTCreateRole) !== null && _t !== void 0 ? _t : false,
            NFTCreateStopped: (_v = (_u = elasticProperties.properties) === null || _u === void 0 ? void 0 : _u.NFTCreateStopped) !== null && _v !== void 0 ? _v : false,
            isPaused: (_w = elasticProperties.paused) !== null && _w !== void 0 ? _w : false,
            timestamp: elasticProperties.timestamp,
        });
        if (elasticProperties.type === 'FungibleDCDT') {
            delete tokenProps.canTransferNFTCreateRole;
            delete tokenProps.NFTCreateStopped;
        }
        this.applySubType(tokenProps, elasticProperties.type);
        return tokenProps;
    }
    applySubType(tokenProps, type) {
        switch (type) {
            case dcdt_sub_type_1.DcdtSubType.NonFungibleDCDTv2:
            case dcdt_sub_type_1.DcdtSubType.DynamicNonFungibleDCDT:
                tokenProps.type = dcdt_type_1.DcdtType.NonFungibleDCDT;
                tokenProps.subType = type;
                break;
            case dcdt_sub_type_1.DcdtSubType.DynamicSemiFungibleDCDT:
                tokenProps.type = dcdt_type_1.DcdtType.SemiFungibleDCDT;
                tokenProps.subType = type;
                break;
            case dcdt_sub_type_1.DcdtSubType.DynamicMetaDCDT:
                tokenProps.type = dcdt_type_1.DcdtType.MetaDCDT;
                tokenProps.subType = type;
                break;
        }
    }
    async getDcdtAddressesRolesRaw(identifier) {
        const arg = sdk_nestjs_common_1.BinaryUtils.stringToHex(identifier);
        const tokenAddressesAndRolesEncoded = await this.vmQueryService.vmQuery(this.apiConfigService.getDcdtContractAddress(), 'getAllAddressesAndRoles', undefined, [arg], undefined, true);
        if (!tokenAddressesAndRolesEncoded) {
            return [];
        }
        return this.processEncodedAddressesAndRoles(tokenAddressesAndRolesEncoded);
    }
    processEncodedAddressesAndRoles(encodedData) {
        const result = [];
        let currentRole = null;
        for (const valueEncoded of encodedData) {
            const address = sdk_nestjs_common_1.BinaryUtils.tryBase64ToAddress(valueEncoded);
            if (address || valueEncoded === null) {
                if (currentRole && currentRole.address) {
                    result.push(currentRole);
                }
                currentRole = new token_roles_1.TokenRoles();
                currentRole.address = address;
            }
            else {
                if (!currentRole) {
                    currentRole = new token_roles_1.TokenRoles();
                }
                const role = sdk_nestjs_common_1.BinaryUtils.base64Decode(valueEncoded);
                token_helpers_1.TokenHelpers.setTokenRole(currentRole, role);
            }
        }
        if (currentRole && currentRole.address) {
            result.push(currentRole);
        }
        return result;
    }
    async getLockedAccounts(identifier) {
        return await this.cachingService.getOrSet(cache_info_1.CacheInfo.TokenLockedAccounts(identifier).key, async () => await this.getLockedAccountsRaw(identifier), cache_info_1.CacheInfo.TokenLockedAccounts(identifier).ttl);
    }
    async getLockedAccountsRaw(identifier) {
        const tokenAssets = await this.assetsService.getTokenAssets(identifier);
        if (!tokenAssets) {
            return [];
        }
        const lockedAccounts = tokenAssets.lockedAccounts;
        if (!lockedAccounts) {
            return [];
        }
        const lockedAccountsWithDescriptions = [];
        if (Array.isArray(lockedAccounts)) {
            for (const lockedAccount of lockedAccounts) {
                lockedAccountsWithDescriptions.push({
                    address: lockedAccount,
                    name: undefined,
                    balance: '0',
                });
            }
        }
        else {
            for (const address of Object.keys(lockedAccounts)) {
                lockedAccountsWithDescriptions.push({
                    address,
                    name: lockedAccounts[address],
                    balance: '0',
                });
            }
        }
        if (Object.keys(lockedAccounts).length === 0) {
            return [];
        }
        const addresses = lockedAccountsWithDescriptions.map(x => x.address);
        const dcdtLockedAccounts = await this.getAccountDcdtByAddressesAndIdentifier(identifier, addresses);
        for (const dcdtLockedAccount of dcdtLockedAccounts) {
            const lockedAccountWithDescription = lockedAccountsWithDescriptions.find(x => x.address === dcdtLockedAccount.address);
            if (lockedAccountWithDescription) {
                lockedAccountWithDescription.balance = dcdtLockedAccount.balance;
            }
        }
        return lockedAccountsWithDescriptions;
    }
    async getTokenSupply(identifier) {
        const dcdtSupply = await this.gatewayService.getDcdtSupply(identifier);
        this.pluginService.formatTokenSupply(identifier, dcdtSupply);
        const { supply, minted, burned, initialMinted } = dcdtSupply;
        const isCollectionOrToken = identifier.split('-').length === 2;
        if (isCollectionOrToken) {
            let circulatingSupply = BigInt(supply);
            const lockedAccounts = await this.getLockedAccounts(identifier);
            if (lockedAccounts && lockedAccounts.length > 0) {
                const totalLockedSupply = lockedAccounts.sumBigInt(x => BigInt(x.balance));
                circulatingSupply = BigInt(supply) - totalLockedSupply;
            }
            return {
                totalSupply: supply,
                circulatingSupply: circulatingSupply.toString(),
                minted,
                burned,
                initialMinted,
                lockedAccounts,
            };
        }
        return {
            totalSupply: supply,
            circulatingSupply: supply,
            minted,
            burned,
            initialMinted,
            lockedAccounts: undefined,
        };
    }
    async countAllDistinctAccounts(identifiers) {
        const key = `tokens:${identifiers[0]}:distinctAccounts:${(0, crypto_1.randomUUID)()}`;
        try {
            for (const identifier of identifiers) {
                await this.indexerService.getAllAccountsWithToken(identifier, async (items) => {
                    const distinctAccounts = items.map(x => x.address).distinct();
                    if (distinctAccounts.length > 0) {
                        const chunks = sdk_nestjs_common_1.BatchUtils.splitArrayIntoChunks(distinctAccounts, 100);
                        for (const chunk of chunks) {
                            await this.cachingService.setAddRemote(key, ...chunk);
                        }
                    }
                });
            }
            return await this.cachingService.setCountRemote(key);
        }
        finally {
            await this.cachingService.deleteInCache(key);
        }
    }
    async getAccountDcdtByAddressesAndIdentifier(identifier, addresses) {
        return await this.indexerService.getAccountDcdtByAddressesAndIdentifier(identifier, addresses);
    }
};
DcdtService = DcdtService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(6, (0, common_1.Inject)((0, common_1.forwardRef)(() => assets_service_1.AssetsService))),
    tslib_1.__metadata("design:paramtypes", [gateway_service_1.GatewayService,
        api_config_service_1.ApiConfigService,
        sdk_nestjs_cache_1.CacheService,
        vm_query_service_1.VmQueryService,
        indexer_service_1.IndexerService,
        plugin_service_1.PluginService,
        assets_service_1.AssetsService,
        elastic_indexer_service_1.ElasticIndexerService])
], DcdtService);
exports.DcdtService = DcdtService;
//# sourceMappingURL=dcdt.service.js.map