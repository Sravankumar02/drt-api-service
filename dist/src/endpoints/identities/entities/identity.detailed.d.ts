import { KeybaseIdentity } from "src/common/keybase/entities/keybase.identity";
import { Node } from "src/endpoints/nodes/entities/node";
export declare class IdentityDetailed extends KeybaseIdentity {
    constructor(init?: Partial<IdentityDetailed>);
    nodes?: Node[];
}
