// @ts-check
import {Server} from 'http';
import karma from 'karma';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {screenshotApp, corsApp} from './server.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const karmaTestRunner = () =>
    new Promise((resolve, reject) => {
        const karmaConfig = karma.config.parseConfig(path.resolve(__dirname, '../karma.conf.js'), {});
        const server = new karma.Server(karmaConfig, (exitCode) => {
            if (exitCode > 0) {
                reject(`Karma has exited with ${exitCode}`);
            } else {
                resolve(undefined);
            }
        });
        server.on('run_complete', (_browsers, _results) => {
            server.stop();
        });
        server.start();
    });

/** @type {Server[]} **/
const servers: Server[] = [];

servers.push(screenshotApp.listen(8000));
servers.push(corsApp.listen(8081));

karmaTestRunner()
    .then(() => {
        servers.forEach((server) => server.close());
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
