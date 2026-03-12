"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountAssets = void 0;
const tslib_1 = require("tslib");
const graphql_1 = require("@nestjs/graphql");
let AccountAssets = class AccountAssets {
    constructor(init) {
        this.name = '';
        this.description = '';
        this.social = undefined;
        this.tags = [];
        this.proof = undefined;
        this.icon = undefined;
        this.iconPng = undefined;
        this.iconSvg = undefined;
        Object.assign(this, init);
    }
};
AccountAssets = tslib_1.__decorate([
    (0, graphql_1.ObjectType)("AccountAssets", { description: "Account assets object type." }),
    tslib_1.__metadata("design:paramtypes", [Object])
], AccountAssets);
exports.AccountAssets = AccountAssets;
//# sourceMappingURL=account.assets.js.map