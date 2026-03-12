import { QueryConditionOptions } from "@sravankumar02/sdk-nestjs-elastic";
import { QueryPagination } from "src/common/entities/query.pagination";
export declare class RoundFilter extends QueryPagination {
    constructor(init?: Partial<RoundFilter>);
    condition: QueryConditionOptions | undefined;
    validator: string | undefined;
    shard: number | undefined;
    epoch: number | undefined;
}
