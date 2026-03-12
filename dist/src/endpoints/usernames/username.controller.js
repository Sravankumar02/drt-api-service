"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsernameController = void 0;
const tslib_1 = require("tslib");
const account_username_1 = require("./entities/account.username");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const username_service_1 = require("./username.service");
const sdk_nestjs_cache_1 = require("@sravankumar02/sdk-nestjs-cache");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
let UsernameController = class UsernameController {
    constructor(usernameService) {
        this.usernameService = usernameService;
    }
    async getUsernameDetails(res, username, withGuardianInfo) {
        const address = await this.usernameService.getAddressForUsername(username);
        if (!address) {
            throw new common_1.HttpException('Account not found', common_1.HttpStatus.NOT_FOUND);
        }
        const route = this.usernameService.getUsernameRedirectRoute(address, withGuardianInfo);
        return res.redirect(route);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)("/usernames/:username"),
    (0, swagger_1.ApiOperation)({ summary: 'Account details by username', description: 'Returns account details for a given username. Performs a redirect on the proper account address' }),
    (0, swagger_1.ApiOkResponse)({ type: account_username_1.AccountUsername }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Username not found' }),
    (0, sdk_nestjs_cache_1.NoCache)(),
    tslib_1.__param(0, (0, common_1.Res)()),
    tslib_1.__param(1, (0, common_1.Param)('username')),
    tslib_1.__param(2, (0, common_1.Query)('withGuardianInfo', sdk_nestjs_common_1.ParseBoolPipe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, String, Boolean]),
    tslib_1.__metadata("design:returntype", Promise)
], UsernameController.prototype, "getUsernameDetails", null);
UsernameController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    (0, swagger_1.ApiTags)('usernames'),
    tslib_1.__metadata("design:paramtypes", [username_service_1.UsernameService])
], UsernameController);
exports.UsernameController = UsernameController;
//# sourceMappingURL=username.controller.js.map