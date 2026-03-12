import { SortOrder } from 'src/common/entities/sort.order';
export declare class BlockSubscribePayload {
    shard?: number;
    order?: SortOrder;
    from?: number;
    size?: number;
    withProposerIdentity?: boolean;
}
