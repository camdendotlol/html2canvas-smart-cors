const elementDebuggerAttribute = 'data-html2canvas-debug';
const getElementDebugType = (element) => {
    const attribute = element.getAttribute(elementDebuggerAttribute);
    switch (attribute) {
        case 'all':
            return 1 /* DebuggerType.ALL */;
        case 'clone':
            return 2 /* DebuggerType.CLONE */;
        case 'parse':
            return 3 /* DebuggerType.PARSE */;
        case 'render':
            return 4 /* DebuggerType.RENDER */;
        default:
            return 0 /* DebuggerType.NONE */;
    }
};
export const isDebugging = (element, type) => {
    const elementType = getElementDebugType(element);
    return elementType === 1 /* DebuggerType.ALL */ || type === elementType;
};
//# sourceMappingURL=debugger.js.map