import { isIdentToken } from '../syntax/parser';
export const fontVariant = {
    name: 'font-variant',
    initialValue: 'none',
    type: 1 /* PropertyDescriptorParsingType.LIST */,
    prefix: false,
    parse: (_context, tokens) => {
        return tokens.filter(isIdentToken).map((token) => token.value);
    }
};
//# sourceMappingURL=font-variant.js.map