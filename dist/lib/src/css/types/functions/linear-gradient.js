import { parseFunctionArgs } from '../../syntax/parser';
import { isAngle, angle as angleType, parseNamedSide, deg } from '../angle';
import { parseColorStop } from './gradient';
export const linearGradient = (context, tokens) => {
    let angle = deg(180);
    const stops = [];
    parseFunctionArgs(tokens).forEach((arg, i) => {
        if (i === 0) {
            const firstToken = arg[0];
            if (firstToken.type === 20 /* TokenType.IDENT_TOKEN */ && firstToken.value === 'to') {
                angle = parseNamedSide(arg);
                return;
            }
            else if (isAngle(firstToken)) {
                angle = angleType.parse(context, firstToken);
                return;
            }
        }
        const colorStop = parseColorStop(context, arg);
        stops.push(colorStop);
    });
    return { angle, stops, type: 1 /* CSSImageType.LINEAR_GRADIENT */ };
};
//# sourceMappingURL=linear-gradient.js.map