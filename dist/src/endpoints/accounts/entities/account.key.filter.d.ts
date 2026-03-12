import { NodeStatusRaw } from "src/endpoints/nodes/entities/node.status";
export declare class AccountKeyFilter {
    constructor(init?: Partial<AccountKeyFilter>);
    status: NodeStatusRaw[];
}
