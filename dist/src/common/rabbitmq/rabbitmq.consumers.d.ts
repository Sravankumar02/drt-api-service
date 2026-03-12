export declare const CompetingRabbitConsumer: (config: {
    queueName: string;
    exchange: string;
    deadLetterExchange?: string;
}) => <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol | undefined, descriptor?: TypedPropertyDescriptor<Y> | undefined) => void;
