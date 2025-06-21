import { isLengthPercentage, parseLengthPercentageTuple } from '../types/length-percentage';
const borderRadiusForSide = (side) => ({
    name: `border-radius-${side}`,
    initialValue: '0 0',
    prefix: false,
    type: 1 /* PropertyDescriptorParsingType.LIST */,
    parse: (_context, tokens) => parseLengthPercentageTuple(tokens.filter(isLengthPercentage))
});
export const borderTopLeftRadius = borderRadiusForSide('top-left');
export const borderTopRightRadius = borderRadiusForSide('top-right');
export const borderBottomRightRadius = borderRadiusForSide('bottom-right');
export const borderBottomLeftRadius = borderRadiusForSide('bottom-left');
//# sourceMappingURL=border-radius.js.map