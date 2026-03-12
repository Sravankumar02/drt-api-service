import { VmQueryRequest } from "./entities/vm.query.request";
import { VmQueryService } from "./vm.query.service";
export declare class VmQueryController {
    private readonly vmQueryService;
    constructor(vmQueryService: VmQueryService);
    query(query: VmQueryRequest, timestamp: number | undefined): Promise<any>;
}
