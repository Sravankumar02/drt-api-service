"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkEconomics = void 0;
class NetworkEconomics {
    constructor(init) {
        this.drt_dev_rewards = '';
        this.drt_epoch_for_economics_data = 0;
        this.drt_inflation = '0';
        this.drt_total_base_staked_value = '0';
        this.drt_total_fees = '0';
        this.drt_total_supply = '0';
        this.drt_total_top_up_value = '0';
        Object.assign(this, init);
    }
}
exports.NetworkEconomics = NetworkEconomics;
//# sourceMappingURL=network.economics.js.map