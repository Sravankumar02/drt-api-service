"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusCheckerThresholds = void 0;
class StatusCheckerThresholds {
    constructor(init) {
        this.tokens = 0;
        this.nodes = 0;
        this.providers = 0;
        this.tokenSupplyCount = 0;
        this.tokenAssets = 0;
        this.tokenAccounts = 0;
        this.tokenTransactions = 0;
        this.nodeValidators = 0;
        Object.assign(this, init);
    }
}
exports.StatusCheckerThresholds = StatusCheckerThresholds;
//# sourceMappingURL=status-checker-thresholds.js.map