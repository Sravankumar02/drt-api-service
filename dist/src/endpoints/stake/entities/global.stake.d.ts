export declare class GlobalStake {
    constructor(init?: Partial<GlobalStake>);
    totalValidators: number;
    activeValidators: number;
    totalObservers: number;
    queueSize: number;
    totalStaked: string;
    minimumAuctionQualifiedTopUp: string | undefined;
    minimumAuctionQualifiedStake: string | undefined;
    auctionValidators: number | undefined;
    nakamotoCoefficient: number | undefined;
    dangerZoneValidators: number | undefined;
    eligibleValidators: number | undefined;
    waitingValidators: number | undefined;
    qualifiedAuctionValidators: number | undefined;
    allStakedNodes: number | undefined;
}
