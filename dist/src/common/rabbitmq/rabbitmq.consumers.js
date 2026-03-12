"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompetingRabbitConsumer = void 0;
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const common_1 = require("@nestjs/common");
const CompetingRabbitConsumer = (config) => {
    return (0, common_1.applyDecorators)((0, nestjs_rabbitmq_1.RabbitSubscribe)({
        queue: config.queueName,
        exchange: config.exchange,
        routingKey: '',
        queueOptions: {
            autoDelete: false,
            durable: true,
            arguments: {
                'x-queue-type': 'classic',
                'x-queue-mode': 'lazy',
                'x-single-active-consumer': true,
            },
            deadLetterExchange: config.deadLetterExchange,
        },
    }));
};
exports.CompetingRabbitConsumer = CompetingRabbitConsumer;
//# sourceMappingURL=rabbitmq.consumers.js.map