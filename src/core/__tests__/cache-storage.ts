import {deepStrictEqual, fail} from 'assert';
import {FEATURES} from '../features';
import {CacheStorage, cache} from '../cache-storage';
import {Context} from '../context';
import {Bounds} from '../../css/layout/bounds';

const proxy = 'http://example.com/proxy';

const createMockContext = (origin: string, opts = {}) => {
    const context = {
        location: {
            href: origin
        },
        document: {
            createElement(_name: string) {
                let _href = '';
                return {
                    set href(value: string) {
                        _href = value;
                    },
                    get href() {
                        return _href;
                    },
                    get protocol() {
                        return new URL(_href).protocol;
                    },
                    get hostname() {
                        return new URL(_href).hostname;
                    },
                    get port() {
                        return new URL(_href).port;
                    }
                };
            }
        }
    };

    CacheStorage.setContext(context as Window);

    return new Context(
        {
            logging: false,
            imageTimeout: 0,
            useCORS: false,
            allowTaint: false,
            proxy,
            ...opts
        },
        new Bounds(0, 0, 0, 0)
    );
};

const images: ImageMock[] = [];
const xhr: XMLHttpRequestMock[] = [];
const sleep = async (timeout: number) => await new Promise((resolve) => setTimeout(resolve, timeout));

class ImageMock {
    src?: string;
    crossOrigin?: string;
    onload?: () => void;
    constructor() {
        images.push(this);
    }
}

class XMLHttpRequestMock {
    sent: boolean;
    status: number;
    timeout: number;
    method?: string;
    url?: string;
    response?: string;
    onload?: () => void;
    ontimeout?: () => void;
    constructor() {
        this.sent = false;
        this.status = 500;
        this.timeout = 5000;
        xhr.push(this);
    }

    async load(status: number, response: string) {
        this.response = response;
        this.status = status;
        if (this.onload) {
            this.onload();
        }
        await sleep(0);
    }

    open(method: string, url: string) {
        this.method = method;
        this.url = url;
    }
    send() {
        this.sent = true;
    }
}

Object.defineProperty(global, 'Image', {value: ImageMock, writable: true});
Object.defineProperty(global, 'XMLHttpRequest', {
    value: XMLHttpRequestMock,
    writable: true
});

const setFeatures = (opts: {[key: string]: boolean} = {}) => {
    const defaults: {[key: string]: boolean} = {
        SUPPORT_SVG_DRAWING: true,
        SUPPORT_CORS_IMAGES: true,
        SUPPORT_CORS_XHR: true,
        SUPPORT_RESPONSE_TYPE: false
    };

    Object.keys(defaults).forEach((key) => {
        Object.defineProperty(FEATURES, key, {
            value: typeof opts[key] === 'boolean' ? opts[key] : defaults[key],
            writable: true
        });
    });
};

function removeQueryString(url?: string): string | undefined {
    if (url === undefined || url === null) {
        return undefined;
    }

    const urlObject = new URL(url);
    return urlObject.origin + urlObject.pathname;
}

