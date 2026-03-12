"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeybaseConfirmationDb = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let KeybaseConfirmationDb = class KeybaseConfirmationDb {
    constructor() {
        this.identity = '';
        this.keys = [];
    }
};
tslib_1.__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    tslib_1.__metadata("design:type", String)
], KeybaseConfirmationDb.prototype, "identifier", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], KeybaseConfirmationDb.prototype, "identity", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Array)
], KeybaseConfirmationDb.prototype, "keys", void 0);
KeybaseConfirmationDb = tslib_1.__decorate([
    (0, typeorm_1.Entity)('keybase_confirmations'),
    (0, typeorm_1.Index)(['identity'], { unique: true })
], KeybaseConfirmationDb);
exports.KeybaseConfirmationDb = KeybaseConfirmationDb;
//# sourceMappingURL=keybase.confirmation.db.js.map