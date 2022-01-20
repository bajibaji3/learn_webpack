/*
HMR: hot module replacement 热模块替换/模块热替换
    作用：一个模块发生变化，只会重新打包这一模块（不重新打包所有模块）
        提高构建速度

        样式文件：可以使用HMR，因为style-loader内部实现了
        js文件：默认不能使用HMR
        HTML文件：默认不能使用HMR，同时导致问题：HTML文件不能热更新了
            解决：修改entry入口，将HTML文件引入
            (HTML文件只有一个，因此HTML文件不用做HMR)
*/

//resolve用来拼接绝对路径的方法
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
缓存：
    babel缓存
      cacheDirectory: true
    文件资源缓存
        hash：每次webpack构建时会生成唯一的hash值
            问题：因为js和css同时使用一个hash值，如果从新打包会导致所有缓存失效（但是可能却只改动一个文件）
        chunkhash：根据chunk生成的hash值，如果打包来源于同一个chunk，那么hash值一样
            问题：js和css的hash值还是一样的，因为css是在js中被引入的，所以同属一个chunk
        contenthash：根据文件内容生成hash值，不同文件hash值一定不一样
 */

/*
tree shaking：去除无用代码
    前提：1、必须使用ES6模块化；2、开启production环境
    作用：减少代码体积

    在package.json中配置
        "sideEffects": false  //所有代码都没有副作用（都可以进行tree shaking）
            问题：可能会把css/@babel/polyfill(副作用)文件干掉
        "sideEffects": ["*.css"]
 */

module.exports = {
    //webpack配置
    //入口起点
    entry: ['./src/index.js', ',/src/index.html'],
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
                //使用多个loader用use
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
            },
            {
                //默认处理不了HTML中img标签的图片
                test: /\.(jpg|png|gif)$/,
                //使用一个loader
                //下载url-loader和file-loader
                loader: "url-loader",
                options: {
                    //图片大小小于8kb，就会被base64处理
                    //优点：减少请求数量（减轻服务器压力）
                    //缺点：文件体积变大（请求速度慢）
                    limit: 8 * 1024,
                    //问题：因为url-loader默认使用ES6模块化解析，而html-loader引入图片是commonjs
                    //解析时会出问题：[Object Module]
                    //解决：关闭url-loader的ES6模块化，使用commonjs解析
                    esModule: false,
                    //给图片进行重命名
                    //[hash:10]取图片的hash的前10位
                    //[ext]取文件原扩展名
                    name: '[hash:10].[ext]'
                },
                type: "javascript/auto"
            },
            {
                test: /\.html$/,
                //处理HTML中img标签的图片(负责引入这个图片，从而能被url-loader处理)
                loader: "html-loader",
                options: {
                    esModule: false,
                }
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

    //开发服务器 devServer：用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
    //特点：只会在内存中编译打包，不会有任何输出
    //启动devServer指令为：npx webpack serve
    devServer: {
        static: resolve(__dirname, 'build'),
        //启动gzip压缩
        compress: true,
        //端口号
        port: 3000,
        //自动打开浏览器
        open: true,
        //开启HMR
        hot: true,
        devtool: 'source-map'
    }
}

/*
source-map：一种提供源代码到构建后代码的映射技术 （如果构建后代码出错了，通过映射关系可以追踪到源代码错误）
[inline-|hidden-|eval-][nosources-][cheap-[module]]source-map
source-map: 外部
    错误代码的准确信息和源代码的错误位置
inline-source-map: 内联
    只生成一个内联source-map
    错误代码的准确信息和源代码的错误位置
hidden-source-map: 外部
    错误代码的错误原因，但没有错误位置
    不能追踪源代码错误，只能提示构建后代码的错误位置
eval-source-map: 内联
    每个文件都生成对应的source-map，都在eval
    错误代码的准确信息和源代码的错误位置
nosources-source-map: 外部
    错误代码的准确信息，但没有任何源代码信息
cheap-source-map: 外部
    错误代码的准确信息和源代码的错误位置
    只能精确到行
cheap-module-source-map: 外部
    错误代码的准确信息和源代码的错误位置
内联和外部的区别：1、外部生成了文件，内联没有；2、内联构建速度更快

开发环境：速度快，调试友好
    eval-source-map/eval-cheap-module-source-map

生成环境：源代码要不要隐藏，调试要不要更友好
内联会让代码体积变大，生产环境不用内联
    source-map/cheap-module-source-map
 */

