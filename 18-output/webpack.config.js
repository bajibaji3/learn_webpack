const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        //文件名称（指定名称 + 目录）
        filename: "[name].js",
        //输出文件目录（将来所有资源输出的公共目录）
        path: resolve(__dirname, 'build'),
        //所有资源引入公共路径的前缀
        publicPath: "/",
        //非入口chunk的名称
        chunkFilename: "[name]_chunk.js",
        //整个库向外暴露的变量名
        library: ['name'],
        //变量名添加到哪个上   browser
        // libraryTarget: "window",
        //变量名添加到哪个上   node
        // libraryTarget: "global",
    },
    plugins: [
        new HtmlWebpackPlugin(),
    ],
    mode: "development", //开发模式
}