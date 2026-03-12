import { SortOrder } from "src/common/entities/sort.order";
import { NodeSortAuction } from "./node.sort.auction";
export declare class NodeAuctionFilter {
    constructor(init?: Partial<NodeAuctionFilter>);
    search: string | undefined;
    sort: NodeSortAuction | undefined;
    order: SortOrder | undefined;
}
