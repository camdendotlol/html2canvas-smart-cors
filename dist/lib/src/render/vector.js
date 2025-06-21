import { PathType } from './path';
export class Vector {
    type;
    x;
    y;
    constructor(x, y) {
        this.type = PathType.VECTOR;
        this.x = x;
        this.y = y;
    }
    add(deltaX, deltaY) {
        return new Vector(this.x + deltaX, this.y + deltaY);
    }
    reverse() {
        return this;
    }
}
export const isVector = (path) => path.type === PathType.VECTOR;
//# sourceMappingURL=vector.js.map