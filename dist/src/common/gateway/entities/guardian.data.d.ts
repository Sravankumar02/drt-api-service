import { Guardian } from "./guardian";
export declare class GuardianData {
    constructor(init?: Partial<GuardianData>);
    activeGuardian?: Guardian;
    pendingGuardian?: Guardian;
    guarded?: boolean;
}
