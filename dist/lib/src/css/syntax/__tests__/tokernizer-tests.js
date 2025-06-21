import { deepEqual } from 'assert';
import { Tokenizer } from '../tokenizer';
const tokenize = (value) => {
    const tokenizer = new Tokenizer();
    tokenizer.write(value);
    return tokenizer.read();
};
describe('tokenizer', () => {
    describe('<ident>', () => {
        it('auto', () => deepEqual(tokenize('auto'), [{ type: 20 /* TokenType.IDENT_TOKEN */, value: 'auto' }]));
        it('url', () => deepEqual(tokenize('url'), [{ type: 20 /* TokenType.IDENT_TOKEN */, value: 'url' }]));
        it('auto test', () => deepEqual(tokenize('auto        test'), [
            { type: 20 /* TokenType.IDENT_TOKEN */, value: 'auto' },
            { type: 31 /* TokenType.WHITESPACE_TOKEN */ },
            { type: 20 /* TokenType.IDENT_TOKEN */, value: 'test' }
        ]));
    });
    describe('<url-token>', () => {
        it('url(test.jpg)', () => deepEqual(tokenize('url(test.jpg)'), [{ type: 22 /* TokenType.URL_TOKEN */, value: 'test.jpg' }]));
        it('url("test.jpg")', () => deepEqual(tokenize('url("test.jpg")'), [{ type: 22 /* TokenType.URL_TOKEN */, value: 'test.jpg' }]));
        it("url('test.jpg')", () => deepEqual(tokenize("url('test.jpg')"), [{ type: 22 /* TokenType.URL_TOKEN */, value: 'test.jpg' }]));
    });
});
//# sourceMappingURL=tokernizer-tests.js.map