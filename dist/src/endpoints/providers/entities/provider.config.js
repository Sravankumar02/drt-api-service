"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderConfig = void 0;
class ProviderConfig {
    constructor(init) {
        this.owner = '';
        this.serviceFee = 0;
        this.delegationCap = '';
        this.apr = 0;
        this.automaticActivation = false;
        this.checkCapOnRedelegate = false;
        Object.assign(this, init);
    }
}
exports.ProviderConfig = ProviderConfig;
//# sourceMappingURL=provider.config.js.map