import { UsernameService } from "./username.service";
import { AccountDetailed } from '../accounts/entities/account.detailed';
export declare class UsernameController {
    private readonly usernameService;
    constructor(usernameService: UsernameService);
    getUsernameDetails(res: any, username: string, withGuardianInfo: boolean): Promise<AccountDetailed | null>;
}
