import { parseTextBounds } from '../css/layout/text';
export class TextContainer {
    text;
    textBounds;
    constructor(context, node, styles) {
        this.text = transform(node.data, styles.textTransform);
        this.textBounds = parseTextBounds(context, this.text, styles, node);
    }
}
const transform = (text, transform) => {
    switch (transform) {
        case 1 /* TEXT_TRANSFORM.LOWERCASE */:
            return text.toLowerCase();
        case 3 /* TEXT_TRANSFORM.CAPITALIZE */:
            return text.replace(CAPITALIZE, capitalize);
        case 2 /* TEXT_TRANSFORM.UPPERCASE */:
            return text.toUpperCase();
        default:
            return text;
    }
};
const CAPITALIZE = /(^|\s|:|-|\(|\))([a-z])/g;
const capitalize = (m, p1, p2) => {
    if (m.length > 0) {
        return p1 + p2.toUpperCase();
    }
    return m;
};
//# sourceMappingURL=text-container.js.map