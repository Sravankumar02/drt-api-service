/// <reference types="jest" />
export declare const mockAccountService: () => {
    getAccounts: jest.Mock<any, any, any>;
    getAccountsCount: jest.Mock<any, any, any>;
    getAccount: jest.Mock<any, any, any>;
    getDeferredAccount: jest.Mock<any, any, any>;
    getAccountVerification: jest.Mock<any, any, any>;
    getAccountContracts: jest.Mock<any, any, any>;
    getAccountContractsCount: jest.Mock<any, any, any>;
    getKeys: jest.Mock<any, any, any>;
    getWaitingListForAddress: jest.Mock<any, any, any>;
};
export declare const mockTokenService: () => {
    isToken: jest.Mock<any, any, any>;
    getTokensForAddress: jest.Mock<any, any, any>;
    getTokenCountForAddress: jest.Mock<any, any, any>;
    getTokenForAddress: jest.Mock<any, any, any>;
    getTokensWithRolesForAddress: jest.Mock<any, any, any>;
    getTokensWithRolesForAddressCount: jest.Mock<any, any, any>;
    getTokenWithRolesForAddress: jest.Mock<any, any, any>;
};
export declare const mockNftService: () => {
    getNftsForAddress: jest.Mock<any, any, any>;
    getNftCountForAddress: jest.Mock<any, any, any>;
    getNftForAddress: jest.Mock<any, any, any>;
    isNft: jest.Mock<any, any, any>;
};
export declare const mockDelegationLegacyService: () => {
    getDelegationForAddress: jest.Mock<any, any, any>;
};
export declare const mockWaitingListService: () => {
    getWaitingListForAddress: jest.Mock<any, any, any>;
};
export declare const mockStakeService: () => {
    getStakeForAddress: jest.Mock<any, any, any>;
};
export declare const mockTransactionService: () => {
    getTransactions: jest.Mock<any, any, any>;
    getTransactionCount: jest.Mock<any, any, any>;
};
export declare const mockSmartContractResultService: () => {
    getAccountScResults: jest.Mock<any, any, any>;
    getAccountScResultsCount: jest.Mock<any, any, any>;
    getScResult: jest.Mock<any, any, any>;
};
export declare const mockCollectionService: () => {
    getCollectionsForAddress: jest.Mock<any, any, any>;
    getCollectionCountForAddress: jest.Mock<any, any, any>;
    getCollectionForAddress: jest.Mock<any, any, any>;
    getCollectionsWithRolesForAddress: jest.Mock<any, any, any>;
    getCollectionCountForAddressWithRoles: jest.Mock<any, any, any>;
    isCollection: jest.Mock<any, any, any>;
};
export declare const mockTransferService: () => {
    getTransfers: jest.Mock<any, any, any>;
    getTransfersCount: jest.Mock<any, any, any>;
};
export declare const mockApiConfigService: () => {
    getIsIndexerV3FlagActive: jest.Mock<any, any, any>;
    getAxiosTimeout: jest.Mock<any, any, any>;
    getRateLimiterSecret: jest.Mock<any, any, any>;
    getServerTimeout: jest.Mock<any, any, any>;
    getUseKeepAliveAgentFlag: jest.Mock<any, any, any>;
    getElasticUrl: jest.Mock<any, any, any>;
    getRedisUrl: jest.Mock<any, any, any>;
    getPoolLimit: jest.Mock<any, any, any>;
    getProcessTtl: jest.Mock<any, any, any>;
    getExternalMediaUrl: jest.Mock<any, any, any>;
    getMediaUrl: jest.Mock<any, any, any>;
    isElasticCircuitBreakerEnabled: jest.Mock<any, any, any>;
    getElasticCircuitBreakerConfig: jest.Mock<any, any, any>;
    getConfig: jest.Mock<any, any, any>;
};
export declare const mockDelegationService: () => {
    getDelegationForAddress: jest.Mock<any, any, any>;
};
