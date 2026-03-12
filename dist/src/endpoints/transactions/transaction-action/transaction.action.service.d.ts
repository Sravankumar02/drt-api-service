import { Transaction } from "src/endpoints/transactions/entities/transaction";
import { TransactionMetadata } from "./entities/transaction.metadata";
import { TransactionAction } from "./entities/transaction.action";
import { TransactionActionMoaRecognizerService } from "./recognizers/moa/transaction.action.moa.recognizer.service";
import { StakeActionRecognizerService } from "./recognizers/staking/transaction.action.stake.recognizer.service";
import { SCCallActionRecognizerService } from "./recognizers/sc-calls/transaction.action.sc-calls.recognizer.service";
import { TransactionActionDcdtNftRecognizerService } from "./recognizers/dcdt/transaction.action.dcdt.nft.recognizer.service";
import { TokenTransferService } from "src/endpoints/tokens/token.transfer.service";
import { MetabondingActionRecognizerService } from "./recognizers/moa/moa.metabonding.action.recognizer.service";
export declare class TransactionActionService {
    private readonly moaRecognizer;
    private readonly dcdtNftRecognizer;
    private readonly stakeRecognizer;
    private readonly scCallRecognizer;
    private readonly tokenTransferService;
    private readonly metabondingRecognizer;
    private recognizers;
    private readonly logger;
    constructor(moaRecognizer: TransactionActionMoaRecognizerService, dcdtNftRecognizer: TransactionActionDcdtNftRecognizerService, stakeRecognizer: StakeActionRecognizerService, scCallRecognizer: SCCallActionRecognizerService, tokenTransferService: TokenTransferService, metabondingRecognizer: MetabondingActionRecognizerService);
    private getRecognizers;
    getTransactionAction(transaction: Transaction, applyValue?: boolean): Promise<TransactionAction | undefined>;
    getTransactionMetadata(transaction: Transaction, applyValue?: boolean): Promise<TransactionMetadata>;
    private getNormalTransactionMetadata;
    private isSmartContractArgument;
    private getMultiTransferMetadata;
    private parseValueFromMultiTransferValueArg;
    private getNftTransferMetadata;
    private getDcdtTransactionMetadata;
}
