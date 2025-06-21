'use strict';
import { readFileSync, writeFileSync } from 'fs';
import { dirname, resolve, relative } from 'node:path';
import { sync } from 'glob';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
if (process.argv.length <= 2) {
    console.log('No ignore.txt file provided');
    process.exit(1);
}
if (process.argv.length <= 3) {
    console.log('No output file provided');
    process.exit(1);
}
const path = resolve(__dirname, '../', process.argv[2]);
const outputPath = resolve(__dirname, '../', process.argv[3]);
const ignoredTests = readFileSync(path)
    .toString()
    .split(/\r\n|\r|\n/)
    .filter((l) => l.length)
    .reduce((acc, l) => {
    const m = l.match(/^(\[(.+)\])?(.+)$/i);
    if (m) {
        acc[m[3]] = m[2] ? m[2].split(',') : [];
    }
    return acc;
}, {});
const files = sync('../tests/reftests/**/*.html', {
    cwd: __dirname,
    root: resolve(__dirname, '../../')
});
const testList = files.map((filename) => `/${relative('../', filename).replace(/\\/g, '/')}`);
writeFileSync(outputPath, [
    `export const testList: string[] = ${JSON.stringify(testList, null, 4)};`,
    `export const ignoredTests: {[key: string]: string[]} = ${JSON.stringify(ignoredTests, null, 4)};`
].join('\n'));
console.log(`${outputPath} updated`);
//# sourceMappingURL=create-reftest-list.js.map