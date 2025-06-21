import { Logger } from './logger';
import { Cache } from './cache-storage';
export class Context {
    windowBounds;
    static instanceCount = 1;
    instanceName = `#${Context.instanceCount++}`;
    logger;
    cache;
    constructor(options, windowBounds) {
        this.windowBounds = windowBounds;
        this.logger = new Logger({ id: this.instanceName, enabled: options.logging });
        this.cache = options.cache ?? new Cache(this, options);
    }
}
//# sourceMappingURL=context.js.map