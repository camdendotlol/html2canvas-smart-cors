import { ElementContainer } from '../element-container';
export class OLElementContainer extends ElementContainer {
    start;
    reversed;
    constructor(context, element) {
        super(context, element);
        this.start = element.start;
        this.reversed = typeof element.reversed === 'boolean' && element.reversed === true;
    }
}
//# sourceMappingURL=ol-element-container.js.map