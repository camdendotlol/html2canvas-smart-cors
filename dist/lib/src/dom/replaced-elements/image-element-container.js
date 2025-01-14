"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageElementContainer = void 0;
var element_container_1 = require("../element-container");
var features_1 = require("../../core/features");
var ImageElementContainer = /** @class */ (function (_super) {
    __extends(ImageElementContainer, _super);
    function ImageElementContainer(context, img) {
        var _this = _super.call(this, context, img) || this;
        _this.intrinsicWidth = 0;
        _this.intrinsicHeight = 0;
        _this.isInlinedSvg = function () { return ImageElementContainer.INLINED_SVG.test(_this.src); };
        _this.isSvg = function () { return ImageElementContainer.SVG.test(_this.src); };
        _this.src = img.currentSrc || img.src;
        _this.isSVG = _this.isSvg() || _this.isInlinedSvg();
        _this.context.cache.addImage(_this.src);
        return _this;
    }
    ImageElementContainer.prototype.setup = function (img) {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.isSvg()) {
                resolve();
            }
            else if (_this.isInlinedSvg()) {
                var _a = _this.src.split(','), inlinedSvg = _a[1];
                var svgElement = (0, features_1.deserializeSvg)(inlinedSvg);
                var widthBaseVal = svgElement.width.baseVal, heightBaseVal = svgElement.height.baseVal;
                if (ImageElementContainer.IS_FIRE_FOX) {
                    widthBaseVal.valueAsString = widthBaseVal.value.toString();
                    heightBaseVal.valueAsString = heightBaseVal.value.toString();
                    img.src = (0, features_1.serializeSvg)(svgElement, 'base64');
                }
                _this.intrinsicWidth = widthBaseVal.value;
                _this.intrinsicHeight = heightBaseVal.value;
                resolve();
            }
            else {
                _this.intrinsicWidth = img.naturalWidth;
                _this.intrinsicHeight = img.naturalHeight;
                if (_this.intrinsicWidth && _this.intrinsicHeight) {
                    resolve();
                }
                else {
                    img.addEventListener('load', function (_event) {
                        _this.intrinsicWidth = img.naturalWidth;
                        _this.intrinsicHeight = img.naturalHeight;
                        resolve();
                    });
                }
            }
        });
    };
    ImageElementContainer.SVG = /\.svg(?:\?.*)?$/i;
    ImageElementContainer.INLINED_SVG = /^data:image\/svg\+xml/i;
    ImageElementContainer.IS_FIRE_FOX = /firefox/i.test(navigator === null || navigator === void 0 ? void 0 : navigator.userAgent);
    return ImageElementContainer;
}(element_container_1.ElementContainer));
exports.ImageElementContainer = ImageElementContainer;
//# sourceMappingURL=image-element-container.js.map