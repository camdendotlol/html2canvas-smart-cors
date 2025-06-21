import { ElementContainer } from './element-container';
import { LIElementContainer } from './elements/li-element-container';
import { OLElementContainer } from './elements/ol-element-container';
import { SelectElementContainer } from './elements/select-element-container';
import { TextareaElementContainer } from './elements/textarea-element-container';
import { CanvasElementContainer } from './replaced-elements/canvas-element-container';
import { IFrameElementContainer } from './replaced-elements/iframe-element-container';
import { ImageElementContainer } from './replaced-elements/image-element-container';
import { InputElementContainer } from './replaced-elements/input-element-container';
import { SVGElementContainer } from './replaced-elements/svg-element-container';
import { TextContainer } from './text-container';
const LIST_OWNERS = ['OL', 'UL', 'MENU'];
const parseNodeTree = (context, node, parent, root) => {
    for (let childNode = node.firstChild, nextNode; childNode; childNode = nextNode) {
        nextNode = childNode.nextSibling;
        // Fixes #2238 #1624 - Fix the issue of TextNode content being overlooked in rendering due to being perceived as blank by trim().
        if (isTextNode(childNode) && childNode.data.length > 0) {
            // The U tag marks text with a special underline treatment, and it's not possible to get the underline style from the browser's computed style.
            const parentStep = 3;
            let hasUnderline;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            let pNode = childNode;
            for (let i = 0; i < parentStep; i++) {
                if (!pNode) {
                    break;
                }
                if (pNode.parentElement?.tagName === 'U') {
                    hasUnderline = true;
                    break;
                }
                pNode = pNode.parentElement;
            }
            const line = parent.styles.textDecorationLine;
            if (hasUnderline && line) {
                for (let j = 0; j < line.length; j++) {
                    line[j] = 1;
                }
            }
            parent.textNodes.push(new TextContainer(context, childNode, parent.styles));
        }
        else if (isElementNode(childNode)) {
            if (isSlotElement(childNode) && childNode.assignedNodes) {
                childNode.assignedNodes().forEach((childNode) => parseNodeTree(context, childNode, parent, root));
            }
            else {
                const container = createContainer(context, childNode);
                if (container.styles.isVisible()) {
                    if (createsRealStackingContext(childNode, container, root)) {
                        container.flags |= 4 /* FLAGS.CREATES_REAL_STACKING_CONTEXT */;
                    }
                    else if (createsStackingContext(container.styles)) {
                        container.flags |= 2 /* FLAGS.CREATES_STACKING_CONTEXT */;
                    }
                    if (LIST_OWNERS.indexOf(childNode.tagName) !== -1) {
                        container.flags |= 8 /* FLAGS.IS_LIST_OWNER */;
                    }
                    parent.elements.push(container);
                    childNode.slot;
                    if (childNode.shadowRoot) {
                        parseNodeTree(context, childNode.shadowRoot, container, root);
                    }
                    else if (!isTextareaElement(childNode) &&
                        !isSVGElement(childNode) &&
                        !isSelectElement(childNode)) {
                        parseNodeTree(context, childNode, container, root);
                    }
                }
            }
        }
    }
};
const createContainer = (context, element) => {
    if (isImageElement(element)) {
        return new ImageElementContainer(context, element);
    }
    if (isCanvasElement(element)) {
        return new CanvasElementContainer(context, element);
    }
    if (isSVGElement(element)) {
        return new SVGElementContainer(context, element);
    }
    if (isLIElement(element)) {
        return new LIElementContainer(context, element);
    }
    if (isOLElement(element)) {
        return new OLElementContainer(context, element);
    }
    if (isInputElement(element)) {
        return new InputElementContainer(context, element);
    }
    if (isSelectElement(element)) {
        return new SelectElementContainer(context, element);
    }
    if (isTextareaElement(element)) {
        return new TextareaElementContainer(context, element);
    }
    if (isIFrameElement(element)) {
        return new IFrameElementContainer(context, element);
    }
    return new ElementContainer(context, element);
};
export const parseTree = (context, element) => {
    const container = createContainer(context, element);
    container.flags |= 4 /* FLAGS.CREATES_REAL_STACKING_CONTEXT */;
    parseNodeTree(context, element, container, container);
    return container;
};
const createsRealStackingContext = (node, container, root) => {
    return (container.styles.isPositionedWithZIndex() ||
        container.styles.opacity < 1 ||
        container.styles.isTransformed() ||
        (isBodyElement(node) && root.styles.isTransparent()));
};
const createsStackingContext = (styles) => styles.isPositioned() || styles.isFloating();
export const isTextNode = (node) => node.nodeType === Node.TEXT_NODE;
export const isElementNode = (node) => node.nodeType === Node.ELEMENT_NODE;
export const isHTMLElementNode = (node) => isElementNode(node) && typeof node.style !== 'undefined' && !isSVGElementNode(node);
export const isSVGElementNode = (element) => typeof element.className === 'object';
export const isLIElement = (node) => node.tagName === 'LI';
export const isOLElement = (node) => node.tagName === 'OL';
export const isInputElement = (node) => node.tagName === 'INPUT';
export const isHTMLElement = (node) => node.tagName === 'HTML';
export const isSVGElement = (node) => node.tagName === 'svg';
export const isSVGForeignObjectElement = (node) => node.tagName === 'foreignObject';
export const isBodyElement = (node) => node.tagName === 'BODY';
export const isCanvasElement = (node) => node.tagName === 'CANVAS';
export const isVideoElement = (node) => node.tagName === 'VIDEO';
export const isImageElement = (node) => node.tagName === 'IMG';
export const isIFrameElement = (node) => node.tagName === 'IFRAME';
export const isStyleElement = (node) => node.tagName === 'STYLE';
export const isScriptElement = (node) => node.tagName === 'SCRIPT';
export const isTextareaElement = (node) => node.tagName === 'TEXTAREA';
export const isSelectElement = (node) => node.tagName === 'SELECT';
export const isSlotElement = (node) => node.tagName === 'SLOT';
// https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name
export const isCustomElement = (node) => node.tagName.indexOf('-') > 0;
//# sourceMappingURL=node-parser.js.map