const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: "[name].js",
        path: resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            //loader的配置
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(),
    ],
    mode: "development", //开发模式
    resolve: {
        alias: {
            $css: resolve(__dirname, 'src/css')
        },
        extensions: ['.js', '.json', '.css'],
        modules: [resolve(__dirname, '../../node_modules'), 'node_modules'],
    },
    optimization: {
        splitChunks: {
            chunks: "all",
            //分割的chunk最小为30kb
            minSize: 30 * 1024,
            //最大没有限制
            maxSize: 0,
            //要提取的chunk最少被引用1次
            minChunks: 1,
            //按需加载时并行加载的文件的最大数量
            maxAsyncRequests: 5,
            //入口js文件最大并行请求数量
            maxInitialRequests: 3,
            //名称连接符
            automaticNameDelimiter: "~",
            //可以使用命名规则
            name: true,
            cacheGroups: { //分割chunk的组
                //node_modules中的文件会被打包到vendors组的chunk中
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    //优先级
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    //如果当前要打包到的模块和之前已经被提取的模块是同一个，就会复用，不重新打包
                    reuseExistingChunk: true,
                }
            }
        }
    }
}