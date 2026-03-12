import { CacheService } from "@sravankumar02/sdk-nestjs-cache";
import { ApiConfigService } from "src/common/api-config/api.config.service";
import { QueryPagination } from "src/common/entities/query.pagination";
import { VmQueryService } from "../vm.query/vm.query.service";
import { WaitingList } from "./entities/waiting.list";
export declare class WaitingListService {
    private readonly vmQueryService;
    private readonly apiConfigService;
    private readonly cachingService;
    constructor(vmQueryService: VmQueryService, apiConfigService: ApiConfigService, cachingService: CacheService);
    getWaitingList(queryPagination: QueryPagination): Promise<WaitingList[]>;
    getWaitingListForAddress(address: string): Promise<WaitingList[]>;
    getWaitingListCount(): Promise<number>;
    private getFullWaitingList;
    private getFullWaitingListRaw;
}
