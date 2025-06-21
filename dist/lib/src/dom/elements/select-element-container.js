import { ElementContainer } from '../element-container';
export class SelectElementContainer extends ElementContainer {
    value;
    constructor(context, element) {
        super(context, element);
        const option = element.options[element.selectedIndex || 0];
        this.value = option ? option.text || '' : '';
    }
}
//# sourceMappingURL=select-element-container.js.map