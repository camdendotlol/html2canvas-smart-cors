import { ElementContainer } from '../element-container';
import { Bounds } from '../../css/layout/bounds';
const CHECKBOX_BORDER_RADIUS = [
    {
        type: 15 /* TokenType.DIMENSION_TOKEN */,
        flags: 0,
        unit: 'px',
        number: 3
    }
];
const RADIO_BORDER_RADIUS = [
    {
        type: 16 /* TokenType.PERCENTAGE_TOKEN */,
        flags: 0,
        number: 50
    }
];
const reformatInputBounds = (bounds) => {
    if (bounds.width > bounds.height) {
        return new Bounds(bounds.left + (bounds.width - bounds.height) / 2, bounds.top, bounds.height, bounds.height);
    }
    else if (bounds.width < bounds.height) {
        return new Bounds(bounds.left, bounds.top + (bounds.height - bounds.width) / 2, bounds.width, bounds.width);
    }
    return bounds;
};
const getInputValue = (node) => {
    const value = node.type === PASSWORD ? new Array(node.value.length + 1).join('\u2022') : node.value;
    return value.length === 0 ? node.placeholder || '' : value;
};
export const CHECKBOX = 'checkbox';
export const RADIO = 'radio';
export const PASSWORD = 'password';
export const INPUT_COLOR = 0x2a2a2aff;
export class InputElementContainer extends ElementContainer {
    type;
    checked;
    value;
    constructor(context, input) {
        super(context, input);
        this.type = input.type.toLowerCase();
        this.checked = input.checked;
        this.value = getInputValue(input);
        if (this.type === CHECKBOX || this.type === RADIO) {
            this.styles.backgroundColor = 0xdededeff;
            this.styles.borderTopColor =
                this.styles.borderRightColor =
                    this.styles.borderBottomColor =
                        this.styles.borderLeftColor =
                            0xa5a5a5ff;
            this.styles.borderTopWidth =
                this.styles.borderRightWidth =
                    this.styles.borderBottomWidth =
                        this.styles.borderLeftWidth =
                            1;
            this.styles.borderTopStyle =
                this.styles.borderRightStyle =
                    this.styles.borderBottomStyle =
                        this.styles.borderLeftStyle =
                            1 /* BORDER_STYLE.SOLID */;
            this.styles.backgroundClip = [0 /* BACKGROUND_CLIP.BORDER_BOX */];
            this.styles.backgroundOrigin = [0 /* BACKGROUND_ORIGIN.BORDER_BOX */];
            this.bounds = reformatInputBounds(this.bounds);
        }
        switch (this.type) {
            case CHECKBOX:
                this.styles.borderTopRightRadius =
                    this.styles.borderTopLeftRadius =
                        this.styles.borderBottomRightRadius =
                            this.styles.borderBottomLeftRadius =
                                CHECKBOX_BORDER_RADIUS;
                break;
            case RADIO:
                this.styles.borderTopRightRadius =
                    this.styles.borderTopLeftRadius =
                        this.styles.borderBottomRightRadius =
                            this.styles.borderBottomLeftRadius =
                                RADIO_BORDER_RADIUS;
                break;
        }
    }
}
//# sourceMappingURL=input-element-container.js.map