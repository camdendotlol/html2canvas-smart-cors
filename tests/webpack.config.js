import path from 'node:path';
import webpack from 'webpack';
import pkg from '../package.json' with {type: 'json'};
import url from 'node:url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const banner = `/*
 * ${pkg.title} ${pkg.version}
 * Copyright (c) ${new Date().getFullYear()} ${pkg.author.name} <${pkg.author.url}>
 * Released under ${pkg.license} License
 */`;

export default {
    mode: 'production', // or 'development'
    entry: './tests/testrunner.ts',
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'testrunner.js'
    },
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                use: 'json-loader',
                type: 'javascript/auto'
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin(banner),
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map'
        })
    ]
};
