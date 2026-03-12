export interface GasBucket {
    index: number;
    gasAccumulated: number;
    ppuBegin: number;
    ppuEnd?: number;
    numTransactions: number;
}
