import { image } from '../types/image';
export const listStyleImage = {
    name: 'list-style-image',
    initialValue: 'none',
    type: 0 /* PropertyDescriptorParsingType.VALUE */,
    prefix: false,
    parse: (context, token) => {
        if (token.type === 20 /* TokenType.IDENT_TOKEN */ && token.value === 'none') {
            return null;
        }
        return image.parse(context, token);
    }
};
//# sourceMappingURL=list-style-image.js.map