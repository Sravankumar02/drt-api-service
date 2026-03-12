import { KeyUnbondPeriod } from "./entities/key.unbond.period";
import { KeysService } from "./keys.service";
export declare class KeysController {
    private readonly keysService;
    constructor(keysService: KeysService);
    getKeyUnbondPeriod(key: string): Promise<KeyUnbondPeriod>;
}
