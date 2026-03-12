export declare class HeartbeatStatus {
    constructor(init?: Partial<HeartbeatStatus>);
    timeStamp: string;
    publicKey: string;
    versionNumber: string;
    nodeDisplayName: string;
    identity: string;
    receivedShardID: number;
    computedShardID: number;
    peerType: string;
    isActive: boolean;
    nonce: number;
    numInstances: number;
    peerSubType: number;
    numTrieNodesReceived: number;
}
