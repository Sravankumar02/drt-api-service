"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeSortAuction = void 0;
const graphql_1 = require("@nestjs/graphql");
var NodeSortAuction;
(function (NodeSortAuction) {
    NodeSortAuction["auctionValidators"] = "auctionValidators";
    NodeSortAuction["droppedValidators"] = "droppedValidators";
    NodeSortAuction["qualifiedAuctionValidators"] = "qualifiedAuctionValidators";
    NodeSortAuction["qualifiedStake"] = "qualifiedStake";
    NodeSortAuction["dangerZoneValidators"] = "dangerZoneValidators";
})(NodeSortAuction = exports.NodeSortAuction || (exports.NodeSortAuction = {}));
(0, graphql_1.registerEnumType)(NodeSortAuction, {
    name: 'NodeSortAuction',
    description: 'Node Sort Auction object.',
    valuesMap: {
        auctionValidators: {
            description: 'Auction Validators.',
        },
        droppedValidators: {
            description: 'Dropped Validators.',
        },
        qualifiedAuctionValidators: {
            description: 'Qualified Auction Validators.',
        },
        qualifiedStake: {
            description: 'Node qualified stake.',
        },
        dangerZoneValidators: {
            description: 'Danger Zone Validators.',
        },
    },
});
//# sourceMappingURL=node.sort.auction.js.map