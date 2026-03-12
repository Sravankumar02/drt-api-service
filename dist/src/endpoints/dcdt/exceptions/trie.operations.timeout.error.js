"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrieOperationsTimeoutError = void 0;
class TrieOperationsTimeoutError extends Error {
    constructor() {
        super('Trie operations timeout');
        Object.setPrototypeOf(this, TrieOperationsTimeoutError.prototype);
    }
}
exports.TrieOperationsTimeoutError = TrieOperationsTimeoutError;
//# sourceMappingURL=trie.operations.timeout.error.js.map