import { ProviderUnstakedTokens } from "./provider.unstaked.tokens";
export declare class ProviderStake {
    constructor(init?: Partial<ProviderStake>);
    totalStaked: string;
    unstakedTokens: ProviderUnstakedTokens[] | undefined;
}
