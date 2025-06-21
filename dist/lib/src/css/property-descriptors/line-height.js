import { isIdentToken } from '../syntax/parser';
import { getAbsoluteValue, isLengthPercentage } from '../types/length-percentage';
export const lineHeight = {
    name: 'line-height',
    initialValue: 'normal',
    prefix: false,
    type: 4 /* PropertyDescriptorParsingType.TOKEN_VALUE */
};
export const computeLineHeight = (token, fontSize) => {
    if (isIdentToken(token) && token.value === 'normal') {
        return 1.2 * fontSize;
    }
    else if (token.type === 17 /* TokenType.NUMBER_TOKEN */) {
        return fontSize * token.number;
    }
    else if (isLengthPercentage(token)) {
        return getAbsoluteValue(token, fontSize);
    }
    return fontSize;
};
//# sourceMappingURL=line-height.js.map