const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack-common.config.js');

module.exports = merge(common, {
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server'
        ]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: [
                    path.join(__dirname, 'src')
                ],
                loader: 'babel'
            }
        ]
    },
    devServer: {
        contentBase: './dist',
        hot: true,
        // redirect 404s to index
        historyApiFallback: true,
        port: 8080,
        proxy: {
            '/api/v1/*': {
                target: 'http://localhost:8081/',
                secure: false
            },
            '/oauth/token': {
                target: 'http://localhost:8081/',
                secure: false
            },
            '/stomp/*': {
                target: 'ws://localhost:8081',
                ws: true
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
});
