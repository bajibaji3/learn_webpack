const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
    entry: 入口起点
        1、string ---> './src/index.js'
            单入口
            打包生成一个chunk，输出一个bundle
            chunk名称默认值是 main
        2、array ---> ['./src/index.js', './src/add.js']
            多入口
            所有入口文件最终只会形成一个chunk，输出只有一个bundle文件
            ---> 只有在HMR功能中让HTML热更新生效
        3、object
            多入口
            有几个入口文件就生成几个chunk，输出几个bundle
            chunk的名称是key
*/
module.exports = {
    entry: './src/index.js',
    output: {
        filename: "[name].js",
        path: resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlWebpackPlugin(),
    ],
    mode: "development", //开发模式
}