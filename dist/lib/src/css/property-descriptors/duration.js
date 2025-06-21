import { isDimensionToken } from '../syntax/parser';
import { time } from '../types/time';
export const duration = {
    name: 'duration',
    initialValue: '0s',
    prefix: false,
    type: 1 /* PropertyDescriptorParsingType.LIST */,
    parse: (context, tokens) => {
        return tokens.filter(isDimensionToken).map((token) => time.parse(context, token));
    }
};
//# sourceMappingURL=duration.js.map