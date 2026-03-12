"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountDetailed = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const swagger_1 = require("@nestjs/swagger");
const scam_info_dto_1 = require("../../../common/entities/scam-info.dto");
const account_1 = require("./account");
class AccountDetailed extends account_1.Account {
    constructor(init) {
        super();
        this.code = '';
        this.codeHash = '';
        this.rootHash = '';
        this.username = undefined;
        this.developerReward = '';
        this.ownerAddress = '';
        this.isPayableBySmartContract = undefined;
        this.scamInfo = undefined;
        this.nftCollections = undefined;
        this.nfts = undefined;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The source code in hex format', required: false }),
    tslib_1.__metadata("design:type", String)
], AccountDetailed.prototype, "code", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The hash of the source code', required: false }),
    tslib_1.__metadata("design:type", String)
], AccountDetailed.prototype, "codeHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The hash of the root node' }),
    tslib_1.__metadata("design:type", String)
], AccountDetailed.prototype, "rootHash", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The username specific for this account', nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], AccountDetailed.prototype, "username", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The developer reward' }),
    tslib_1.__metadata("design:type", String)
], AccountDetailed.prototype, "developerReward", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The address in bech 32 format of owner account', required: false }),
    tslib_1.__metadata("design:type", String)
], AccountDetailed.prototype, "ownerAddress", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Specific property flag for smart contract', type: Boolean, required: false }),
    tslib_1.__metadata("design:type", Boolean)
], AccountDetailed.prototype, "isUpgradeable", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Specific property flag for smart contract', type: Boolean, required: false }),
    tslib_1.__metadata("design:type", Boolean)
], AccountDetailed.prototype, "isReadable", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Specific property flag for smart contract', type: Boolean, required: false }),
    tslib_1.__metadata("design:type", Boolean)
], AccountDetailed.prototype, "isPayable", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Specific property flag for smart contract', type: Boolean, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], AccountDetailed.prototype, "isPayableBySmartContract", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: scam_info_dto_1.ScamInfo, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], AccountDetailed.prototype, "scamInfo", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Account nft collections', type: Boolean, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], AccountDetailed.prototype, "nftCollections", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Account nfts', type: Boolean, nullable: true, required: false }),
    (0, sdk_nestjs_common_1.ComplexityEstimation)({ group: 'nfts', value: 1000 }),
    tslib_1.__metadata("design:type", Object)
], AccountDetailed.prototype, "nfts", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Number)
], AccountDetailed.prototype, "activeGuardianActivationEpoch", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", String)
], AccountDetailed.prototype, "activeGuardianAddress", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", String)
], AccountDetailed.prototype, "activeGuardianServiceUid", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Number)
], AccountDetailed.prototype, "pendingGuardianActivationEpoch", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", String)
], AccountDetailed.prototype, "pendingGuardianAddress", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", String)
], AccountDetailed.prototype, "pendingGuardianServiceUid", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Boolean)
], AccountDetailed.prototype, "isGuarded", void 0);
exports.AccountDetailed = AccountDetailed;
//# sourceMappingURL=account.detailed.js.map