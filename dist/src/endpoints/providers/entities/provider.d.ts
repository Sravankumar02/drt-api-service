import { NodesInfos } from "./nodes.infos";
import { Identity } from "src/endpoints/identities/entities/identity";
export declare class Provider extends NodesInfos {
    constructor(init?: Partial<Provider>);
    provider: string;
    owner: string | null;
    featured: boolean;
    serviceFee: number;
    delegationCap: string;
    apr: number;
    numUsers: number;
    cumulatedRewards: string | null;
    identity: string | undefined;
    initialOwnerFunds: string | undefined;
    automaticActivation: boolean | undefined;
    checkCapOnRedelegate: boolean | undefined;
    ownerBelowRequiredBalanceThreshold: boolean | undefined;
    totalUnStaked: string | undefined;
    createdNonce: number | undefined;
    githubProfileValidated: boolean | undefined;
    githubProfileValidatedAt: string | undefined;
    githubKeysValidated: boolean | undefined;
    githubKeysValidatedAt: string | undefined;
    identityInfo?: Identity;
}
