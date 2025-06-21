const marginForSide = (side) => ({
    name: `margin-${side}`,
    initialValue: '0',
    prefix: false,
    type: 4 /* PropertyDescriptorParsingType.TOKEN_VALUE */
});
export const marginTop = marginForSide('top');
export const marginRight = marginForSide('right');
export const marginBottom = marginForSide('bottom');
export const marginLeft = marginForSide('left');
//# sourceMappingURL=margin.js.map