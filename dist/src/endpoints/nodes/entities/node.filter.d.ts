import { SortOrder } from "src/common/entities/sort.order";
import { NodeStatus } from "./node.status";
import { NodeType } from "./node.type";
import { NodeSort } from "./node.sort";
export declare class NodeFilter {
    constructor(init?: Partial<NodeFilter>);
    search: string | undefined;
    online: boolean | undefined;
    type: NodeType | undefined;
    status: NodeStatus | undefined;
    shard: number | undefined;
    issues: boolean | undefined;
    identity: string | undefined;
    provider: string | undefined;
    owner: string | undefined;
    auctioned: boolean | undefined;
    fullHistory: boolean | undefined;
    sort: NodeSort | undefined;
    order: SortOrder | undefined;
    keys: string[] | undefined;
    isQualified: boolean | undefined;
    isAuctionDangerZone: boolean | undefined;
    isAuctioned: boolean | undefined;
    withIdentityInfo: boolean | undefined;
}
