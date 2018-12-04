const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack-common.config.js');

// required for babel, since babelrc uses NODE_ENV of the process
process.env.NODE_ENV = 'production';

module.exports = merge(common, {

    devtool: 'source-map',

    module: {
        loaders: [{
                test: /\.jsx?$/,
                include: [path.join(__dirname, 'src')],
                loader: 'babel'
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.BACKEND_BASE_URL': JSON.stringify(process.env.BACKEND_BASE_URL),
            '__REACT_HOT_LOADER__': undefined
        })
    ]
});