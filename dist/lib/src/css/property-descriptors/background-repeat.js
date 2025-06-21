import { isIdentToken, parseFunctionArgs } from '../syntax/parser';
export const backgroundRepeat = {
    name: 'background-repeat',
    initialValue: 'repeat',
    prefix: false,
    type: 1 /* PropertyDescriptorParsingType.LIST */,
    parse: (_context, tokens) => {
        return parseFunctionArgs(tokens)
            .map((values) => values
            .filter(isIdentToken)
            .map((token) => token.value)
            .join(' '))
            .map(parseBackgroundRepeat);
    }
};
const parseBackgroundRepeat = (value) => {
    switch (value) {
        case 'no-repeat':
            return 1 /* BACKGROUND_REPEAT.NO_REPEAT */;
        case 'repeat-x':
        case 'repeat no-repeat':
            return 2 /* BACKGROUND_REPEAT.REPEAT_X */;
        case 'repeat-y':
        case 'no-repeat repeat':
            return 3 /* BACKGROUND_REPEAT.REPEAT_Y */;
        case 'repeat':
        default:
            return 0 /* BACKGROUND_REPEAT.REPEAT */;
    }
};
//# sourceMappingURL=background-repeat.js.map