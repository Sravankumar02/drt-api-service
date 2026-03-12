"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeartbeatStatus = void 0;
class HeartbeatStatus {
    constructor(init) {
        this.timeStamp = '';
        this.publicKey = '';
        this.versionNumber = '';
        this.nodeDisplayName = '';
        this.identity = '';
        this.receivedShardID = 0;
        this.computedShardID = 0;
        this.peerType = '';
        this.isActive = false;
        this.nonce = 0;
        this.numInstances = 0;
        this.peerSubType = 0;
        this.numTrieNodesReceived = 0;
        Object.assign(this, init);
    }
}
exports.HeartbeatStatus = HeartbeatStatus;
//# sourceMappingURL=heartbeat.status.js.map