const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const package_version = require(path.resolve(__dirname, 'package.json')).version;

module.exports = {
    entry: './server/index.tsx',
    target: 'node',
    externals: [nodeExternals()],
    output: {
        path: path.resolve('server-build'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                use: 'babel-loader'
            },
            {
                test: /\.svg$/,
                loader: 'svg-url-loader'
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            webapp: path.resolve(__dirname, 'src/')
        },
        fallback: {
            path: 'path-browserify',
        }
    }
};