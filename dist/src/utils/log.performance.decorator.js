"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogPerformanceAsync = void 0;
const sdk_nestjs_monitoring_1 = require("@sravankumar02/sdk-nestjs-monitoring");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const log_metrics_event_1 = require("../common/entities/log.metrics.event");
const extractDecoratorArgs = (descriptorValue, decoratorArgs, decoratedMethodArgs) => {
    if (!decoratorArgs || decoratorArgs.length === 0) {
        return [descriptorValue.name];
    }
    return decoratorArgs.map(arg => {
        if (typeof arg === 'string') {
            return arg;
        }
        return decoratedMethodArgs[arg.argIndex];
    });
};
function LogPerformanceAsync(method, ...decoratorArgs) {
    const eventEmitter = (0, common_1.Inject)(event_emitter_1.EventEmitter2);
    return (target, _key, descriptor) => {
        eventEmitter(target, 'eventEmitter');
        const childMethod = descriptor.value;
        descriptor.value = async function (...args) {
            const eventEmitter = this.eventEmitter;
            const profiler = new sdk_nestjs_monitoring_1.PerformanceProfiler();
            try {
                return await childMethod.apply(this, args);
            }
            finally {
                profiler.stop();
                const metricsEvent = new log_metrics_event_1.LogMetricsEvent();
                metricsEvent.args = extractDecoratorArgs(childMethod, decoratorArgs, args);
                metricsEvent.args.push(profiler.duration);
                eventEmitter.emit(method, metricsEvent);
            }
        };
        return descriptor;
    };
}
exports.LogPerformanceAsync = LogPerformanceAsync;
//# sourceMappingURL=log.performance.decorator.js.map