import { ElementContainer } from '../element-container';
export class TextareaElementContainer extends ElementContainer {
    value;
    constructor(context, element) {
        super(context, element);
        this.value = element.value;
    }
}
//# sourceMappingURL=textarea-element-container.js.map