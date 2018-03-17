const webpack = require('webpack');
const path = require('path');

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
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                }
        ]
    }
}
