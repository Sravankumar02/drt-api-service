import { ProviderService } from "./provider.service";
import { Provider } from "./entities/provider";
import { Response } from "express";
import { ProviderAccounts } from "./entities/provider.accounts";
export declare class ProviderController {
    private readonly providerService;
    constructor(providerService: ProviderService);
    getProviders(identity?: string, owner?: string, providers?: string[], withIdentityInfo?: boolean, withLatestInfo?: boolean): Promise<Provider[]>;
    getProviderAccounts(address: string, from: number, size: number): Promise<ProviderAccounts[]>;
    getProviderAccountsCount(address: string): Promise<number>;
    getProvider(address: string): Promise<Provider>;
    getIdentityAvatar(address: string, response: Response): Promise<void>;
}
