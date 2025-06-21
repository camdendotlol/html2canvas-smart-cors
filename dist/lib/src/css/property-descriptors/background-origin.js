import { isIdentToken } from '../syntax/parser';
export const backgroundOrigin = {
    name: 'background-origin',
    initialValue: 'border-box',
    prefix: false,
    type: 1 /* PropertyDescriptorParsingType.LIST */,
    parse: (_context, tokens) => {
        return tokens.map((token) => {
            if (isIdentToken(token)) {
                switch (token.value) {
                    case 'padding-box':
                        return 1 /* BACKGROUND_ORIGIN.PADDING_BOX */;
                    case 'content-box':
                        return 2 /* BACKGROUND_ORIGIN.CONTENT_BOX */;
                }
            }
            return 0 /* BACKGROUND_ORIGIN.BORDER_BOX */;
        });
    }
};
//# sourceMappingURL=background-origin.js.map