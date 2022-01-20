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
    devServer: {
        //运行代码的目录
        static: resolve(__dirname, 'build'),
        //启动gzip压缩
        compress: true,
        //端口号
        port: 5000,
        //域名
        host: 'localhost',
        //自动打开浏览器
        open: true,
        //开启HMR
        hot: true,
        //服务器代理 ---> 解决跨域问题
        proxy: {
            //一旦devServer(5000)服务器接收到 /api/xxx 的请求，就会把请求转发到另一个服务器(3000)
            '/api': {
                target: 'http://localhost:3000',
                //发送请求时，请求路径重写，将 /api/xxx ---> /xxx
                pathRewrite: {
                   '^/api': ''
                }
            }
        }
    }
}