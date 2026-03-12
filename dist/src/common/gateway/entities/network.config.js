"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkConfig = void 0;
class NetworkConfig {
    constructor(init) {
        this.drt_adaptivity = false;
        this.drt_chain_id = '';
        this.drt_denomination = 0;
        this.drt_gas_per_data_byte = 0;
        this.drt_gas_price_modifier = '0';
        this.drt_hysteresis = '0';
        this.drt_latest_tag_software_version = '0';
        this.drt_max_gas_per_transaction = 0;
        this.drt_meta_consensus_group_size = 0;
        this.drt_min_gas_limit = 0;
        this.drt_min_gas_price = 0;
        this.drt_min_transaction_version = 0;
        this.drt_num_metachain_nodes = 0;
        this.drt_num_nodes_in_shard = 0;
        this.drt_num_shards_without_meta = 0;
        this.drt_rewards_top_up_gradient_point = '0';
        this.drt_round_duration = 0;
        this.drt_rounds_per_epoch = 0;
        this.drt_shard_consensus_group_size = 0;
        this.drt_start_time = 0;
        this.drt_top_up_factor = '0';
        Object.assign(this, init);
    }
}
exports.NetworkConfig = NetworkConfig;
//# sourceMappingURL=network.config.js.map