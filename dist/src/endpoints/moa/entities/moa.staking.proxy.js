"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoaStakingProxy = void 0;
const tslib_1 = require("tslib");
const swagger_1 = require("@nestjs/swagger");
class MoaStakingProxy {
    constructor(init) {
        this.address = '';
        this.dualYieldTokenName = '';
        this.dualYieldTokenCollection = '';
        Object.assign(this, init);
    }
    static fromQueryResponse(response) {
        const stakingProxy = new MoaStakingProxy();
        stakingProxy.address = response.address;
        stakingProxy.dualYieldTokenName = response.dualYieldToken.name;
        stakingProxy.dualYieldTokenCollection = response.dualYieldToken.collection;
        return stakingProxy;
    }
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: String, example: 'drt1qqqqqqqqqqqqqpgq2ymdr66nk5hx32j2tqdeqv9ajm9dj9uu2jpsv3u0ej' }),
    tslib_1.__metadata("design:type", String)
], MoaStakingProxy.prototype, "address", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], MoaStakingProxy.prototype, "dualYieldTokenName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], MoaStakingProxy.prototype, "dualYieldTokenCollection", void 0);
exports.MoaStakingProxy = MoaStakingProxy;
//# sourceMappingURL=moa.staking.proxy.js.map