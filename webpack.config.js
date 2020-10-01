const path = require('path');
const htmlWebpackPlugins = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

let plugins = [];

plugins.push(new miniCssExtractPlugin({
    filename: 'app.min.css',
}));

plugins.push(new webpack.ProvidePlugin({
    $: 'jquery/dist/jquery.min.js',
    jQuery: 'jquery/dist/jquery.min.js'
}))

plugins.push(new htmlWebpackPlugins({
    hash: true,
    // minify: {
    //     html5: true,
    //     collapseWhitespace: true,
    //     removeComments: true
    // },
    filename: 'index.html',
    template: __dirname + '/src/index.html'
}));

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'app.min.js',
        path: path.resolve(__dirname + '/dist'),
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/](jquery|bootstrap)[\\/]/,
                    chunks: 'all'
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                loader: [miniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    plugins
}