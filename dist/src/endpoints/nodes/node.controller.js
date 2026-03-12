"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const node_service_1 = require("./node.service");
const node_1 = require("./entities/node");
const node_type_1 = require("./entities/node.type");
const node_status_1 = require("./entities/node.status");
const sort_order_1 = require("../../common/entities/sort.order");
const node_sort_1 = require("./entities/node.sort");
const sort_nodes_1 = require("../../common/entities/sort.nodes");
const node_filter_1 = require("./entities/node.filter");
const query_pagination_1 = require("../../common/entities/query.pagination");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const node_auction_1 = require("./entities/node.auction");
const node_sort_auction_1 = require("./entities/node.sort.auction");
const node_auction_filter_1 = require("./entities/node.auction.filter");
let NodeController = class NodeController {
    constructor(nodeService) {
        this.nodeService = nodeService;
    }
    async getNodes(from, size, search, keys, online, type, status, shard, issues, identity, provider, owner, auctioned, fullHistory, sort, order, withIdentityInfo, isQualified, isAuctioned, isAuctionDangerZone) {
        return await this.nodeService.getNodes(new query_pagination_1.QueryPagination({ from, size }), new node_filter_1.NodeFilter({ search, keys, online, type, status, shard, issues, identity, provider, owner, auctioned, fullHistory, sort, order, isQualified, isAuctionDangerZone, isAuctioned, withIdentityInfo }));
    }
    async getNodeVersions() {
        return await this.nodeService.getNodeVersions();
    }
    getNodeCount(search, online, type, status, shard, issues, identity, provider, owner, auctioned, fullHistory, sort, order, isQualified, isAuctioned, isAuctionDangerZone) {
        return this.nodeService.getNodeCount(new node_filter_1.NodeFilter({ search, online, type, status, shard, issues, identity, provider, owner, auctioned, fullHistory, sort, order, isQualified, isAuctionDangerZone, isAuctioned }));
    }
    getNodeCountAlternative(search, online, type, status, shard, issues, identity, provider, auctioned, fullHistory, owner, sort, order, isQualified, isAuctioned, isAuctionDangerZone) {
        return this.nodeService.getNodeCount(new node_filter_1.NodeFilter({ search, online, type, status, shard, issues, identity, provider, owner, auctioned, fullHistory, sort, order, isQualified, isAuctionDangerZone, isAuctioned }));
    }
    async getNodesAuctions(from, size, sort, order) {
        return await this.nodeService.getNodesAuctions(new query_pagination_1.QueryPagination({ from, size }), new node_auction_filter_1.NodeAuctionFilter({ sort, order }));
    }
    async getNode(bls) {
        const provider = await this.nodeService.getNode(bls);
        if (provider === undefined) {
            throw new common_1.HttpException('Node not found', common_1.HttpStatus.NOT_FOUND);
        }
        return provider;
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/nodes"),
    (0, swagger_1.ApiOperation)({ summary: 'Nodes', description: 'Returns a list of nodes of type observer or validator' }),
    (0, swagger_1.ApiOkResponse)({ type: [node_1.Node] }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'keys', description: 'Search by multiple keys, comma-separated', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: 'Search by name, bls or version', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'online', description: 'Whether node is online or not', required: false, type: 'boolean' }),
    (0, swagger_1.ApiQuery)({ name: 'type', description: 'Type of node', required: false, enum: node_type_1.NodeType }),
    (0, swagger_1.ApiQuery)({ name: 'status', description: 'Node status', required: false, enum: node_status_1.NodeStatus }),
    (0, swagger_1.ApiQuery)({ name: 'shard', description: 'Node shard', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'issues', description: 'Whether node has issues or not', required: false, type: 'boolean' }),
    (0, swagger_1.ApiQuery)({ name: 'identity', description: 'Node identity', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'provider', description: 'Node provider', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'owner', description: 'Node owner', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'auctioned', description: 'Whether node is auctioned or not', required: false, type: 'boolean' }),
    (0, swagger_1.ApiQuery)({ name: 'fullHistory', description: 'Whether node is of type \'Full History\' or not', required: false, type: 'boolean' }),
    (0, swagger_1.ApiQuery)({ name: 'sort', description: 'Sorting criteria', required: false, enum: sort_nodes_1.SortNodes }),
    (0, swagger_1.ApiQuery)({ name: 'order', description: 'Sorting order (asc / desc)', required: false, enum: sort_order_1.SortOrder }),
    (0, swagger_1.ApiQuery)({ name: 'isQualified', description: 'Whether node is qualified or not', required: false, type: 'boolean' }),
    (0, swagger_1.ApiQuery)({ name: 'isAuctioned', description: 'Whether node is auctioned or not', required: false, type: 'boolean' }),
    (0, swagger_1.ApiQuery)({ name: 'isAuctionDangerZone', description: 'Whether node is in danger zone or not', required: false, type: 'boolean' }),
    (0, swagger_1.ApiQuery)({ name: 'withIdentityInfo', description: 'Returns identity data for nodes', required: false }),
    tslib_1.__param(0, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)('size', new common_1.DefaultValuePipe(25), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('search')),
    tslib_1.__param(3, (0, common_1.Query)('keys')),
    tslib_1.__param(4, (0, common_1.Query)('online', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(5, (0, common_1.Query)('type', new sdk_nestjs_common_1.ParseEnumPipe(node_type_1.NodeType))),
    tslib_1.__param(6, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumPipe(node_status_1.NodeStatus))),
    tslib_1.__param(7, (0, common_1.Query)('shard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(8, (0, common_1.Query)('issues', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(9, (0, common_1.Query)('identity')),
    tslib_1.__param(10, (0, common_1.Query)('provider', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(11, (0, common_1.Query)('owner', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(12, (0, common_1.Query)('auctioned', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(13, (0, common_1.Query)('fullHistory', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(14, (0, common_1.Query)('sort', new sdk_nestjs_common_1.ParseEnumPipe(node_sort_1.NodeSort))),
    tslib_1.__param(15, (0, common_1.Query)('order', new sdk_nestjs_common_1.ParseEnumPipe(sort_order_1.SortOrder))),
    tslib_1.__param(16, (0, common_1.Query)('withIdentityInfo', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(17, (0, common_1.Query)('isQualified', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(18, (0, common_1.Query)('isAuctioned', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(19, (0, common_1.Query)('isAuctionDangerZone', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Array, Boolean, String, String, Number, Boolean, String, String, String, Boolean, Boolean, String, String, Boolean, Boolean, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], NodeController.prototype, "getNodes", null);
tslib_1.__decorate([
    (0, common_1.Get)("/nodes/versions"),
    (0, swagger_1.ApiOperation)({ summary: 'Node versions', description: 'Returns breakdown of node versions for validator nodes' }),
    (0, swagger_1.ApiOkResponse)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], NodeController.prototype, "getNodeVersions", null);
tslib_1.__decorate([
    (0, common_1.Get)("/nodes/count"),
    (0, swagger_1.ApiOperation)({ summary: 'Nodes count', description: 'Returns number of all observer/validator nodes available on blockchain' }),
    (0, swagger_1.ApiOkResponse)({ type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'search', description: 'Search by name, bls or version', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'online', description: 'Whether node is online or not', required: false, type: 'boolean' }),
    (0, swagger_1.ApiQuery)({ name: 'type', description: 'Type of node', required: false, enum: node_type_1.NodeType }),
    (0, swagger_1.ApiQuery)({ name: 'status', description: 'Node status', required: false, enum: node_status_1.NodeStatus }),
    (0, swagger_1.ApiQuery)({ name: 'shard', description: 'Node shard', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'issues', description: 'Whether node has issues or not', required: false, type: 'boolean' }),
    (0, swagger_1.ApiQuery)({ name: 'identity', description: 'Node identity', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'provider', description: 'Node provider', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'owner', description: 'Node owner', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'auctioned', description: 'Whether node is auctioned or not', required: false, type: 'boolean' }),
    (0, swagger_1.ApiQuery)({ name: 'fullHistory', description: 'Whether node is of type \'Full History\' or not', required: false, type: 'boolean' }),
    (0, swagger_1.ApiQuery)({ name: 'sort', description: 'Sorting criteria', required: false, enum: sort_nodes_1.SortNodes }),
    (0, swagger_1.ApiQuery)({ name: 'order', description: 'Sorting order (asc / desc)', required: false, enum: sort_order_1.SortOrder }),
    (0, swagger_1.ApiQuery)({ name: 'isQualified', description: 'Whether node is qualified or not', required: false, type: 'boolean' }),
    (0, swagger_1.ApiQuery)({ name: 'isAuctioned', description: 'Whether node is auctioned or not', required: false, type: 'boolean' }),
    (0, swagger_1.ApiQuery)({ name: 'isAuctionDangerZone', description: 'Whether node is in danger zone or not', required: false, type: 'boolean' }),
    tslib_1.__param(0, (0, common_1.Query)('search')),
    tslib_1.__param(1, (0, common_1.Query)('online', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(2, (0, common_1.Query)('type', new sdk_nestjs_common_1.ParseEnumPipe(node_type_1.NodeType))),
    tslib_1.__param(3, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumPipe(node_status_1.NodeStatus))),
    tslib_1.__param(4, (0, common_1.Query)('shard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(5, (0, common_1.Query)('issues', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(6, (0, common_1.Query)('identity')),
    tslib_1.__param(7, (0, common_1.Query)('provider', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(8, (0, common_1.Query)('owner', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(9, (0, common_1.Query)('auctioned', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(10, (0, common_1.Query)('fullHistory', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(11, (0, common_1.Query)('sort', new sdk_nestjs_common_1.ParseEnumPipe(node_sort_1.NodeSort))),
    tslib_1.__param(12, (0, common_1.Query)('order', new sdk_nestjs_common_1.ParseEnumPipe(sort_order_1.SortOrder))),
    tslib_1.__param(13, (0, common_1.Query)('isQualified', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(14, (0, common_1.Query)('isAuctioned', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(15, (0, common_1.Query)('isAuctionDangerZone', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Boolean, String, String, Number, Boolean, String, String, String, Boolean, Boolean, String, String, Boolean, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], NodeController.prototype, "getNodeCount", null);
tslib_1.__decorate([
    (0, common_1.Get)("/nodes/c"),
    (0, swagger_1.ApiExcludeEndpoint)(),
    tslib_1.__param(0, (0, common_1.Query)('search')),
    tslib_1.__param(1, (0, common_1.Query)('online', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(2, (0, common_1.Query)('type', new sdk_nestjs_common_1.ParseEnumPipe(node_type_1.NodeType))),
    tslib_1.__param(3, (0, common_1.Query)('status', new sdk_nestjs_common_1.ParseEnumPipe(node_status_1.NodeStatus))),
    tslib_1.__param(4, (0, common_1.Query)('shard', sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(5, (0, common_1.Query)('issues', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(6, (0, common_1.Query)('identity')),
    tslib_1.__param(7, (0, common_1.Query)('provider', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(8, (0, common_1.Query)('auctioned', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(9, (0, common_1.Query)('fullHistory', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(10, (0, common_1.Query)('owner', sdk_nestjs_common_1.ParseAddressPipe)),
    tslib_1.__param(11, (0, common_1.Query)('sort', new sdk_nestjs_common_1.ParseEnumPipe(node_sort_1.NodeSort))),
    tslib_1.__param(12, (0, common_1.Query)('order', new sdk_nestjs_common_1.ParseEnumPipe(sort_order_1.SortOrder))),
    tslib_1.__param(13, (0, common_1.Query)('isQualified', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(14, (0, common_1.Query)('isAuctioned', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__param(15, (0, common_1.Query)('isAuctionDangerZone', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Boolean, String, String, Number, Boolean, String, String, Boolean, Boolean, String, String, String, Boolean, Boolean, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], NodeController.prototype, "getNodeCountAlternative", null);
tslib_1.__decorate([
    (0, common_1.Get)("nodes/auctions"),
    (0, swagger_1.ApiOperation)({ summary: 'Nodes Auctions', description: 'Returns a list of nodes in auction' }),
    (0, swagger_1.ApiOkResponse)({ type: [node_auction_1.NodeAuction] }),
    (0, swagger_1.ApiQuery)({ name: 'from', description: 'Number of items to skip for the result set', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'size', description: 'Number of items to retrieve', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'sort', description: 'Sorting criteria', required: false, enum: node_sort_auction_1.NodeSortAuction }),
    (0, swagger_1.ApiQuery)({ name: 'order', description: 'Sorting order (asc / desc)', required: false, enum: sort_order_1.SortOrder }),
    tslib_1.__param(0, (0, common_1.Query)('from', new common_1.DefaultValuePipe(0), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(1, (0, common_1.Query)('size', new common_1.DefaultValuePipe(10000), sdk_nestjs_common_1.ParseIntPipe)),
    tslib_1.__param(2, (0, common_1.Query)('sort', new sdk_nestjs_common_1.ParseEnumPipe(node_sort_auction_1.NodeSortAuction))),
    tslib_1.__param(3, (0, common_1.Query)('order', new sdk_nestjs_common_1.ParseEnumPipe(sort_order_1.SortOrder))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NodeController.prototype, "getNodesAuctions", null);
tslib_1.__decorate([
    (0, common_1.Get)('/nodes/:bls'),
    (0, swagger_1.ApiOperation)({ summary: 'Node', description: 'Returns details about a specific node for a given bls key' }),
    (0, swagger_1.ApiOkResponse)({ type: node_1.Node }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Node not found' }),
    tslib_1.__param(0, (0, common_1.Param)('bls', sdk_nestjs_common_1.ParseBlsHashPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NodeController.prototype, "getNode", null);
NodeController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('nodes'),
    tslib_1.__metadata("design:paramtypes", [node_service_1.NodeService])
], NodeController);
exports.NodeController = NodeController;
//# sourceMappingURL=node.controller.js.map