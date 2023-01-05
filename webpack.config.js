const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, './dist')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,    // add |ts
                exclude: /node_modules/,
                
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: ['style-loader', 'css-loader']
                
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'], 
        fallback : {
            "crypto": require.resolve("crypto-browserify"),
            "http": require.resolve("stream-http") ,
            "https": require.resolve("https-browserify") ,
            "stream": require.resolve("stream-browserify") 
        }// add .tsx, .ts
    },
    plugins: [
        new MiniCssExtractPlugin(),
    ],
    devtool: "eval-cheap-source-map" ,

    
}