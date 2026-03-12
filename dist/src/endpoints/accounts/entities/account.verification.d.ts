import { AccountVerificationStatus } from './account.verification.status';
export declare class AccountVerification {
    constructor(init?: Partial<AccountVerification>);
    codeHash?: string;
    source?: any;
    status: AccountVerificationStatus;
    ipfsFileHash?: string;
}
