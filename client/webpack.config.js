const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./src/index'],
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    devServer: {
        disableHostCheck: true,
        contentBase: __dirname + '/src',
        historyApiFallback: true,
        hot: true,
        overlay: {
            errors: true,
            warnings: true,
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:8888'),
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
    ],
};
