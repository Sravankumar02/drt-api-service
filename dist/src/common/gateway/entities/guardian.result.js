"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuardianResult = void 0;
const guardian_data_1 = require("./guardian.data");
class GuardianResult {
    constructor(init) {
        this.guardianData = new guardian_data_1.GuardianData();
        Object.assign(this, init);
    }
}
exports.GuardianResult = GuardianResult;
//# sourceMappingURL=guardian.result.js.map