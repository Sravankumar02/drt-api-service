declare const tokenExample: {
    identifier: string;
    name: string;
    ticker: string;
    owner: string;
    minted: string;
    burnt: string;
    decimals: number;
    isPaused: boolean;
    type: string;
    assets: {
        website: string;
        description: string;
        social: {
            email: string;
            twitter: string;
            whitepaper: string;
            coinmarketcap: string;
        };
        status: string;
        pngUrl: string;
        svgUrl: string;
    };
    transactions: number;
    accounts: number;
    canUpgrade: boolean;
    canMint: boolean;
    canBurn: boolean;
    canChangeOwner: boolean;
    canPause: boolean;
    canFreeze: boolean;
    canWipe: boolean;
    supply: string;
    circulatingSupply: string;
    tokenCount: number;
};
export default tokenExample;
