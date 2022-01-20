
//resolve用来拼接绝对路径的方法
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    //webpack配置
    //单入口: 最终输出一个文件---->单页面应用
    // entry: './src/js/index.js',
    //入口起点
    entry: {
        //多入口: 有几个入口就输出几个文件---->多页面应用
        main: './src/js/index.js',
        test: ',/src/js/test.js'
    },
    //输出
    output: {
        //输出文件名
        //[name]：取文件名
        filename: "js/[name].[contenthash:10].js",
        //输出路径
        //__dirname  nodejs的变量，代表当前文件的目录的绝对路径
        path: resolve(__dirname, 'build')
    },
    //plugins的配置
    plugins: [
        new HtmlWebpackPlugin({
            //复制 "./src/index.html" 文件，并自动引入打包输出的所有资源（js/css）
            template: "./src/index.html"
        })
    ],
    //模式
    // mode: "development", //开发模式
    mode: "production"
}

