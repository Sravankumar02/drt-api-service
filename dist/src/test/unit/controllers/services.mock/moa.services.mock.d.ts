/// <reference types="jest" />
export declare const mockMoaSettingsService: () => {
    getSettings: jest.Mock<any, any, any>;
};
export declare const mockMoaEconomicsService: () => {
    getMoaEconomics: jest.Mock<any, any, any>;
};
export declare const mockMoaPairService: () => {
    getMoaPair: jest.Mock<any, any, any>;
    getMoaPairs: jest.Mock<any, any, any>;
    getMoaPairsCount: jest.Mock<any, any, any>;
};
export declare const mockMoaTokensService: () => {
    getMoaTokens: jest.Mock<any, any, any>;
    getMoaTokensCount: jest.Mock<any, any, any>;
    getMoaTokenByIdentifier: jest.Mock<any, any, any>;
};
export declare const mockMoaFarmsService: () => {
    getMoaFarms: jest.Mock<any, any, any>;
    getMoaFarmsCount: jest.Mock<any, any, any>;
    getMoaTokenByIdentifier: jest.Mock<any, any, any>;
};
