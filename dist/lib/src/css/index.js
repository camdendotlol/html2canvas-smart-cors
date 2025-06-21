import { contains } from '../core/bitwise';
import { backgroundClip } from './property-descriptors/background-clip';
import { backgroundColor } from './property-descriptors/background-color';
import { backgroundImage } from './property-descriptors/background-image';
import { backgroundOrigin } from './property-descriptors/background-origin';
import { backgroundPosition } from './property-descriptors/background-position';
import { backgroundRepeat } from './property-descriptors/background-repeat';
import { backgroundSize } from './property-descriptors/background-size';
import { borderBottomColor, borderLeftColor, borderRightColor, borderTopColor } from './property-descriptors/border-color';
import { borderBottomLeftRadius, borderBottomRightRadius, borderTopLeftRadius, borderTopRightRadius } from './property-descriptors/border-radius';
import { borderBottomStyle, borderLeftStyle, borderRightStyle, borderTopStyle } from './property-descriptors/border-style';
import { borderBottomWidth, borderLeftWidth, borderRightWidth, borderTopWidth } from './property-descriptors/border-width';
import { boxShadow } from './property-descriptors/box-shadow';
import { color } from './property-descriptors/color';
import { content } from './property-descriptors/content';
import { counterIncrement } from './property-descriptors/counter-increment';
import { counterReset } from './property-descriptors/counter-reset';
import { direction } from './property-descriptors/direction';
import { display } from './property-descriptors/display';
import { duration } from './property-descriptors/duration';
import { float } from './property-descriptors/float';
import { fontFamily } from './property-descriptors/font-family';
import { fontSize } from './property-descriptors/font-size';
import { fontStyle } from './property-descriptors/font-style';
import { fontVariant } from './property-descriptors/font-variant';
import { fontWeight } from './property-descriptors/font-weight';
import { letterSpacing } from './property-descriptors/letter-spacing';
import { lineBreak } from './property-descriptors/line-break';
import { lineHeight } from './property-descriptors/line-height';
import { listStyleImage } from './property-descriptors/list-style-image';
import { listStylePosition } from './property-descriptors/list-style-position';
import { listStyleType } from './property-descriptors/list-style-type';
import { marginBottom, marginLeft, marginRight, marginTop } from './property-descriptors/margin';
import { objectFit } from './property-descriptors/object-fit';
import { opacity } from './property-descriptors/opacity';
import { overflow } from './property-descriptors/overflow';
import { overflowWrap } from './property-descriptors/overflow-wrap';
import { paddingBottom, paddingLeft, paddingRight, paddingTop } from './property-descriptors/padding';
import { paintOrder } from './property-descriptors/paint-order';
import { position } from './property-descriptors/position';
import { quotes } from './property-descriptors/quotes';
import { textAlign } from './property-descriptors/text-align';
import { textDecorationColor } from './property-descriptors/text-decoration-color';
import { textDecorationLine } from './property-descriptors/text-decoration-line';
import { textShadow } from './property-descriptors/text-shadow';
import { textTransform } from './property-descriptors/text-transform';
import { transform } from './property-descriptors/transform';
import { transformOrigin } from './property-descriptors/transform-origin';
import { visibility } from './property-descriptors/visibility';
import { webkitTextStrokeColor } from './property-descriptors/webkit-text-stroke-color';
import { webkitTextStrokeWidth } from './property-descriptors/webkit-text-stroke-width';
import { wordBreak } from './property-descriptors/word-break';
import { zIndex } from './property-descriptors/z-index';
import { Parser, isIdentToken } from './syntax/parser';
import { Tokenizer } from './syntax/tokenizer';
import { angle } from './types/angle';
import { color as colorType, isTransparent } from './types/color';
import { image } from './types/image';
import { isLength } from './types/length';
import { ZERO_LENGTH, isLengthPercentage } from './types/length-percentage';
import { time } from './types/time';
export class CSSParsedDeclaration {
    animationDuration;
    backgroundClip;
    backgroundColor;
    backgroundImage;
    backgroundOrigin;
    backgroundPosition;
    backgroundRepeat;
    backgroundSize;
    borderTopColor;
    borderRightColor;
    borderBottomColor;
    borderLeftColor;
    borderTopLeftRadius;
    borderTopRightRadius;
    borderBottomRightRadius;
    borderBottomLeftRadius;
    borderTopStyle;
    borderRightStyle;
    borderBottomStyle;
    borderLeftStyle;
    borderTopWidth;
    borderRightWidth;
    borderBottomWidth;
    borderLeftWidth;
    boxShadow;
    color;
    direction;
    display;
    float;
    fontFamily;
    fontSize;
    fontStyle;
    fontVariant;
    fontWeight;
    letterSpacing;
    lineBreak;
    lineHeight;
    listStyleImage;
    listStylePosition;
    listStyleType;
    marginTop;
    marginRight;
    marginBottom;
    marginLeft;
    objectFit;
    opacity;
    overflowX;
    overflowY;
    overflowWrap;
    paddingTop;
    paddingRight;
    paddingBottom;
    paddingLeft;
    paintOrder;
    position;
    textAlign;
    textDecorationColor;
    textDecorationLine;
    textShadow;
    textTransform;
    transform;
    transformOrigin;
    visibility;
    webkitTextStrokeColor;
    webkitTextStrokeWidth;
    wordBreak;
    zIndex;
    constructor(context, declaration) {
        this.animationDuration = parse(context, duration, declaration.animationDuration);
        this.backgroundClip = parse(context, backgroundClip, declaration.backgroundClip);
        this.backgroundColor = parse(context, backgroundColor, declaration.backgroundColor);
        this.backgroundImage = parse(context, backgroundImage, declaration.backgroundImage);
        this.backgroundOrigin = parse(context, backgroundOrigin, declaration.backgroundOrigin);
        this.backgroundPosition = parse(context, backgroundPosition, declaration.backgroundPosition);
        this.backgroundRepeat = parse(context, backgroundRepeat, declaration.backgroundRepeat);
        this.backgroundSize = parse(context, backgroundSize, declaration.backgroundSize);
        this.borderTopColor = parse(context, borderTopColor, declaration.borderTopColor);
        this.borderRightColor = parse(context, borderRightColor, declaration.borderRightColor);
        this.borderBottomColor = parse(context, borderBottomColor, declaration.borderBottomColor);
        this.borderLeftColor = parse(context, borderLeftColor, declaration.borderLeftColor);
        this.borderTopLeftRadius = parse(context, borderTopLeftRadius, declaration.borderTopLeftRadius);
        this.borderTopRightRadius = parse(context, borderTopRightRadius, declaration.borderTopRightRadius);
        this.borderBottomRightRadius = parse(context, borderBottomRightRadius, declaration.borderBottomRightRadius);
        this.borderBottomLeftRadius = parse(context, borderBottomLeftRadius, declaration.borderBottomLeftRadius);
        this.borderTopStyle = parse(context, borderTopStyle, declaration.borderTopStyle);
        this.borderRightStyle = parse(context, borderRightStyle, declaration.borderRightStyle);
        this.borderBottomStyle = parse(context, borderBottomStyle, declaration.borderBottomStyle);
        this.borderLeftStyle = parse(context, borderLeftStyle, declaration.borderLeftStyle);
        this.borderTopWidth = parse(context, borderTopWidth, declaration.borderTopWidth);
        this.borderRightWidth = parse(context, borderRightWidth, declaration.borderRightWidth);
        this.borderBottomWidth = parse(context, borderBottomWidth, declaration.borderBottomWidth);
        this.borderLeftWidth = parse(context, borderLeftWidth, declaration.borderLeftWidth);
        this.boxShadow = parse(context, boxShadow, declaration.boxShadow);
        this.color = parse(context, color, declaration.color);
        this.direction = parse(context, direction, declaration.direction);
        this.display = parse(context, display, declaration.display);
        this.float = parse(context, float, declaration.cssFloat);
        this.fontFamily = parse(context, fontFamily, declaration.fontFamily);
        this.fontSize = parse(context, fontSize, declaration.fontSize);
        this.fontStyle = parse(context, fontStyle, declaration.fontStyle);
        this.fontVariant = parse(context, fontVariant, declaration.fontVariant);
        this.fontWeight = parse(context, fontWeight, declaration.fontWeight);
        this.letterSpacing = parse(context, letterSpacing, declaration.letterSpacing);
        this.lineBreak = parse(context, lineBreak, declaration.lineBreak);
        this.lineHeight = parse(context, lineHeight, declaration.lineHeight);
        this.listStyleImage = parse(context, listStyleImage, declaration.listStyleImage);
        this.listStylePosition = parse(context, listStylePosition, declaration.listStylePosition);
        this.listStyleType = parse(context, listStyleType, declaration.listStyleType);
        this.marginTop = parse(context, marginTop, declaration.marginTop);
        this.marginRight = parse(context, marginRight, declaration.marginRight);
        this.marginBottom = parse(context, marginBottom, declaration.marginBottom);
        this.marginLeft = parse(context, marginLeft, declaration.marginLeft);
        this.objectFit = parse(context, objectFit, declaration.objectFit);
        this.opacity = parse(context, opacity, declaration.opacity);
        const overflowTuple = parse(context, overflow, declaration.overflow);
        this.overflowX = overflowTuple[0];
        this.overflowY = overflowTuple[overflowTuple.length > 1 ? 1 : 0];
        this.overflowWrap = parse(context, overflowWrap, declaration.overflowWrap);
        this.paddingTop = parse(context, paddingTop, declaration.paddingTop);
        this.paddingRight = parse(context, paddingRight, declaration.paddingRight);
        this.paddingBottom = parse(context, paddingBottom, declaration.paddingBottom);
        this.paddingLeft = parse(context, paddingLeft, declaration.paddingLeft);
        this.paintOrder = parse(context, paintOrder, declaration.paintOrder);
        this.position = parse(context, position, declaration.position);
        this.textAlign = parse(context, textAlign, declaration.textAlign);
        this.textDecorationColor = parse(context, textDecorationColor, declaration.textDecorationColor ?? declaration.color);
        this.textDecorationLine = parse(context, textDecorationLine, declaration.textDecorationLine ?? declaration.textDecoration);
        this.textShadow = parse(context, textShadow, declaration.textShadow);
        this.textTransform = parse(context, textTransform, declaration.textTransform);
        this.transform = parse(context, transform, declaration.transform);
        this.transformOrigin = parse(context, transformOrigin, declaration.transformOrigin);
        this.visibility = parse(context, visibility, declaration.visibility);
        this.webkitTextStrokeColor = parse(context, webkitTextStrokeColor, declaration.webkitTextStrokeColor);
        this.webkitTextStrokeWidth = parse(context, webkitTextStrokeWidth, declaration.webkitTextStrokeWidth);
        this.wordBreak = parse(context, wordBreak, declaration.wordBreak);
        this.zIndex = parse(context, zIndex, declaration.zIndex);
        this.objectFit = parse(context, objectFit, declaration.objectFit);
    }
    isVisible() {
        return this.display > 0 && this.opacity > 0 && this.visibility === 0 /* VISIBILITY.VISIBLE */;
    }
    isTransparent() {
        return isTransparent(this.backgroundColor);
    }
    isTransformed() {
        return this.transform !== null;
    }
    isPositioned() {
        return this.position !== 0 /* POSITION.STATIC */;
    }
    isPositionedWithZIndex() {
        return this.isPositioned() && !this.zIndex.auto;
    }
    isFloating() {
        return this.float !== 0 /* FLOAT.NONE */;
    }
    isInlineLevel() {
        return (contains(this.display, 4 /* DISPLAY.INLINE */) ||
            contains(this.display, 33554432 /* DISPLAY.INLINE_BLOCK */) ||
            contains(this.display, 268435456 /* DISPLAY.INLINE_FLEX */) ||
            contains(this.display, 536870912 /* DISPLAY.INLINE_GRID */) ||
            contains(this.display, 67108864 /* DISPLAY.INLINE_LIST_ITEM */) ||
            contains(this.display, 134217728 /* DISPLAY.INLINE_TABLE */));
    }
}
export class CSSParsedPseudoDeclaration {
    content;
    quotes;
    constructor(context, declaration) {
        this.content = parse(context, content, declaration.content);
        this.quotes = parse(context, quotes, declaration.quotes);
    }
}
export class CSSParsedCounterDeclaration {
    counterIncrement;
    counterReset;
    constructor(context, declaration) {
        this.counterIncrement = parse(context, counterIncrement, declaration.counterIncrement);
        this.counterReset = parse(context, counterReset, declaration.counterReset);
    }
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parse = (context, descriptor, style) => {
    const tokenizer = new Tokenizer();
    const value = style !== null && typeof style !== 'undefined' ? style.toString() : descriptor.initialValue;
    tokenizer.write(value);
    const parser = new Parser(tokenizer.read());
    switch (descriptor.type) {
        case 2 /* PropertyDescriptorParsingType.IDENT_VALUE */:
            const token = parser.parseComponentValue();
            return descriptor.parse(context, isIdentToken(token) ? token.value : descriptor.initialValue);
        case 0 /* PropertyDescriptorParsingType.VALUE */:
            return descriptor.parse(context, parser.parseComponentValue());
        case 1 /* PropertyDescriptorParsingType.LIST */:
            return descriptor.parse(context, parser.parseComponentValues());
        case 4 /* PropertyDescriptorParsingType.TOKEN_VALUE */:
            return parser.parseComponentValue();
        case 3 /* PropertyDescriptorParsingType.TYPE_VALUE */:
            switch (descriptor.format) {
                case 'angle':
                    return angle.parse(context, parser.parseComponentValue());
                case 'color':
                    return colorType.parse(context, parser.parseComponentValue());
                case 'image':
                    return image.parse(context, parser.parseComponentValue());
                case 'length':
                    const length = parser.parseComponentValue();
                    return isLength(length) ? length : ZERO_LENGTH;
                case 'length-percentage':
                    const value = parser.parseComponentValue();
                    return isLengthPercentage(value) ? value : ZERO_LENGTH;
                case 'time':
                    return time.parse(context, parser.parseComponentValue());
            }
    }
};
//# sourceMappingURL=index.js.map