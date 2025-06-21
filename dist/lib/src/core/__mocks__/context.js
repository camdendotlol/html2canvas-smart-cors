import { logger } from './logger';
export class Context {
    logger = logger;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _cache = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    cache;
    constructor() {
        this.cache = {
            addImage: jest.fn().mockImplementation((src) => {
                this._cache[src] = Promise.resolve();
                return true;
            })
        };
    }
}
//# sourceMappingURL=context.js.map