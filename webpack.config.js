var webpack = require('webpack');
var path = require('path');
var OpenBrowserPlugin = require('open-browser-webpack-plugin'); //自动打开浏览器插件

module.exports = {
	// 配置服务器
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        contentBase: "./", //最好写上，否则报错，难道这里是一个坑？
        host: "0.0.0.0",
        port: 8084
    },
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, "dist"),
    	publicPath: "/dist/",	
		filename: 'app.bundle.js'
	},
	plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({ url: 'http://localhost:8084' })
    ]
}