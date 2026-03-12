"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeybaseIdentity = void 0;
class KeybaseIdentity {
    constructor(init) {
        this.identity = '';
        this.name = '';
        this.description = '';
        this.avatar = '';
        this.twitter = '';
        this.website = '';
        this.location = '';
        Object.assign(this, init);
    }
}
exports.KeybaseIdentity = KeybaseIdentity;
//# sourceMappingURL=keybase.identity.js.map