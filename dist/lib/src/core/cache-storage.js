import { FEATURES } from './features';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cache = {};
export class CacheStorage {
    static _link;
    static _origin = 'about:blank';
    static getOrigin(url) {
        const link = CacheStorage._link;
        if (!link) {
            return 'about:blank';
        }
        link.href = url;
        link.href = link.href; // IE9, LOL! - http://jsfiddle.net/niklasvh/2e48b/
        return link.protocol + link.hostname + link.port;
    }
    static isSameOrigin(src) {
        return CacheStorage.getOrigin(src) === CacheStorage._origin;
    }
    static setContext(window) {
        CacheStorage._link = window.document.createElement('a');
        CacheStorage._origin = CacheStorage.getOrigin(window.location.href);
    }
}
export class Cache {
    context;
    _options;
    constructor(context, _options) {
        this.context = context;
        this._options = _options;
    }
    deleteImage(src) {
        if (this.has(src)) {
            delete cache[src];
            return true;
        }
        return false;
    }
    addImage(src) {
        if (this.has(src))
            return true;
        if (isBlobImage(src) || isRenderable(src)) {
            (cache[src] = this.loadImage(src)).catch(() => {
                // prevent unhandled rejection
            });
            return true;
        }
        return false;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    match(src) {
        return cache[src];
    }
    async loadImage(key) {
        const isExtensionImage = key.startsWith('chrome-extension://');
        const isSameOrigin = CacheStorage.isSameOrigin(key) || isExtensionImage;
        const useCORS = !isInlineImage(key) && this._options.useCORS === true && FEATURES.SUPPORT_CORS_IMAGES && !isSameOrigin;
        const useProxy = !isInlineImage(key) &&
            !isSameOrigin &&
            !isBlobImage(key) &&
            typeof this._options.proxy === 'string' &&
            FEATURES.SUPPORT_CORS_XHR &&
            !useCORS &&
            !isExtensionImage;
        if (!isSameOrigin &&
            this._options.allowTaint === false &&
            !isInlineImage(key) &&
            !isBlobImage(key) &&
            !useProxy &&
            !useCORS) {
            return;
        }
        let src = key;
        if (useProxy) {
            src = await this.proxy(src);
        }
        this.context.logger.debug(`Added image ${key.substring(0, 256)}`);
        return await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = async () => {
                // try to run it through a cors proxy
                img.src = await this.proxy(src);
                // ...then reject if it still doesn't work
                img.onerror = reject;
            };
            //ios safari 10.3 taints canvas with data urls unless crossOrigin is set to anonymous
            if (isInlineImage(src) || isInlineBase64Image(src) || useCORS) {
                img.crossOrigin = 'anonymous';
            }
            if (!isInlineImage(src) && useCORS) {
                // in chrome if the image loaded before without crossorigin it will be cached and used later even if the next usage has crossorigin
                // it will fail with CORS error, add a random query parameter just to prevent the chrome from using the cached image
                // see more info about the chrome issue in this link: https://stackoverflow.com/a/49503414
                src = src + (src.includes('?') ? '&' : '?') + `asdf=${Math.random()}`;
            }
            img.src = src;
            if (/^data:/.test(src)) {
                resolve(img);
            }
            else if (img.complete === true) {
                // Inline XML images may fail to parse, throwing an Error later on
                setTimeout(() => resolve(img), 500);
            }
            if (this._options.imageTimeout > 0) {
                setTimeout(() => reject(`Timed out (${this._options.imageTimeout}ms) loading image`), this._options.imageTimeout);
            }
        });
    }
    has(key) {
        return key in cache;
    }
    keys() {
        return Promise.resolve(Object.keys(cache));
    }
    proxy(src) {
        const proxy = this._options.proxy;
        if (!proxy) {
            throw new Error('No proxy defined');
        }
        const key = src.substring(0, 256);
        return new Promise((resolve, reject) => {
            const responseType = FEATURES.SUPPORT_RESPONSE_TYPE ? 'blob' : 'text';
            const xhr = new XMLHttpRequest();
            xhr.onload = () => {
                if (xhr.status === 200) {
                    if (responseType === 'text') {
                        resolve(xhr.response);
                    }
                    else {
                        const reader = new FileReader();
                        reader.addEventListener('load', () => resolve(reader.result), false);
                        reader.addEventListener('error', (e) => reject(e), false);
                        reader.readAsDataURL(xhr.response);
                    }
                }
                else {
                    reject(`Failed to proxy resource ${key} with status code ${xhr.status}`);
                }
            };
            xhr.onerror = reject;
            const queryString = proxy.includes('?') ? '&' : '?';
            xhr.open('GET', `${proxy}${queryString}url=${encodeURIComponent(src)}&responseType=${responseType}`);
            if (responseType !== 'text' && xhr instanceof XMLHttpRequest) {
                xhr.responseType = responseType;
            }
            if (this._options.imageTimeout) {
                const timeout = this._options.imageTimeout;
                xhr.timeout = timeout;
                xhr.ontimeout = () => reject(`Timed out (${timeout}ms) proxying ${key}`);
            }
            xhr.send();
        });
    }
}
const INLINE_SVG = /^data:image\/svg\+xml/i;
const INLINE_BASE64 = /^data:image\/.*;base64,/i;
const INLINE_IMG = /^data:image\/.*/i;
const isRenderable = (src) => FEATURES.SUPPORT_SVG_DRAWING || !isSVG(src);
const isInlineImage = (src) => INLINE_IMG.test(src);
const isInlineBase64Image = (src) => INLINE_BASE64.test(src);
const isBlobImage = (src) => src.slice(0, 4) === 'blob';
const isSVG = (src) => src.slice(-3).toLowerCase() === 'svg' || INLINE_SVG.test(src);
//# sourceMappingURL=cache-storage.js.map