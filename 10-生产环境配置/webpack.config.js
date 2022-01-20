//resolve用来拼接绝对路径的方法
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//设置nodejs环境变量,使postcss-loader默认开发环境
process.env.NODE_ENV = 'development'

const commonCssLoader = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
        loader: "postcss-loader",
        options: {
            ident: 'postcss',
            plugins: () => [
                require('postcss-preset-env')()
            ]
        }
    }
]

module.exports = {
    //webpack配置
    //入口起点
    entry: './src/js/index.js',
    //输出
    output: {
        //输出文件名,指定入口文件输出到js目录下
        filename: "js/built.js",
        //输出路径
        //__dirname  nodejs的变量，代表当前文件的目录的绝对路径
        path: resolve(__dirname, 'build')
    },
    //loader的配置
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [...commonCssLoader]
            },
            {
                test: /\.less$/,
                use: [...commonCssLoader, 'less-loader']
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
                    name: '[hash:10].[ext]',
                    //指定图片输出到imgs目录下
                    outputPath: 'imgs',
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
        }),
        new MiniCssExtractPlugin({
            filename: 'css/built.css'
        }),
    ],
    //模式
    mode: "development", //开发模式
    // mode: "production"
}

