"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkStatus = void 0;
class NetworkStatus {
    constructor(init) {
        this.drt_cross_check_block_height = '';
        this.drt_current_round = 0;
        this.drt_epoch_number = 0;
        this.drt_highest_final_nonce = 0;
        this.drt_nonce = 0;
        this.drt_nonce_at_epoch_start = 0;
        this.drt_nonces_passed_in_current_epoch = 0;
        this.drt_round_at_epoch_start = 0;
        this.drt_rounds_passed_in_current_epoch = 0;
        this.drt_rounds_per_epoch = 0;
        Object.assign(this, init);
    }
}
exports.NetworkStatus = NetworkStatus;
//# sourceMappingURL=network.status.js.map