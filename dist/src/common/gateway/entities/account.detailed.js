"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountDetailed = void 0;
class AccountDetailed {
    constructor(init) {
        this.address = '';
        this.nonce = 0;
        this.balance = '';
        this.username = '';
        this.code = '';
        this.rootHash = '';
        this.codeMetadata = '';
        this.developerReward = '';
        this.ownerAddress = '';
        Object.assign(this, init);
    }
}
exports.AccountDetailed = AccountDetailed;
//# sourceMappingURL=account.detailed.js.map