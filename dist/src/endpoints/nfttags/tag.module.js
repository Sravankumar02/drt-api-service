"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const tag_service_1 = require("./tag.service");
let TagModule = class TagModule {
};
TagModule = tslib_1.__decorate([
    (0, common_1.Module)({
        providers: [
            tag_service_1.TagService,
        ],
        exports: [
            tag_service_1.TagService,
        ],
    })
], TagModule);
exports.TagModule = TagModule;
//# sourceMappingURL=tag.module.js.map