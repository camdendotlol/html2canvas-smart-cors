import { ElementContainer } from '../element-container';
export class LIElementContainer extends ElementContainer {
    value;
    constructor(context, element) {
        super(context, element);
        this.value = element.value;
    }
}
//# sourceMappingURL=li-element-container.js.map