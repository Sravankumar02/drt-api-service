import { ApiConfigService } from "src/common/api-config/api.config.service";
import { VmQueryService } from "../vm.query/vm.query.service";
import { KeyUnbondPeriod } from "./entities/key.unbond.period";
export declare class KeysService {
    private readonly vmQueryService;
    private readonly apiConfigService;
    private readonly logger;
    constructor(vmQueryService: VmQueryService, apiConfigService: ApiConfigService);
    getKeyUnbondPeriod(key: string): Promise<KeyUnbondPeriod | undefined>;
}
