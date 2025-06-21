export class Logger {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    debug() { }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    static create() { }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    static destroy() { }
    static getInstance() {
        return logger;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    info() { }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    error() { }
}
export const logger = new Logger();
//# sourceMappingURL=logger.js.map