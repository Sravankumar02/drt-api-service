"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundFilter = void 0;
const sdk_nestjs_elastic_1 = require("@sravankumar02/sdk-nestjs-elastic");
const query_pagination_1 = require("../../../common/entities/query.pagination");
class RoundFilter extends query_pagination_1.QueryPagination {
    constructor(init) {
        super();
        this.condition = sdk_nestjs_elastic_1.QueryConditionOptions.must;
        Object.assign(this, init);
    }
}
exports.RoundFilter = RoundFilter;
//# sourceMappingURL=round.filter.js.map