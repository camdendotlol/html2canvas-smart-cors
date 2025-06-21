import { isDimensionToken } from '../syntax/parser';
const borderWidthForSide = (side) => ({
    name: `border-${side}-width`,
    initialValue: '0',
    type: 0 /* PropertyDescriptorParsingType.VALUE */,
    prefix: false,
    parse: (_context, token) => {
        if (isDimensionToken(token)) {
            return token.number;
        }
        return 0;
    }
});
export const borderTopWidth = borderWidthForSide('top');
export const borderRightWidth = borderWidthForSide('right');
export const borderBottomWidth = borderWidthForSide('bottom');
export const borderLeftWidth = borderWidthForSide('left');
//# sourceMappingURL=border-width.js.map