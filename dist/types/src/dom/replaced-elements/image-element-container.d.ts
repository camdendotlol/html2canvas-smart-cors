import { ElementContainer } from '../element-container';
import { Context } from '../../core/context';
export declare class ImageElementContainer extends ElementContainer {
    src: string;
    intrinsicWidth: number;
    intrinsicHeight: number;
    isSVG: boolean;
    private static SVG;
    private static INLINED_SVG;
    private static IS_FIRE_FOX;
    constructor(context: Context, img: HTMLImageElement);
    private isInlinedSvg;
    private isSvg;
    setup(img: HTMLImageElement): Promise<void>;
}
