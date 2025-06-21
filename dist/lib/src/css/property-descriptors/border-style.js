const borderStyleForSide = (side) => ({
    name: `border-${side}-style`,
    initialValue: 'solid',
    prefix: false,
    type: 2 /* PropertyDescriptorParsingType.IDENT_VALUE */,
    parse: (_context, style) => {
        switch (style) {
            case 'none':
                return 0 /* BORDER_STYLE.NONE */;
            case 'dashed':
                return 2 /* BORDER_STYLE.DASHED */;
            case 'dotted':
                return 3 /* BORDER_STYLE.DOTTED */;
            case 'double':
                return 4 /* BORDER_STYLE.DOUBLE */;
        }
        return 1 /* BORDER_STYLE.SOLID */;
    }
});
export const borderTopStyle = borderStyleForSide('top');
export const borderRightStyle = borderStyleForSide('right');
export const borderBottomStyle = borderStyleForSide('bottom');
export const borderLeftStyle = borderStyleForSide('left');
//# sourceMappingURL=border-style.js.map