"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotSwappableSettingDb = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let HotSwappableSettingDb = class HotSwappableSettingDb {
    constructor() {
        this.name = '';
    }
};
tslib_1.__decorate([
    (0, typeorm_1.ObjectIdColumn)(),
    tslib_1.__metadata("design:type", String)
], HotSwappableSettingDb.prototype, "identifier", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", String)
], HotSwappableSettingDb.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('json'),
    tslib_1.__metadata("design:type", Object)
], HotSwappableSettingDb.prototype, "value", void 0);
HotSwappableSettingDb = tslib_1.__decorate([
    (0, typeorm_1.Entity)('hot_swappable_settings'),
    (0, typeorm_1.Index)(['name'], { unique: true })
], HotSwappableSettingDb);
exports.HotSwappableSettingDb = HotSwappableSettingDb;
//# sourceMappingURL=hot.swappable.setting.js.map