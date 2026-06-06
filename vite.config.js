import {defineConfig} from 'vite';
import {resolve} from 'path';
import pkg from './package.json' with {type: 'json'};

const banner = `/*!
 * ${pkg.title} ${pkg.version}
 * Copyright (c) ${new Date().getFullYear()} ${pkg.author.name} <${pkg.author.url}>
 * Released under ${pkg.license} License
 */`;

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'html2canvas',
            formats: ['es', 'umd'],
            fileName: (format) => {
                if (format === 'es') return 'html2canvas.esm.js';
                if (format === 'umd') return 'html2canvas.js';
            }
        },
        outDir: 'dist',
        sourcemap: true,
        rollupOptions: {
            output: [
                {
                    format: 'es',
                    entryFileNames: 'html2canvas.esm.js',
                    banner
                },
                {
                    format: 'umd',
                    name: 'html2canvas',
                    entryFileNames: 'html2canvas.js',
                    banner,
                },
                {
                    format: 'umd',
                    name: 'html2canvas',
                    entryFileNames: 'html2canvas.min.js',
                    banner
                }
            ]
        },
        minify: true
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    esbuild: {
        banner,
        legalComments: 'inline'
    }
});
