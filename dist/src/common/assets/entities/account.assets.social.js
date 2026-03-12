"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountAssetsSocial = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
let AccountAssetsSocial = class AccountAssetsSocial {
    constructor(init) {
        this.website = '';
        this.email = '';
        this.blog = '';
        this.twitter = '';
        this.discord = '';
        this.telegram = '';
        this.facebook = '';
        this.instagram = '';
        this.youtube = '';
        this.whitepaper = '';
        this.coinmarketcap = '';
        this.coingecko = '';
        this.linkedin = '';
        Object.assign(this, init);
    }
};
AccountAssetsSocial = tslib_1.__decorate([
    (0, graphql_1.ObjectType)("AccountAssetsSocial", { description: "Account assets social object type." }),
    tslib_1.__metadata("design:paramtypes", [Object])
], AccountAssetsSocial);
exports.AccountAssetsSocial = AccountAssetsSocial;
//# sourceMappingURL=account.assets.social.js.map