const borderColorForSide = (side) => ({
    name: `border-${side}-color`,
    initialValue: 'transparent',
    prefix: false,
    type: 3 /* PropertyDescriptorParsingType.TYPE_VALUE */,
    format: 'color'
});
export const borderTopColor = borderColorForSide('top');
export const borderRightColor = borderColorForSide('right');
export const borderBottomColor = borderColorForSide('bottom');
export const borderLeftColor = borderColorForSide('left');
//# sourceMappingURL=border-color.js.map