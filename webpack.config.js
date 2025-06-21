import path from 'node:path';
import url from 'node:url';
import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import pkg from './package.json' with {type: 'json'};

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const banner = `/*!
 * ${pkg.title} ${pkg.version}
 * Copyright (c) ${new Date().getFullYear()} ${pkg.author.name} <${pkg.author.url}>
 * Released under ${pkg.license} License
 */`;

const commonConfig = {
    mode: 'production',
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        library: {
            name: 'html2canvas',
            type: 'umd',
            umdNamedDefine: true,
            export: 'default'
        },
        globalObject: 'this'
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

const nonMinifiedConfig = {
    ...commonConfig,
    output: {
        ...commonConfig.output,
        filename: 'html2canvas.js'
    }
};

const esmConfig = {
    ...commonConfig,
    output: {
        ...commonConfig.output,
        filename: 'html2canvas.esm.js'
    }
    // ... ES module-specific configurations
};

const minifiedConfig = {
    ...commonConfig,
    output: {
        ...commonConfig.output,
        filename: 'html2canvas.min.js'
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: /^!/ // Preserve comments that start with `!`
                    }
                },
                extractComments: false
            })
        ]
    }
};

export default [esmConfig, nonMinifiedConfig, minifiedConfig];
