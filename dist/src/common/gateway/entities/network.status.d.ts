export declare class NetworkStatus {
    constructor(init?: Partial<NetworkStatus>);
    drt_cross_check_block_height: string;
    drt_current_round: number;
    drt_epoch_number: number;
    drt_highest_final_nonce: number;
    drt_nonce: number;
    drt_nonce_at_epoch_start: number;
    drt_nonces_passed_in_current_epoch: number;
    drt_round_at_epoch_start: number;
    drt_rounds_passed_in_current_epoch: number;
    drt_rounds_per_epoch: number;
}
