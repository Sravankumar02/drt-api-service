"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelegationData = void 0;
class DelegationData {
    constructor(init) {
        this.aprValue = undefined;
        this.featured = false;
        this.contract = null;
        this.owner = null;
        this.automaticActivation = false;
        this.initialOwnerFunds = "";
        this.checkCapOnRedelegate = false;
        this.totalUnStaked = "";
        this.createdNonce = 0;
        this.ownerBelowRequiredBalanceThreshold = false;
        Object.assign(this, init);
    }
}
exports.DelegationData = DelegationData;
//# sourceMappingURL=delegation.data.js.map