"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DappConfig = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class DappConfig {
    constructor(init) {
        this.id = '';
        this.name = '';
        this.rewaLabel = '';
        this.decimals = '';
        this.rewaDenomination = '';
        this.gasPerDataByte = '';
        this.apiTimeout = '';
        this.walletConnectDeepLink = '';
        this.walletConnectBridgeAddresses = '';
        this.walletAddress = '';
        this.apiAddress = '';
        this.explorerAddress = '';
        this.chainId = '';
        this.refreshRate = 0;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'mainnet' }),
    tslib_1.__metadata("design:type", String)
], DappConfig.prototype, "id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'Mainnet' }),
    tslib_1.__metadata("design:type", String)
], DappConfig.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'REWA' }),
    tslib_1.__metadata("design:type", String)
], DappConfig.prototype, "rewaLabel", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: '4' }),
    tslib_1.__metadata("design:type", String)
], DappConfig.prototype, "decimals", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: '18' }),
    tslib_1.__metadata("design:type", String)
], DappConfig.prototype, "rewaDenomination", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: '1500' }),
    tslib_1.__metadata("design:type", String)
], DappConfig.prototype, "gasPerDataByte", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: '4000' }),
    tslib_1.__metadata("design:type", String)
], DappConfig.prototype, "apiTimeout", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'https://durian.page.link/?apn=com.dharitri.durian.wallet&isi=1519405832&ibi=com.dharitri.durian.wallet&link=https://durian.com/' }),
    tslib_1.__metadata("design:type", String)
], DappConfig.prototype, "walletConnectDeepLink", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: [String], example: 'https://bridge.walletconnect.org' }),
    tslib_1.__metadata("design:type", String)
], DappConfig.prototype, "walletConnectBridgeAddresses", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'https://wallet.dharitri.org' }),
    tslib_1.__metadata("design:type", String)
], DappConfig.prototype, "walletAddress", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'https://api.dharitri.org' }),
    tslib_1.__metadata("design:type", String)
], DappConfig.prototype, "apiAddress", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'https://explorer.dharitri.org' }),
    tslib_1.__metadata("design:type", String)
], DappConfig.prototype, "explorerAddress", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: '1' }),
    tslib_1.__metadata("design:type", String)
], DappConfig.prototype, "chainId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, example: 6000 }),
    tslib_1.__metadata("design:type", Number)
], DappConfig.prototype, "refreshRate", void 0);
exports.DappConfig = DappConfig;
//# sourceMappingURL=dapp-config.js.map