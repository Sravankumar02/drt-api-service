import { NodeService } from "src/endpoints/nodes/node.service";
import { Node } from "src/endpoints/nodes/entities/node";
import { NodeType } from "./entities/node.type";
import { NodeStatus } from "./entities/node.status";
import { SortOrder } from "src/common/entities/sort.order";
import { NodeSort } from "./entities/node.sort";
import { NodeAuction } from "./entities/node.auction";
import { NodeSortAuction } from "./entities/node.sort.auction";
export declare class NodeController {
    private readonly nodeService;
    constructor(nodeService: NodeService);
    getNodes(from: number, size: number, search?: string, keys?: string[], online?: boolean, type?: NodeType, status?: NodeStatus, shard?: number, issues?: boolean, identity?: string, provider?: string, owner?: string, auctioned?: boolean, fullHistory?: boolean, sort?: NodeSort, order?: SortOrder, withIdentityInfo?: boolean, isQualified?: boolean, isAuctioned?: boolean, isAuctionDangerZone?: boolean): Promise<Node[]>;
    getNodeVersions(): Promise<NodeVersions>;
    getNodeCount(search?: string, online?: boolean, type?: NodeType, status?: NodeStatus, shard?: number, issues?: boolean, identity?: string, provider?: string, owner?: string, auctioned?: boolean, fullHistory?: boolean, sort?: NodeSort, order?: SortOrder, isQualified?: boolean, isAuctioned?: boolean, isAuctionDangerZone?: boolean): Promise<number>;
    getNodeCountAlternative(search?: string, online?: boolean, type?: NodeType, status?: NodeStatus, shard?: number, issues?: boolean, identity?: string, provider?: string, auctioned?: boolean, fullHistory?: boolean, owner?: string, sort?: NodeSort, order?: SortOrder, isQualified?: boolean, isAuctioned?: boolean, isAuctionDangerZone?: boolean): Promise<number>;
    getNodesAuctions(from: number, size: number, sort?: NodeSortAuction, order?: SortOrder): Promise<NodeAuction[]>;
    getNode(bls: string): Promise<Node>;
}
