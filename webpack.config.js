const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractextPlugin = require('extract-text-webpack-plugin');

let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

module.exports = {
    //入口
    entry: {
        'index': ['./src/app.jsx']
    },
    output: {
        //生成文件的路径
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/app.js',
        //访问路径
        publicPath: WEBPACK_ENV == 'dev' ? '/dist/' : 's.zjlssr.xyz/mmall-admin/dist/',
    },
    //配置别名
    resolve: {
        alias: {
            page: path.resolve(__dirname, 'src/page'),
            component: path.resolve(__dirname, 'src/component'),
            util: path.resolve(__dirname, 'src/util'),
            service: path.resolve(__dirname, 'src/service'),
        }
    },
    //webpack-dev-server配置
    devServer: {
        //配置根目录为dist
        contentBase: __dirname + '/dist',
        compress: true,
        port: 9500,
        inline: true,
        // 如果页面404 则跳转到配置的页面
        historyApiFallback: {
            index: '/dist/index.html'
        },
        proxy: [{
            context: ['/manage'],
            target: 'http://45.77.242.206:8080/mmall/',
            changeOrigin: true,
            //重写cookie 路径  --- http-proxy-middleware
            cookiePathRewrite: {
                '/mmall/': '/'
            }
        }]
    },
    module: {
        rules: [
            //使用babel转换jsx(react)文件
            {
                test: /\.jsx$/,
                //不做处理的文件目录
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        //babel-preset-env , babel-preset-react
                        presets: ['env', 'react']
                    }
                }
            },
            //css文件的处理
            {
                test: /\.css$/,
                use: ExtractextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            //sass文件的处理
            {
                test: /\.scss$/,
                use: ExtractextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            //图片等文件资源的处理
            {
                test: /\.(png|jpg|gif|woff|woff2|svg|eot|ttf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 20,
                        name: 'resource/[name].[ext]'
                    }
                }]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/view/index.html',
            filename:'view/index.html',
            favicon: './favicon.ico'
        }),
        //单独打包css文件
        new ExtractextPlugin({
            filename: 'css/[name].css',
        }),
        //提取公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        })
    ]
}