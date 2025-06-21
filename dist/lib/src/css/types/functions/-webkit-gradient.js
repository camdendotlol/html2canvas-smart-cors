import { isIdentToken, isNumberToken, nonFunctionArgSeparator, parseFunctionArgs } from '../../syntax/parser';
import { deg } from '../angle';
import { color as colorType } from '../color';
import { HUNDRED_PERCENT, ZERO_LENGTH } from '../length-percentage';
export const webkitGradient = (context, tokens) => {
    const angle = deg(180);
    const stops = [];
    let type = 1 /* CSSImageType.LINEAR_GRADIENT */;
    const shape = 0 /* CSSRadialShape.CIRCLE */;
    const size = 3 /* CSSRadialExtent.FARTHEST_CORNER */;
    const position = [];
    parseFunctionArgs(tokens).forEach((arg, i) => {
        const firstToken = arg[0];
        if (i === 0) {
            if (isIdentToken(firstToken) && firstToken.value === 'linear') {
                type = 1 /* CSSImageType.LINEAR_GRADIENT */;
                return;
            }
            else if (isIdentToken(firstToken) && firstToken.value === 'radial') {
                type = 2 /* CSSImageType.RADIAL_GRADIENT */;
                return;
            }
        }
        if (firstToken.type === 18 /* TokenType.FUNCTION */) {
            if (firstToken.name === 'from') {
                const color = colorType.parse(context, firstToken.values[0]);
                stops.push({ stop: ZERO_LENGTH, color });
            }
            else if (firstToken.name === 'to') {
                const color = colorType.parse(context, firstToken.values[0]);
                stops.push({ stop: HUNDRED_PERCENT, color });
            }
            else if (firstToken.name === 'color-stop') {
                const values = firstToken.values.filter(nonFunctionArgSeparator);
                if (values.length === 2) {
                    const color = colorType.parse(context, values[1]);
                    const stop = values[0];
                    if (isNumberToken(stop)) {
                        stops.push({
                            stop: { type: 16 /* TokenType.PERCENTAGE_TOKEN */, number: stop.number * 100, flags: stop.flags },
                            color
                        });
                    }
                }
            }
        }
    });
    return type === 1 /* CSSImageType.LINEAR_GRADIENT */
        ? {
            angle: (angle + deg(180)) % deg(360),
            stops,
            type
        }
        : { size, shape, stops, position, type };
};
//# sourceMappingURL=-webkit-gradient.js.map