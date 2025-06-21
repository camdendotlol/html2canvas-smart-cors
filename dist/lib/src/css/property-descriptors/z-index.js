import { isNumberToken } from '../syntax/parser';
export const zIndex = {
    name: 'z-index',
    initialValue: 'auto',
    prefix: false,
    type: 0 /* PropertyDescriptorParsingType.VALUE */,
    parse: (_context, token) => {
        if (token.type === 20 /* TokenType.IDENT_TOKEN */) {
            return { auto: true, order: 0 };
        }
        if (isNumberToken(token)) {
            return { auto: false, order: token.number };
        }
        throw new Error(`Invalid z-index number parsed`);
    }
};
//# sourceMappingURL=z-index.js.map