describe('cache-storage', () => {
    beforeEach(() => {
        setFeatures();
        for (const key in cache) {
            if (cache.hasOwnProperty(key)) {
                delete cache[key];
            }
        }
    });
    afterEach(() => {
        xhr.splice(0, xhr.length);
        images.splice(0, images.length);
    });
    it('addImage adds images to cache', () => {
        const {cache} = createMockContext('http://example.com', {proxy: null});
        cache.addImage('http://example.com/test.jpg');
        cache.addImage('http://example.com/test2.jpg');

        deepStrictEqual(images.length, 2);
        deepStrictEqual(images[0].src, 'http://example.com/test.jpg');
        deepStrictEqual(images[1].src, 'http://example.com/test2.jpg');
    });

    it('addImage should not add duplicate entries', () => {
        const {cache} = createMockContext('http://example.com');
        cache.addImage('http://example.com/test.jpg');
        cache.addImage('http://example.com/test.jpg');

        deepStrictEqual(images.length, 1);
        deepStrictEqual(images[0].src, 'http://example.com/test.jpg');
    });

    describe('svg', () => {
        it('should add svg images correctly', () => {
            const {cache} = createMockContext('http://example.com');
            cache.addImage('http://example.com/test.svg');
            cache.addImage('http://example.com/test2.svg');

            deepStrictEqual(images.length, 2);
            deepStrictEqual(images[0].src, 'http://example.com/test.svg');
            deepStrictEqual(images[1].src, 'http://example.com/test2.svg');
        });

        it('should omit svg images if not supported', () => {
            setFeatures({SUPPORT_SVG_DRAWING: false});
            const {cache} = createMockContext('http://example.com');
            cache.addImage('http://example.com/test.svg');
            cache.addImage('http://example.com/test2.svg');

            deepStrictEqual(images.length, 0);
        });
    });

    describe('cross-origin', () => {
        it('addImage should not add images it cannot load/render', () => {
            const {cache} = createMockContext('http://example.com', {
                proxy: undefined
            });
            cache.addImage('http://html2canvas.hertzen.com/test.jpg');
            deepStrictEqual(images.length, 0);
        });

        it('addImage should add images if tainting enabled', () => {
            const {cache} = createMockContext('http://example.com', {
                allowTaint: true,
                proxy: undefined
            });
            cache.addImage('http://html2canvas.hertzen.com/test.jpg');
            deepStrictEqual(images.length, 1);
            deepStrictEqual(images[0].src, 'http://html2canvas.hertzen.com/test.jpg');
            deepStrictEqual(images[0].crossOrigin, undefined);
        });

        it('addImage should add images if cors enabled', () => {
            const {cache} = createMockContext('http://example.com', {useCORS: true});
            cache.addImage('http://html2canvas.hertzen.com/test.jpg');
            deepStrictEqual(images.length, 1);
            deepStrictEqual(removeQueryString(images[0].src), 'http://html2canvas.hertzen.com/test.jpg');
            deepStrictEqual(images[0].crossOrigin, 'anonymous');
        });

        it('addImage should not add images if cors enabled but not supported', () => {
            setFeatures({SUPPORT_CORS_IMAGES: false});

            const {cache} = createMockContext('http://example.com', {
                useCORS: true,
                proxy: undefined
            });
            cache.addImage('http://html2canvas.hertzen.com/test.jpg');
            deepStrictEqual(images.length, 0);
        });

        it('addImage should not add images to proxy if cors enabled', () => {
            const {cache} = createMockContext('http://example.com', {useCORS: true});
            cache.addImage('http://html2canvas.hertzen.com/test.jpg');
            deepStrictEqual(images.length, 1);
            deepStrictEqual(removeQueryString(images[0].src), 'http://html2canvas.hertzen.com/test.jpg');
            deepStrictEqual(images[0].crossOrigin, 'anonymous');
        });

        it('addImage should use proxy ', async () => {
            const {cache} = createMockContext('http://example.com');
            cache.addImage('http://html2canvas.hertzen.com/test.jpg');
            deepStrictEqual(xhr.length, 1);
            deepStrictEqual(
                xhr[0].url,
                `${proxy}?url=${encodeURIComponent('http://html2canvas.hertzen.com/test.jpg')}&responseType=text`
            );
            await xhr[0].load(200, '<data response>');

            deepStrictEqual(images.length, 1);
            deepStrictEqual(images[0].src, '<data response>');
        });

        it('proxy should respect imageTimeout', async () => {
            const {cache} = createMockContext('http://example.com', {
                imageTimeout: 10
            });
            cache.addImage('http://html2canvas.hertzen.com/test.jpg');

            deepStrictEqual(xhr.length, 1);
            deepStrictEqual(
                xhr[0].url,
                `${proxy}?url=${encodeURIComponent('http://html2canvas.hertzen.com/test.jpg')}&responseType=text`
            );
            deepStrictEqual(xhr[0].timeout, 10);
            if (xhr[0].ontimeout) {
                xhr[0].ontimeout();
            }
            try {
                await cache.match('http://html2canvas.hertzen.com/test.jpg');
                fail('Expected result to timeout');
            } catch (e) {}
        });
    });

    it('match should return cache entry', async () => {
        const {cache} = createMockContext('http://example.com');
        cache.addImage('http://example.com/test.jpg');

        if (images[0].onload) {
            images[0].onload();
        }

        const response = await cache.match('http://example.com/test.jpg');

        deepStrictEqual(response.src, 'http://example.com/test.jpg');
    });

    it('image should respect imageTimeout', async () => {
        const {cache} = createMockContext('http://example.com', {imageTimeout: 10});
        cache.addImage('http://example.com/test.jpg');

        try {
            await cache.match('http://example.com/test.jpg');
            fail('Expected result to timeout');
        } catch (e) {}
    });

    it('addImage should add an inlined image', async () => {
        const {cache} = createMockContext('http://example.com', {imageTimeout: 10});
        const inlinedImg = `data:image/gif;base64,R0lGODlhEAAOALMAAOazToeHh0tLS/7LZv/0jvb29t/f3//Ub/
/ge8WSLf/rhf/3kdbW1mxsbP//mf///yH5BAAAAAAALAAAAAAQAA4AAARe8L1Ekyky67QZ1hLnjM5UUde0ECwLJoExKcpp
V0aCcGCmTIHEIUEqjgaORCMxIC6e0CcguWw6aFjsVMkkIr7g77ZKPJjPZqIyd7sJAgVGoEGv2xsBxqNgYPj/gAwXEQA7`;
        cache.addImage(inlinedImg);

        await cache.match(inlinedImg);
    });
});
