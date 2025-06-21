import { isIdentToken, parseFunctionArgs } from '../../syntax/parser';
import { parseColorStop } from './gradient';
import { FIFTY_PERCENT, HUNDRED_PERCENT, isLengthPercentage, ZERO_LENGTH } from '../length-percentage';
import { isLength } from '../length';
import { CIRCLE, CLOSEST_CORNER, CLOSEST_SIDE, CONTAIN, COVER, ELLIPSE, FARTHEST_CORNER, FARTHEST_SIDE } from './radial-gradient';
export const prefixRadialGradient = (context, tokens) => {
    let shape = 0 /* CSSRadialShape.CIRCLE */;
    let size = 3 /* CSSRadialExtent.FARTHEST_CORNER */;
    const stops = [];
    const position = [];
    parseFunctionArgs(tokens).forEach((arg, i) => {
        let isColorStop = true;
        if (i === 0) {
            isColorStop = arg.reduce((acc, token) => {
                if (isIdentToken(token)) {
                    switch (token.value) {
                        case 'center':
                            position.push(FIFTY_PERCENT);
                            return false;
                        case 'top':
                        case 'left':
                            position.push(ZERO_LENGTH);
                            return false;
                        case 'right':
                        case 'bottom':
                            position.push(HUNDRED_PERCENT);
                            return false;
                    }
                }
                else if (isLengthPercentage(token) || isLength(token)) {
                    position.push(token);
                    return false;
                }
                return acc;
            }, isColorStop);
        }
        else if (i === 1) {
            isColorStop = arg.reduce((acc, token) => {
                if (isIdentToken(token)) {
                    switch (token.value) {
                        case CIRCLE:
                            shape = 0 /* CSSRadialShape.CIRCLE */;
                            return false;
                        case ELLIPSE:
                            shape = 1 /* CSSRadialShape.ELLIPSE */;
                            return false;
                        case CONTAIN:
                        case CLOSEST_SIDE:
                            size = 0 /* CSSRadialExtent.CLOSEST_SIDE */;
                            return false;
                        case FARTHEST_SIDE:
                            size = 1 /* CSSRadialExtent.FARTHEST_SIDE */;
                            return false;
                        case CLOSEST_CORNER:
                            size = 2 /* CSSRadialExtent.CLOSEST_CORNER */;
                            return false;
                        case COVER:
                        case FARTHEST_CORNER:
                            size = 3 /* CSSRadialExtent.FARTHEST_CORNER */;
                            return false;
                    }
                }
                else if (isLength(token) || isLengthPercentage(token)) {
                    if (!Array.isArray(size)) {
                        size = [];
                    }
                    size.push(token);
                    return false;
                }
                return acc;
            }, isColorStop);
        }
        if (isColorStop) {
            const colorStop = parseColorStop(context, arg);
            stops.push(colorStop);
        }
    });
    return { size, shape, stops, position, type: 2 /* CSSImageType.RADIAL_GRADIENT */ };
};
//# sourceMappingURL=-prefix-radial-gradient.js.map