import { isLengthPercentage } from '../types/length-percentage';
import { FLAG_INTEGER } from '../syntax/tokenizer';
const DEFAULT_VALUE = {
    type: 16 /* TokenType.PERCENTAGE_TOKEN */,
    number: 50,
    flags: FLAG_INTEGER
};
const DEFAULT = [DEFAULT_VALUE, DEFAULT_VALUE];
export const transformOrigin = {
    name: 'transform-origin',
    initialValue: '50% 50%',
    prefix: true,
    type: 1 /* PropertyDescriptorParsingType.LIST */,
    parse: (_context, tokens) => {
        const origins = tokens.filter(isLengthPercentage);
        if (origins.length !== 2) {
            return DEFAULT;
        }
        return [origins[0], origins[1]];
    }
};
//# sourceMappingURL=transform-origin.js.map