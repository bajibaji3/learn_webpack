/*
* webpack.config.js   webpack的配置文件
*   作用：指示webpack干哪些活（当运行webpack指令时，会加载里面的配置）
*   所有的构建工具都是基于nodejs平台运行的--模块化默认采用commonjs
* */

//resolve用来拼接绝对路径的方法
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //webpack配置
    //入口起点
    entry: './src/index.js',
    //输出
    output: {
        //输出文件名
        filename: "built.js",
        //输出路径
        //__dirname  nodejs的变量，代表当前文件的目录的绝对路径
        path: resolve(__dirname, 'build')
    },
    //loader的配置
    module: {
        rules: [
            //详细loader配置
            {
                //匹配哪些文件
                //不同类型的文件必须配置不同的loader处理
                test: /\.css$/,
                //使用哪些loader进行处理
                use: [
                    //loader执行顺序，从右到左 从上到下 依次执行
                    //创建style标签，将js中的样式资源插入进去，添加到header中生效
                    'style-loader',
                    //将css文件变成commonjs模块加载js中，里面的内容是样式字符串
                    'css-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    //将less文件编译成css文件
                    //需要下载less-loader和less
                    'less-loader',
                ]
            }
        ]
    },
    //plugins的配置
    plugins: [
        //详细plugins配置
        //html-webpack-plugin
        //作用：默认创建一个空的HTML文件，自动引入打包输出的所有资源（js/css）
        new HtmlWebpackPlugin({
            //复制 "./src/index.html" 文件，并自动引入打包输出的所有资源（js/css）
            template: "./src/index.html"
        })
    ],
    //模式
    mode: "development", //开发模式
    // mode: "production"
}

