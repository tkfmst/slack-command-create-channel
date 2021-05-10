/**
 * see https://webpack.js.org/concepts/
 */

/* eslint-disable */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const GasPlugin = require('gas-webpack-plugin');

module.exports = {
    devtool: false,
    mode: 'production',
    entry:
        // async, await使うのにpolyfillが必要
         ['@babel/polyfill', './src/main/main.ts'],
    plugins: [
        new BundleAnalyzerPlugin({
            // Do not run at build timm.
            analyzerMode: 'disabled',
        }),
        new GasPlugin(),
    ],
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: [
                    // it is executed from the bottom.
                    { loader: 'babel-loader' },
                    { loader: 'ts-loader' },
                ],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        // GCP Loggingにconsole.log出だすので消さない
                        drop_console: false,
                    },
                },
            }),
        ],
    },
    output: {
        library: {
            // gas-webpack-pluginはmain.jsがデフォルトになる
            // filename: 'do_post.js',
            name: 'DoPost',
            type: 'var',
        },
    },
};
