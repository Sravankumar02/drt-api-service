"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptQuery = void 0;
const sdk_nestjs_elastic_1 = require("@sravankumar02/sdk-nestjs-elastic");
class ScriptQuery extends sdk_nestjs_elastic_1.AbstractQuery {
    constructor(source) {
        super();
        this.source = source;
    }
    getQuery() {
        return { script: { script: { source: this.source, lang: 'painless' } } };
    }
}
exports.ScriptQuery = ScriptQuery;
//# sourceMappingURL=script.query.js.map