import { isNumberToken } from '../syntax/parser';
export const opacity = {
    name: 'opacity',
    initialValue: '1',
    type: 0 /* PropertyDescriptorParsingType.VALUE */,
    prefix: false,
    parse: (_context, token) => {
        if (isNumberToken(token)) {
            return token.number;
        }
        return 1;
    }
};
//# sourceMappingURL=opacity.js.map