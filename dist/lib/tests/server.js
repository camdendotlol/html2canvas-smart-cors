"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.screenshotApp = exports.corsApp = exports.app = void 0;
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var filenamify_url_1 = __importDefault(require("filenamify-url"));
var fs_1 = __importDefault(require("fs"));
var html2canvas_proxy_1 = __importDefault(require("html2canvas-proxy"));
var mkdirp_1 = __importDefault(require("mkdirp"));
var path_1 = __importDefault(require("path"));
var serve_index_1 = __importDefault(require("serve-index"));
var yargs_1 = __importDefault(require("yargs"));
exports.app = (0, express_1.default)();
exports.app.use('/', (0, serve_index_1.default)(path_1.default.resolve(__dirname, '../'), { icons: true }));
exports.app.use([/^\/src($|\/)/, '/'], express_1.default.static(path_1.default.resolve(__dirname, '../')));
exports.corsApp = (0, express_1.default)();
exports.corsApp.use('/proxy', (0, html2canvas_proxy_1.default)());
exports.corsApp.use('/cors', (0, cors_1.default)(), express_1.default.static(path_1.default.resolve(__dirname, '../')));
exports.corsApp.use('/', express_1.default.static(path_1.default.resolve(__dirname, '.')));
exports.screenshotApp = (0, express_1.default)();
exports.screenshotApp.use((0, cors_1.default)());
exports.screenshotApp.use(function (req, _res, next) {
    // IE9 doesn't set headers for cross-domain ajax requests
    if (typeof req.headers['content-type'] === 'undefined') {
        req.headers['content-type'] = 'application/json';
    }
    next();
});
exports.screenshotApp.use(express_1.default.json({
    limit: '15mb',
    type: '*/*'
}));
var prefix = 'data:image/png;base64,';
var screenshotFolder = '../tmp/reftests';
var metadataFolder = '../tmp/reftests/metadata';
mkdirp_1.default.sync(path_1.default.resolve(__dirname, screenshotFolder));
mkdirp_1.default.sync(path_1.default.resolve(__dirname, metadataFolder));
var writeScreenshot = function (buffer, body) {
    var filename = "".concat((0, filenamify_url_1.default)(body.test.replace(/^\/tests\/reftests\//, '').replace(/\.html$/, ''), {
        replacement: '-'
    }), "!").concat([process.env.TARGET_BROWSER, body.platform.name, body.platform.version].join('-'));
    fs_1.default.writeFileSync(path_1.default.resolve(__dirname, screenshotFolder, "".concat(filename, ".png")), buffer);
    return filename;
};
exports.screenshotApp.post('/screenshot', function (req, res) {
    if (!req.body || !req.body.screenshot) {
        return res.sendStatus(400);
    }
    var buffer = Buffer.from(req.body.screenshot.substring(prefix.length), 'base64');
    var filename = writeScreenshot(buffer, req.body);
    fs_1.default.writeFileSync(path_1.default.resolve(__dirname, metadataFolder, "".concat(filename, ".json")), JSON.stringify({
        windowWidth: req.body.windowWidth,
        windowHeight: req.body.windowHeight,
        platform: req.body.platform,
        devicePixelRatio: req.body.devicePixelRatio,
        test: req.body.test,
        id: process.env.TARGET_BROWSER,
        screenshot: filename
    }));
    return res.sendStatus(200);
});
exports.screenshotApp.use(function (error, _req, _res, next) {
    console.error(error);
    next();
});
var args = (0, yargs_1.default)(process.argv.slice(2)).number(['port', 'cors']).argv;
if (args.port) {
    exports.app.listen(args.port, function () {
        console.log("Server running on port ".concat(args.port));
    });
}
if (args.cors) {
    exports.corsApp.listen(args.cors, function () {
        console.log("CORS server running on port ".concat(args.cors));
    });
}
//# sourceMappingURL=server.js.map