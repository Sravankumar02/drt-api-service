"use strict";
var TransactionLoggingInterceptor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionLoggingInterceptor = void 0;
const tslib_1 = require("tslib");
const sdk_nestjs_common_1 = require("@sravankumar02/sdk-nestjs-common");
const common_1 = require("@nestjs/common");
const gateway_proxy_controller_1 = require("../endpoints/proxy/gateway.proxy.controller");
const transaction_controller_1 = require("../endpoints/transactions/transaction.controller");
const winston_1 = tslib_1.__importDefault(require("winston"));
const winston_daily_rotate_file_1 = tslib_1.__importDefault(require("winston-daily-rotate-file"));
let TransactionLoggingInterceptor = TransactionLoggingInterceptor_1 = class TransactionLoggingInterceptor {
    constructor() {
        this.logger = new sdk_nestjs_common_1.OriginLogger(TransactionLoggingInterceptor_1.name);
        this.transactionLogger = winston_1.default.createLogger({
            format: winston_1.default.format.json({
                replacer: (key, value) => {
                    if (key === '') {
                        return Object.assign(Object.assign({}, value.message), { level: value.level });
                    }
                    return value;
                },
            }),
            transports: [
                new winston_daily_rotate_file_1.default({
                    filename: 'application-%DATE%.log',
                    datePattern: 'YYYY-MM-DD-HH',
                    zippedArchive: true,
                    maxSize: '20m',
                    maxFiles: '14d',
                    createSymlink: true,
                    dirname: 'dist/logs',
                    symlinkName: 'application.log',
                }),
            ],
        });
    }
    intercept(context, next) {
        const contextType = context.getType();
        if (!["http", "https"].includes(contextType)) {
            return next.handle();
        }
        const apiFunction = context.getClass().name + '.' + context.getHandler().name;
        const request = context.getArgByIndex(0);
        const isCreateTransactionCall = context.getClass().name === transaction_controller_1.TransactionController.name && context.getHandler().name === 'createTransaction';
        const isSendTransactionCall = context.getClass().name === gateway_proxy_controller_1.GatewayProxyController.name && context.getHandler().name === 'transactionSend';
        if (isCreateTransactionCall || isSendTransactionCall) {
            const logBody = {
                apiFunction,
                body: request.body,
                userAgent: request.headers['user-agent'],
                clientIp: request.headers['x-forwarded-for'] || request.headers['x-real-ip'] || request.clientIp,
            };
            this.transactionLogger.info(logBody);
            this.logger.log(logBody);
        }
        return next
            .handle();
    }
};
TransactionLoggingInterceptor = TransactionLoggingInterceptor_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], TransactionLoggingInterceptor);
exports.TransactionLoggingInterceptor = TransactionLoggingInterceptor;
//# sourceMappingURL=transaction.logging.interceptor.js.map