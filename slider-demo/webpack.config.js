const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
   devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
  entry:  __dirname + "/src/index.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public/js",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  },
  module: {
  	loaders: [
      {
      	test:/\.jsx?/,
      	exclude:/node_modules/,
      	loader:'babel-loader',
        query:{
          presets:['es2015','react']
        }
      },
      {
      	test: /\.s?css$/,
      	use:ExtractTextPlugin.extract({
              fallback:'style-loader',
              use:['css-loader','sass-loader'],
            }),
      },
  	]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/public/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
    }),
    new webpack.HotModuleReplacementPlugin(),//热加载插件
    new ExtractTextPlugin('[name]-[contenthash:8].css'),
  ],
   devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    inline: true,//实时刷新
	  port:8080
  } 
}