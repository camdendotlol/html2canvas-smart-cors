export const fontStyle = {
    name: 'font-style',
    initialValue: 'normal',
    prefix: false,
    type: 2 /* PropertyDescriptorParsingType.IDENT_VALUE */,
    parse: (_context, overflow) => {
        switch (overflow) {
            case 'oblique':
                return "oblique" /* FONT_STYLE.OBLIQUE */;
            case 'italic':
                return "italic" /* FONT_STYLE.ITALIC */;
            case 'normal':
            default:
                return "normal" /* FONT_STYLE.NORMAL */;
        }
    }
};
//# sourceMappingURL=font-style.js.map