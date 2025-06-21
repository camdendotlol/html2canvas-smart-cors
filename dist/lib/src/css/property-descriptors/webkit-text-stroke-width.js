import { isDimensionToken } from '../syntax/parser';
export const webkitTextStrokeWidth = {
    name: `-webkit-text-stroke-width`,
    initialValue: '0',
    type: 0 /* PropertyDescriptorParsingType.VALUE */,
    prefix: false,
    parse: (_context, token) => {
        if (isDimensionToken(token)) {
            return token.number;
        }
        return 0;
    }
};
//# sourceMappingURL=webkit-text-stroke-width.js.map