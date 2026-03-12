"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Provider = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const swagger_1 = require("@nestjs/swagger");
const nodes_infos_1 = require("./nodes.infos");
const identity_1 = require("../../identities/entities/identity");
class Provider extends nodes_infos_1.NodesInfos {
    constructor(init) {
        super();
        this.provider = '';
        this.owner = null;
        this.featured = false;
        this.serviceFee = 0;
        this.delegationCap = '';
        this.apr = 0;
        this.numUsers = 0;
        this.cumulatedRewards = null;
        this.identity = undefined;
        this.initialOwnerFunds = undefined;
        this.automaticActivation = undefined;
        this.checkCapOnRedelegate = undefined;
        this.ownerBelowRequiredBalanceThreshold = undefined;
        this.totalUnStaked = undefined;
        this.createdNonce = undefined;
        this.githubProfileValidated = undefined;
        this.githubProfileValidatedAt = undefined;
        this.githubKeysValidated = undefined;
        this.githubKeysValidatedAt = undefined;
        Object.assign(this, init);
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", String)
], Provider.prototype, "provider", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Provider.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Provider.prototype, "featured", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", Number)
], Provider.prototype, "serviceFee", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", String)
], Provider.prototype, "delegationCap", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", Number)
], Provider.prototype, "apr", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(sdk_nestjs_common_1.SwaggerUtils.amountPropertyOptions()),
    tslib_1.__metadata("design:type", Number)
], Provider.prototype, "numUsers", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true }),
    tslib_1.__metadata("design:type", Object)
], Provider.prototype, "cumulatedRewards", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Provider.prototype, "identity", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", Object)
], Provider.prototype, "initialOwnerFunds", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Object)
], Provider.prototype, "automaticActivation", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Object)
], Provider.prototype, "checkCapOnRedelegate", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    tslib_1.__metadata("design:type", Object)
], Provider.prototype, "ownerBelowRequiredBalanceThreshold", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    tslib_1.__metadata("design:type", Object)
], Provider.prototype, "totalUnStaked", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    tslib_1.__metadata("design:type", Object)
], Provider.prototype, "createdNonce", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Provider.prototype, "githubProfileValidated", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Provider.prototype, "githubProfileValidatedAt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Provider.prototype, "githubKeysValidated", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, nullable: true, required: false }),
    tslib_1.__metadata("design:type", Object)
], Provider.prototype, "githubKeysValidatedAt", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: identity_1.Identity, nullable: true, required: false }),
    tslib_1.__metadata("design:type", identity_1.Identity)
], Provider.prototype, "identityInfo", void 0);
exports.Provider = Provider;
//# sourceMappingURL=provider.js.map