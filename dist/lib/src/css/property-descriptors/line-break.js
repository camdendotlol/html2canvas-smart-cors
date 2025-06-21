export var LINE_BREAK;
(function (LINE_BREAK) {
    LINE_BREAK["NORMAL"] = "normal";
    LINE_BREAK["STRICT"] = "strict";
})(LINE_BREAK || (LINE_BREAK = {}));
export const lineBreak = {
    name: 'line-break',
    initialValue: 'normal',
    prefix: false,
    type: 2 /* PropertyDescriptorParsingType.IDENT_VALUE */,
    parse: (_context, lineBreak) => {
        switch (lineBreak) {
            case 'strict':
                return LINE_BREAK.STRICT;
            case 'normal':
            default:
                return LINE_BREAK.NORMAL;
        }
    }
};
//# sourceMappingURL=line-break.js.map