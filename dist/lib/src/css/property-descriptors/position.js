export const position = {
    name: 'position',
    initialValue: 'static',
    prefix: false,
    type: 2 /* PropertyDescriptorParsingType.IDENT_VALUE */,
    parse: (_context, position) => {
        switch (position) {
            case 'relative':
                return 1 /* POSITION.RELATIVE */;
            case 'absolute':
                return 2 /* POSITION.ABSOLUTE */;
            case 'fixed':
                return 3 /* POSITION.FIXED */;
            case 'sticky':
                return 4 /* POSITION.STICKY */;
        }
        return 0 /* POSITION.STATIC */;
    }
};
//# sourceMappingURL=position.js.map