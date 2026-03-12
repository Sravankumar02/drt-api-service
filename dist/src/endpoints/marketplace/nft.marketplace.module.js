"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftMarketplaceModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const graphql_module_1 = require("../../common/graphql/graphql.module");
const nft_marketplace_service_1 = require("./nft.marketplace.service");
let NftMarketplaceModule = class NftMarketplaceModule {
};
NftMarketplaceModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => graphql_module_1.GraphQlModule),
        ],
        providers: [
            nft_marketplace_service_1.NftMarketplaceService,
        ],
        exports: [
            nft_marketplace_service_1.NftMarketplaceService,
        ],
    })
], NftMarketplaceModule);
exports.NftMarketplaceModule = NftMarketplaceModule;
//# sourceMappingURL=nft.marketplace.module.js.map