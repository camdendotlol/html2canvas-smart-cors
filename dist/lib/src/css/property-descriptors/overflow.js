import { isIdentToken } from '../syntax/parser';
export const overflow = {
    name: 'overflow',
    initialValue: 'visible',
    prefix: false,
    type: 1 /* PropertyDescriptorParsingType.LIST */,
    parse: (_context, tokens) => {
        return tokens.filter(isIdentToken).map((overflow) => {
            switch (overflow.value) {
                case 'hidden':
                    return 1 /* OVERFLOW.HIDDEN */;
                case 'scroll':
                    return 2 /* OVERFLOW.SCROLL */;
                case 'clip':
                    return 3 /* OVERFLOW.CLIP */;
                case 'auto':
                    return 4 /* OVERFLOW.AUTO */;
                case 'visible':
                default:
                    return 0 /* OVERFLOW.VISIBLE */;
            }
        });
    }
};
//# sourceMappingURL=overflow.js.map