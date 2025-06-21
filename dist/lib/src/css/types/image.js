import { linearGradient } from './functions/linear-gradient';
import { prefixLinearGradient } from './functions/-prefix-linear-gradient';
import { webkitGradient } from './functions/-webkit-gradient';
import { radialGradient } from './functions/radial-gradient';
import { prefixRadialGradient } from './functions/-prefix-radial-gradient';
export const isLinearGradient = (background) => {
    return background.type === 1 /* CSSImageType.LINEAR_GRADIENT */;
};
export const isRadialGradient = (background) => {
    return background.type === 2 /* CSSImageType.RADIAL_GRADIENT */;
};
export const image = {
    name: 'image',
    parse: (context, value) => {
        if (value.type === 22 /* TokenType.URL_TOKEN */) {
            const image = { url: value.value, type: 0 /* CSSImageType.URL */ };
            context.cache.addImage(value.value);
            return image;
        }
        if (value.type === 18 /* TokenType.FUNCTION */) {
            const imageFunction = SUPPORTED_IMAGE_FUNCTIONS[value.name];
            if (typeof imageFunction === 'undefined') {
                throw new Error(`Attempting to parse an unsupported image function "${value.name}"`);
            }
            return imageFunction(context, value.values);
        }
        throw new Error(`Unsupported image type ${value.type}`);
    }
};
export function isSupportedImage(value) {
    return (!(value.type === 20 /* TokenType.IDENT_TOKEN */ && value.value === 'none') &&
        (value.type !== 18 /* TokenType.FUNCTION */ || !!SUPPORTED_IMAGE_FUNCTIONS[value.name]));
}
const SUPPORTED_IMAGE_FUNCTIONS = {
    'linear-gradient': linearGradient,
    '-moz-linear-gradient': prefixLinearGradient,
    '-ms-linear-gradient': prefixLinearGradient,
    '-o-linear-gradient': prefixLinearGradient,
    '-webkit-linear-gradient': prefixLinearGradient,
    'radial-gradient': radialGradient,
    '-moz-radial-gradient': prefixRadialGradient,
    '-ms-radial-gradient': prefixRadialGradient,
    '-o-radial-gradient': prefixRadialGradient,
    '-webkit-radial-gradient': prefixRadialGradient,
    '-webkit-gradient': webkitGradient
};
//# sourceMappingURL=image.js.map