import cors from 'cors';
import express from 'express';
import filenamifyUrl from 'filenamify-url';
import fs from 'fs';
// @ts-ignore
import proxy from 'html2canvas-proxy';
import { mkdirp } from 'mkdirp';
import { dirname, resolve } from 'node:path';
import serveIndex from 'serve-index';
import { fileURLToPath } from 'node:url';
import yargs from 'yargs';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const app = express();
app.use('/', serveIndex(resolve(__dirname, '../'), { icons: true }));
app.use([/^\/src($|\/)/, '/'], express.static(resolve(__dirname, '../')));
export const corsApp = express();
corsApp.use('/proxy', proxy());
corsApp.use('/cors', cors(), express.static(resolve(__dirname, '../')));
corsApp.use('/', express.static(resolve(__dirname, '.')));
export const screenshotApp = express();
screenshotApp.use(cors());
screenshotApp.use((req, _res, next) => {
    // IE9 doesn't set headers for cross-domain ajax requests
    if (typeof req.headers['content-type'] === 'undefined') {
        req.headers['content-type'] = 'application/json';
    }
    next();
});
screenshotApp.use(express.json({
    limit: '15mb',
    type: '*/*'
}));
const prefix = 'data:image/png;base64,';
const screenshotFolder = '../tmp/reftests';
const metadataFolder = '../tmp/reftests/metadata';
mkdirp.sync(resolve(__dirname, screenshotFolder));
mkdirp.sync(resolve(__dirname, metadataFolder));
const writeScreenshot = (buffer, body) => {
    const filename = `${filenamifyUrl(body.test.replace(/^\/tests\/reftests\//, '').replace(/\.html$/, ''), {
        replacement: '-'
    })}!${[process.env.TARGET_BROWSER, body.platform.name, body.platform.version].join('-')}`;
    fs.writeFileSync(resolve(__dirname, screenshotFolder, `${filename}.png`), buffer);
    return filename;
};
screenshotApp.post('/screenshot', (req, res) => {
    if (!req.body || !req.body.screenshot) {
        return res.sendStatus(400);
    }
    const buffer = Buffer.from(req.body.screenshot.substring(prefix.length), 'base64');
    const filename = writeScreenshot(buffer, req.body);
    fs.writeFileSync(resolve(__dirname, metadataFolder, `${filename}.json`), JSON.stringify({
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
screenshotApp.use((error, _req, _res, next) => {
    console.error(error);
    next();
});
const args = yargs(process.argv.slice(2)).number(['port', 'cors']).argv;
if (args.port) {
    app.listen(args.port, () => {
        console.log(`Server running on port ${args.port}`);
    });
}
if (args.cors) {
    corsApp.listen(args.cors, () => {
        console.log(`CORS server running on port ${args.cors}`);
    });
}
//# sourceMappingURL=server.js.map