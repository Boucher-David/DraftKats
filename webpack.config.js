const webpack = require('webpack');
const path = require('path');
const ExtractPlugin = require('extract-text-webpack-plugin');
require('dotenv').config();


module.exports = {
    entry: './client/App.js',
    output: {
        // Webpack prefers an absolute path:
        path: path.resolve(__dirname, './bundle/'),
        filename: 'bundle.js'
    },
    devServer: {
        inline:true,
        port: process.env.WEBPACK_PORT
      },
    watch: true,
    module: {
        rules: [
            {
                test: /\.scss$/,
                loader: ExtractPlugin.extract({
                    // These get loaded in reverse order and the output of one pipes into the other (think of a then)
                    use: [
                        {
                            loader: 'css-loader', 
                            options: {
                                sourceMap:true
                            }
                        },
                        'resolve-url-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                includePaths:[`${__dirname}/client/styles/`]
                            }
                        }
                    ]
                })
            },
            {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                }
        ]
    }
}
