import { image, isSupportedImage } from '../types/image';
import { nonFunctionArgSeparator } from '../syntax/parser';
export const backgroundImage = {
    name: 'background-image',
    initialValue: 'none',
    type: 1 /* PropertyDescriptorParsingType.LIST */,
    prefix: false,
    parse: (context, tokens) => {
        if (tokens.length === 0) {
            return [];
        }
        const first = tokens[0];
        if (first.type === 20 /* TokenType.IDENT_TOKEN */ && first.value === 'none') {
            return [];
        }
        return tokens
            .filter((value) => nonFunctionArgSeparator(value) && isSupportedImage(value))
            .map((value) => image.parse(context, value));
    }
};
//# sourceMappingURL=background-image.js.map