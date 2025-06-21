import { ElementContainer } from '../element-container';
import { serializeSvg, deserializeSvg } from '../../core/features';
export class ImageElementContainer extends ElementContainer {
    src;
    intrinsicWidth = 0;
    intrinsicHeight = 0;
    isSVG;
    static SVG = /\.svg(?:\?.*)?$/i;
    static INLINED_SVG = /^data:image\/svg\+xml/i;
    static IS_FIRE_FOX = /firefox/i.test(navigator?.userAgent);
    constructor(context, img) {
        super(context, img);
        this.src = img.currentSrc || img.src;
        this.isSVG = this.isSvg() || this.isInlinedSvg();
        this.context.cache.addImage(this.src);
    }
    isInlinedSvg = () => ImageElementContainer.INLINED_SVG.test(this.src);
    isSvg = () => ImageElementContainer.SVG.test(this.src);
    setup(img) {
        return new Promise((resolve) => {
            if (this.isSvg()) {
                resolve();
            }
            else if (this.isInlinedSvg()) {
                const [, inlinedSvg] = this.src.split(',');
                const svgElement = deserializeSvg(inlinedSvg);
                const { width: { baseVal: widthBaseVal }, height: { baseVal: heightBaseVal } } = svgElement;
                if (ImageElementContainer.IS_FIRE_FOX) {
                    widthBaseVal.valueAsString = widthBaseVal.value.toString();
                    heightBaseVal.valueAsString = heightBaseVal.value.toString();
                    img.src = serializeSvg(svgElement, 'base64');
                }
                this.intrinsicWidth = widthBaseVal.value;
                this.intrinsicHeight = heightBaseVal.value;
                resolve();
            }
            else {
                this.intrinsicWidth = img.naturalWidth;
                this.intrinsicHeight = img.naturalHeight;
                if (this.intrinsicWidth && this.intrinsicHeight) {
                    resolve();
                }
                else {
                    img.addEventListener('load', (_event) => {
                        this.intrinsicWidth = img.naturalWidth;
                        this.intrinsicHeight = img.naturalHeight;
                        resolve();
                    });
                }
            }
        });
    }
}
//# sourceMappingURL=image-element-container.js.map