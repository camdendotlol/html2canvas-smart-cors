import { CSSParsedDeclaration } from '../css/index';
import { parseBounds } from '../css/layout/bounds';
import { isHTMLElementNode } from './node-parser';
import { isDebugging } from '../core/debugger';
export class ElementContainer {
    context;
    styles;
    textNodes = [];
    elements = [];
    bounds;
    flags = 0;
    constructor(context, element) {
        this.context = context;
        if (isDebugging(element, 3 /* DebuggerType.PARSE */)) {
            debugger;
        }
        this.styles = new CSSParsedDeclaration(context, window.getComputedStyle(element, null));
        if (isHTMLElementNode(element)) {
            if (this.styles.animationDuration.some((duration) => duration > 0)) {
                element.style.animationDuration = '0s';
            }
            if (this.styles.transform !== null) {
                // getBoundingClientRect takes transforms into account
                element.style.transform = 'none';
            }
        }
        this.bounds = parseBounds(this.context, element);
        if (isDebugging(element, 4 /* DebuggerType.RENDER */)) {
            this.flags |= 16 /* FLAGS.DEBUG_RENDER */;
        }
    }
}
//# sourceMappingURL=element-container.js.map