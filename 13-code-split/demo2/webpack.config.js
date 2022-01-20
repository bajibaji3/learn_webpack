
//resolve用来拼接绝对路径的方法
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    //webpack配置
    //单入口
    // entry: './src/js/index.js',
    entry: {
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
    //1、可以将node_modules中的代码单独打包成一个chunk最终输出
    //2、可以自动分析多入口chunk中有没有公共的文件，如果有会打包成一个单独的chunk
    optimization: {
        splitChunks: {
            chunks: "all0"
        }
    },
    //模式
    // mode: "development", //开发模式
    mode: "production"
}

