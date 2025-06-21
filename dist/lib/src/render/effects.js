export class TransformEffect {
    offsetX;
    offsetY;
    matrix;
    type = 0 /* EffectType.TRANSFORM */;
    target = 2 /* EffectTarget.BACKGROUND_BORDERS */ | 4 /* EffectTarget.CONTENT */;
    constructor(offsetX, offsetY, matrix) {
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.matrix = matrix;
    }
}
export class ClipEffect {
    path;
    target;
    type = 1 /* EffectType.CLIP */;
    constructor(path, target) {
        this.path = path;
        this.target = target;
    }
}
export class OpacityEffect {
    opacity;
    type = 2 /* EffectType.OPACITY */;
    target = 2 /* EffectTarget.BACKGROUND_BORDERS */ | 4 /* EffectTarget.CONTENT */;
    constructor(opacity) {
        this.opacity = opacity;
    }
}
export const isTransformEffect = (effect) => effect.type === 0 /* EffectType.TRANSFORM */;
export const isClipEffect = (effect) => effect.type === 1 /* EffectType.CLIP */;
export const isOpacityEffect = (effect) => effect.type === 2 /* EffectType.OPACITY */;
//# sourceMappingURL=effects.js.map