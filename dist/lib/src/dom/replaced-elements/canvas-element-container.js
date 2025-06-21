import { ElementContainer } from '../element-container';
export class CanvasElementContainer extends ElementContainer {
    canvas;
    intrinsicWidth;
    intrinsicHeight;
    constructor(context, canvas) {
        super(context, canvas);
        this.canvas = canvas;
        this.intrinsicWidth = canvas.width;
        this.intrinsicHeight = canvas.height;
    }
}
//# sourceMappingURL=canvas-element-container.js.map