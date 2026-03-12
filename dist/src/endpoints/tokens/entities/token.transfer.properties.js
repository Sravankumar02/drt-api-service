"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenTransferProperties = void 0;
const dcdt_type_1 = require("../../dcdt/entities/dcdt.type");
class TokenTransferProperties {
    constructor(init) {
        this.type = dcdt_type_1.DcdtType.FungibleDCDT;
        this.ticker = '';
        this.decimals = 0;
        this.name = '';
        this.svgUrl = '';
        Object.assign(this, init);
    }
}
exports.TokenTransferProperties = TokenTransferProperties;
//# sourceMappingURL=token.transfer.properties.js.map