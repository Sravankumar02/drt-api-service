export declare class NetworkConfig {
    constructor(init?: Partial<NetworkConfig>);
    drt_adaptivity: boolean;
    drt_chain_id: string;
    drt_denomination: number;
    drt_gas_per_data_byte: number;
    drt_gas_price_modifier: string;
    drt_hysteresis: string;
    drt_latest_tag_software_version: string;
    drt_max_gas_per_transaction: number;
    drt_meta_consensus_group_size: number;
    drt_min_gas_limit: number;
    drt_min_gas_price: number;
    drt_min_transaction_version: number;
    drt_num_metachain_nodes: number;
    drt_num_nodes_in_shard: number;
    drt_num_shards_without_meta: number;
    drt_rewards_top_up_gradient_point: string;
    drt_round_duration: number;
    drt_rounds_per_epoch: number;
    drt_shard_consensus_group_size: number;
    drt_start_time: number;
    drt_top_up_factor: string;
}
