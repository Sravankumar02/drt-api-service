"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeormUtils = void 0;
class TypeormUtils {
}
exports.TypeormUtils = TypeormUtils;
TypeormUtils.textToStringArrayTransformer = {
    to: (value) => JSON.stringify(value),
    from: (value) => JSON.parse(value),
};
TypeormUtils.textToNumberArrayTransformer = {
    to: (value) => JSON.stringify(value),
    from: (value) => JSON.parse(value),
};
//# sourceMappingURL=typeorm.utils.js.map