export const time = {
    name: 'time',
    parse: (_context, value) => {
        if (value.type === 15 /* TokenType.DIMENSION_TOKEN */) {
            switch (value.unit.toLowerCase()) {
                case 's':
                    return 1000 * value.number;
                case 'ms':
                    return value.number;
            }
        }
        throw new Error(`Unsupported time type`);
    }
};
//# sourceMappingURL=time.js.map