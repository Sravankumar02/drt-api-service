"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotWritableError = void 0;
class NotWritableError extends Error {
    constructor(table) {
        super(`Schema '${table}' is not writable`);
    }
}
exports.NotWritableError = NotWritableError;
//# sourceMappingURL=not.writable.error.js.map