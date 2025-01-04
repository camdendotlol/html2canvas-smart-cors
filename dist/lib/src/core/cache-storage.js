"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = exports.CacheStorage = exports.cache = void 0;
var features_1 = require("./features");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exports.cache = {};
var CacheStorage = /** @class */ (function () {
    function CacheStorage() {
    }
    CacheStorage.getOrigin = function (url) {
        var link = CacheStorage._link;
        if (!link) {
            return 'about:blank';
        }
        link.href = url;
        link.href = link.href; // IE9, LOL! - http://jsfiddle.net/niklasvh/2e48b/
        return link.protocol + link.hostname + link.port;
    };
    CacheStorage.isSameOrigin = function (src) {
        return CacheStorage.getOrigin(src) === CacheStorage._origin;
    };
    CacheStorage.setContext = function (window) {
        CacheStorage._link = window.document.createElement('a');
        CacheStorage._origin = CacheStorage.getOrigin(window.location.href);
    };
    CacheStorage._origin = 'about:blank';
    return CacheStorage;
}());
exports.CacheStorage = CacheStorage;
var Cache = /** @class */ (function () {
    function Cache(context, _options) {
        this.context = context;
        this._options = _options;
    }
    Cache.prototype.deleteImage = function (src) {
        if (this.has(src)) {
            delete exports.cache[src];
            return true;
        }
        return false;
    };
    Cache.prototype.addImage = function (src) {
        if (this.has(src))
            return true;
        if (isBlobImage(src) || isRenderable(src)) {
            (exports.cache[src] = this.loadImage(src)).catch(function () {
                // prevent unhandled rejection
            });
            return true;
        }
        return false;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Cache.prototype.match = function (src) {
        return exports.cache[src];
    };
    Cache.prototype.loadImage = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var isExtensionImage, isSameOrigin, useCORS, useProxy, src;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isExtensionImage = key.startsWith('chrome-extension://');
                        isSameOrigin = CacheStorage.isSameOrigin(key) || isExtensionImage;
                        useCORS = !isInlineImage(key) && this._options.useCORS === true && features_1.FEATURES.SUPPORT_CORS_IMAGES && !isSameOrigin;
                        useProxy = !isInlineImage(key) &&
                            !isSameOrigin &&
                            !isBlobImage(key) &&
                            typeof this._options.proxy === 'string' &&
                            features_1.FEATURES.SUPPORT_CORS_XHR &&
                            !useCORS &&
                            !isExtensionImage;
                        if (!isSameOrigin &&
                            this._options.allowTaint === false &&
                            !isInlineImage(key) &&
                            !isBlobImage(key) &&
                            !useProxy &&
                            !useCORS) {
                            return [2 /*return*/];
                        }
                        src = key;
                        if (!useProxy) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.proxy(src)];
                    case 1:
                        src = _a.sent();
                        _a.label = 2;
                    case 2:
                        this.context.logger.debug("Added image ".concat(key.substring(0, 256)));
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                var img = new Image();
                                img.onload = function () { return resolve(img); };
                                img.onerror = function () { return __awaiter(_this, void 0, void 0, function () {
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                // try to run it through a cors proxy
                                                _a = img;
                                                return [4 /*yield*/, this.proxy(src)];
                                            case 1:
                                                // try to run it through a cors proxy
                                                _a.src = _b.sent();
                                                // ...then reject if it still doesn't work
                                                img.onerror = reject;
                                                return [2 /*return*/];
                                        }
                                    });
                                }); };
                                //ios safari 10.3 taints canvas with data urls unless crossOrigin is set to anonymous
                                if (isInlineImage(src) || isInlineBase64Image(src) || useCORS) {
                                    img.crossOrigin = 'anonymous';
                                }
                                if (!isInlineImage(src) && useCORS) {
                                    // in chrome if the image loaded before without crossorigin it will be cached and used later even if the next usage has crossorigin
                                    // it will fail with CORS error, add a random query parameter just to prevent the chrome from using the cached image
                                    // see more info about the chrome issue in this link: https://stackoverflow.com/a/49503414
                                    src = src + (src.includes('?') ? '&' : '?') + "cors=".concat(Math.random());
                                }
                                img.src = src;
                                if (/^data:/.test(src)) {
                                    resolve(img);
                                }
                                else if (img.complete === true) {
                                    // Inline XML images may fail to parse, throwing an Error later on
                                    setTimeout(function () { return resolve(img); }, 500);
                                }
                                if (_this._options.imageTimeout > 0) {
                                    setTimeout(function () { return reject("Timed out (".concat(_this._options.imageTimeout, "ms) loading image")); }, _this._options.imageTimeout);
                                }
                            })];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Cache.prototype.has = function (key) {
        return key in exports.cache;
    };
    Cache.prototype.keys = function () {
        return Promise.resolve(Object.keys(exports.cache));
    };
    Cache.prototype.proxy = function (src) {
        var _this = this;
        var proxy = this._options.proxy;
        if (!proxy) {
            throw new Error('No proxy defined');
        }
        var key = src.substring(0, 256);
        return new Promise(function (resolve, reject) {
            var responseType = features_1.FEATURES.SUPPORT_RESPONSE_TYPE ? 'blob' : 'text';
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (xhr.status === 200) {
                    if (responseType === 'text') {
                        resolve(xhr.response);
                    }
                    else {
                        var reader_1 = new FileReader();
                        reader_1.addEventListener('load', function () { return resolve(reader_1.result); }, false);
                        reader_1.addEventListener('error', function (e) { return reject(e); }, false);
                        reader_1.readAsDataURL(xhr.response);
                    }
                }
                else {
                    reject("Failed to proxy resource ".concat(key, " with status code ").concat(xhr.status));
                }
            };
            xhr.onerror = reject;
            var queryString = proxy.includes('?') ? '&' : '?';
            xhr.open('GET', "".concat(proxy).concat(queryString, "url=").concat(encodeURIComponent(src), "&responseType=").concat(responseType));
            if (responseType !== 'text' && xhr instanceof XMLHttpRequest) {
                xhr.responseType = responseType;
            }
            if (_this._options.imageTimeout) {
                var timeout_1 = _this._options.imageTimeout;
                xhr.timeout = timeout_1;
                xhr.ontimeout = function () { return reject("Timed out (".concat(timeout_1, "ms) proxying ").concat(key)); };
            }
            xhr.send();
        });
    };
    return Cache;
}());
exports.Cache = Cache;
var INLINE_SVG = /^data:image\/svg\+xml/i;
var INLINE_BASE64 = /^data:image\/.*;base64,/i;
var INLINE_IMG = /^data:image\/.*/i;
var isRenderable = function (src) { return features_1.FEATURES.SUPPORT_SVG_DRAWING || !isSVG(src); };
var isInlineImage = function (src) { return INLINE_IMG.test(src); };
var isInlineBase64Image = function (src) { return INLINE_BASE64.test(src); };
var isBlobImage = function (src) { return src.slice(0, 4) === 'blob'; };
var isSVG = function (src) { return src.slice(-3).toLowerCase() === 'svg' || INLINE_SVG.test(src); };
//# sourceMappingURL=cache-storage.js.map