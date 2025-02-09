'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var glob_1 = require("glob");
if (process.argv.length <= 2) {
    console.log('No ignore.txt file provided');
    process.exit(1);
}
if (process.argv.length <= 3) {
    console.log('No output file provided');
    process.exit(1);
}
var path = (0, path_1.resolve)(__dirname, '../', process.argv[2]);
var outputPath = (0, path_1.resolve)(__dirname, '../', process.argv[3]);
var ignoredTests = (0, fs_1.readFileSync)(path)
    .toString()
    .split(/\r\n|\r|\n/)
    .filter(function (l) { return l.length; })
    .reduce(function (acc, l) {
    var m = l.match(/^(\[(.+)\])?(.+)$/i);
    if (m) {
        acc[m[3]] = m[2] ? m[2].split(',') : [];
    }
    return acc;
}, {});
var files = (0, glob_1.sync)('../tests/reftests/**/*.html', {
    cwd: __dirname,
    root: (0, path_1.resolve)(__dirname, '../../')
});
var testList = files.map(function (filename) { return "/".concat((0, path_1.relative)('../', filename).replace(/\\/g, '/')); });
(0, fs_1.writeFileSync)(outputPath, [
    "export const testList: string[] = ".concat(JSON.stringify(testList, null, 4), ";"),
    "export const ignoredTests: {[key: string]: string[]} = ".concat(JSON.stringify(ignoredTests, null, 4), ";")
].join('\n'));
console.log("".concat(outputPath, " updated"));
//# sourceMappingURL=create-reftest-list.js.map