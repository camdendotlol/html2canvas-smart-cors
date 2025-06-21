import { deepStrictEqual } from 'assert';
import { Parser } from '../../syntax/parser';
import { paintOrder } from '../paint-order';
const paintOrderParse = (value) => paintOrder.parse({}, Parser.parseValues(value));
describe('property-descriptors', () => {
    describe('paint-order', () => {
        it('none', () => deepStrictEqual(paintOrderParse('none'), [
            0 /* PAINT_ORDER_LAYER.FILL */,
            1 /* PAINT_ORDER_LAYER.STROKE */,
            2 /* PAINT_ORDER_LAYER.MARKERS */
        ]));
        it('EMPTY', () => deepStrictEqual(paintOrderParse(''), [
            0 /* PAINT_ORDER_LAYER.FILL */,
            1 /* PAINT_ORDER_LAYER.STROKE */,
            2 /* PAINT_ORDER_LAYER.MARKERS */
        ]));
        it('other values', () => deepStrictEqual(paintOrderParse('other values'), [
            0 /* PAINT_ORDER_LAYER.FILL */,
            1 /* PAINT_ORDER_LAYER.STROKE */,
            2 /* PAINT_ORDER_LAYER.MARKERS */
        ]));
        it('normal', () => deepStrictEqual(paintOrderParse('normal'), [
            0 /* PAINT_ORDER_LAYER.FILL */,
            1 /* PAINT_ORDER_LAYER.STROKE */,
            2 /* PAINT_ORDER_LAYER.MARKERS */
        ]));
        it('stroke', () => deepStrictEqual(paintOrderParse('stroke'), [
            1 /* PAINT_ORDER_LAYER.STROKE */,
            0 /* PAINT_ORDER_LAYER.FILL */,
            2 /* PAINT_ORDER_LAYER.MARKERS */
        ]));
        it('fill', () => deepStrictEqual(paintOrderParse('fill'), [
            0 /* PAINT_ORDER_LAYER.FILL */,
            1 /* PAINT_ORDER_LAYER.STROKE */,
            2 /* PAINT_ORDER_LAYER.MARKERS */
        ]));
        it('markers', () => deepStrictEqual(paintOrderParse('markers'), [
            2 /* PAINT_ORDER_LAYER.MARKERS */,
            0 /* PAINT_ORDER_LAYER.FILL */,
            1 /* PAINT_ORDER_LAYER.STROKE */
        ]));
        it('stroke fill', () => deepStrictEqual(paintOrderParse('stroke fill'), [
            1 /* PAINT_ORDER_LAYER.STROKE */,
            0 /* PAINT_ORDER_LAYER.FILL */,
            2 /* PAINT_ORDER_LAYER.MARKERS */
        ]));
        it('markers stroke', () => deepStrictEqual(paintOrderParse('markers stroke'), [
            2 /* PAINT_ORDER_LAYER.MARKERS */,
            1 /* PAINT_ORDER_LAYER.STROKE */,
            0 /* PAINT_ORDER_LAYER.FILL */
        ]));
        it('markers stroke fill', () => deepStrictEqual(paintOrderParse('markers stroke fill'), [
            2 /* PAINT_ORDER_LAYER.MARKERS */,
            1 /* PAINT_ORDER_LAYER.STROKE */,
            0 /* PAINT_ORDER_LAYER.FILL */
        ]));
        it('stroke fill markers', () => deepStrictEqual(paintOrderParse('stroke fill markers'), [
            1 /* PAINT_ORDER_LAYER.STROKE */,
            0 /* PAINT_ORDER_LAYER.FILL */,
            2 /* PAINT_ORDER_LAYER.MARKERS */
        ]));
    });
});
//# sourceMappingURL=paint-order.js.map