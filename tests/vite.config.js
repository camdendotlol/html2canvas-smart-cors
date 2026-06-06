import {defineConfig} from 'vite';
import path from 'node:path';
import pkg from '../package.json' with {type: 'json'};
import url from 'node:url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const banner = `/*
 * ${pkg.title} ${pkg.version}
 * Copyright (c) ${new Date().getFullYear()} ${pkg.author.name} <${pkg.author.url}>
 * Released under ${pkg.license} License
 */`;

export default defineConfig({
    build: {
        // Entry point
        lib: {
            entry: path.resolve(__dirname, 'testrunner.ts'),
            name: 'TestRunner',
            fileName: 'testrunner',
            formats: ['es'] // or ['umd', 'es'] if you need multiple formats
        },
        // Output directory
        outDir: 'build',
        // Generate source maps
        sourcemap: true,
        // Rollup options for more control
        rollupOptions: {
            output: {
                banner
            }
        }
    },
    resolve: {
        // File extensions are handled automatically by Vite for .ts, .js, .json
        extensions: ['.ts', '.js', '.json']
    }
});
