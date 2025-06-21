import { deepStrictEqual } from 'assert';
import { Parser } from '../../../syntax/parser';
import { radialGradient } from '../radial-gradient';
import { color } from '../../color';
import { FIFTY_PERCENT, HUNDRED_PERCENT } from '../../length-percentage';
const parse = (value) => radialGradient({}, Parser.parseValues(value)[0].values);
const colorParse = (value) => color.parse({}, Parser.parseValue(value));
describe('functions', () => {
    describe('radial-gradient', () => {
        describe('parsing', () => {
            it('radial-gradient(circle closest-side, #3f87a6, #ebf8e1, #f69d3c)', () => deepStrictEqual(parse('radial-gradient(ellipse closest-side, #3f87a6, #ebf8e1, #f69d3c)'), {
                type: 2 /* CSSImageType.RADIAL_GRADIENT */,
                shape: 1 /* CSSRadialShape.ELLIPSE */,
                size: 0 /* CSSRadialExtent.CLOSEST_SIDE */,
                position: [],
                stops: [
                    { color: colorParse('#3f87a6'), stop: null },
                    { color: colorParse('#ebf8e1'), stop: null },
                    { color: colorParse('#f69d3c'), stop: null }
                ]
            }));
            it('radial-gradient(circle at center, red 0, blue, green 100%)', () => deepStrictEqual(parse('radial-gradient(circle at center, red 0, blue, green 100%)'), {
                type: 2 /* CSSImageType.RADIAL_GRADIENT */,
                shape: 0 /* CSSRadialShape.CIRCLE */,
                size: 3 /* CSSRadialExtent.FARTHEST_CORNER */,
                position: [FIFTY_PERCENT],
                stops: [
                    { color: colorParse('red'), stop: { type: 17 /* TokenType.NUMBER_TOKEN */, number: 0, flags: 4 } },
                    { color: colorParse('blue'), stop: null },
                    { color: colorParse('green'), stop: { type: 16 /* TokenType.PERCENTAGE_TOKEN */, number: 100, flags: 4 } }
                ]
            }));
            it('radial-gradient(circle at 100%, #333, #333 50%, #eee 75%, #333 75%)', () => deepStrictEqual(parse('radial-gradient(circle at 100%, #333, #333 50%, #eee 75%, #333 75%)'), {
                type: 2 /* CSSImageType.RADIAL_GRADIENT */,
                shape: 0 /* CSSRadialShape.CIRCLE */,
                size: 3 /* CSSRadialExtent.FARTHEST_CORNER */,
                position: [HUNDRED_PERCENT],
                stops: [
                    { color: colorParse('#333'), stop: null },
                    { color: colorParse('#333'), stop: { type: 16 /* TokenType.PERCENTAGE_TOKEN */, number: 50, flags: 4 } },
                    { color: colorParse('#eee'), stop: { type: 16 /* TokenType.PERCENTAGE_TOKEN */, number: 75, flags: 4 } },
                    { color: colorParse('#333'), stop: { type: 16 /* TokenType.PERCENTAGE_TOKEN */, number: 75, flags: 4 } }
                ]
            }));
            it('radial-gradient(20px, red, blue)', () => deepStrictEqual(parse('radial-gradient(20px, red, blue)'), {
                type: 2 /* CSSImageType.RADIAL_GRADIENT */,
                shape: 0 /* CSSRadialShape.CIRCLE */,
                size: [{ type: 15 /* TokenType.DIMENSION_TOKEN */, number: 20, flags: 4, unit: 'px' }],
                position: [],
                stops: [
                    { color: colorParse('red'), stop: null },
                    { color: colorParse('blue'), stop: null }
                ]
            }));
        });
    });
});
//# sourceMappingURL=radial-gradient.js.map