"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoaSettings = void 0;
class MoaSettings {
    constructor(init) {
        this.pairContracts = [];
        this.farmContracts = [];
        this.wrapContracts = [];
        this.routerFactoryContract = '';
        this.distributionContract = '';
        this.lockedAssetContract = '';
        this.lockedAssetIdentifier = '';
        this.lockedAssetIdentifierV2 = '';
        this.moaId = '';
        this.wrewaId = '';
        Object.assign(this, init);
    }
    static fromQueryResponse(response) {
        const settings = new MoaSettings();
        settings.farmContracts = [
            ...response.farms.filter((x) => ['Active', 'Migrate'].includes(x.state)).map((x) => x.address),
            ...response.stakingFarms.filter((x) => x.state === 'Active').map((x) => x.address),
            ...response.stakingProxies.map((x) => x.address),
            ...response.proxy.map((x) => x.address),
        ];
        settings.pairContracts = [
            ...response.pairs.map((x) => x.address),
            ...response.proxy.map((x) => x.address),
        ];
        settings.wrapContracts = response.wrappingInfo.map((x) => x.address);
        settings.distributionContract = response.distribution.address;
        settings.lockedAssetContract = response.lockedAssetFactory.address;
        settings.routerFactoryContract = response.factory.address;
        const lockedAssetIdentifiers = response.proxy
            .map((proxy) => proxy.lockedAssetTokens.map((token) => token.collection))
            .flat()
            .distinct();
        settings.lockedAssetIdentifier = lockedAssetIdentifiers.find((identifier) => identifier.startsWith('LKMOA'));
        settings.lockedAssetIdentifierV2 = lockedAssetIdentifiers.find((identifier) => identifier.startsWith('XMOA'));
        const wrappedToken = response.wrappingInfo[0].wrappedToken.identifier;
        const moaToken = response.simpleLockEnergy.baseAssetToken.identifier;
        settings.wrewaId = wrappedToken;
        settings.moaId = moaToken;
        return settings;
    }
}
exports.MoaSettings = MoaSettings;
//# sourceMappingURL=moa.settings.js.map