var vue = require('vue-loader')
var webpack = require('webpack')
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

var isPro = process.env.NODE_ENV === 'production';
var publicPath = isPro?'./':'/build/';
var filename = isPro?'bund/[name].[chunkHash:8].js':'bund/[name].js';

var plugin=[
	new webpack.optimize.CommonsChunkPlugin({
	       names: ['vendor']
	}),
	new ExtractTextPlugin('style.css',{
 		allChunks:true
 	}),
 	new HtmlWebpackPlugin({
        template: path.join(__dirname, 'src/index.html'),
        filename: (isPro?'index.html':'../index.html')
    })
];

if(isPro){
 	plugin = [
	    
	    //压缩js
	    new webpack.optimize.UglifyJsPlugin({
	      compress: {
	        warnings: false
	      }
	    }),
	    //为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
	    new webpack.optimize.OccurenceOrderPlugin(),
	   
	    //把指定文件夹下的文件复制到指定的目录
	    new TransferWebpackPlugin([
	      {from: 'js',to:'js'},
	      //{from: 'images/bank',to:'images/bank'}
	    ], path.resolve(__dirname)),

 	].concat(plugin);

}


module.exports = {
	entry:{
		app:'./src/app.js',
		/* babel-polyfill  解决安卓4+版本不渲染造成白屏问题
		 Babel默认只转换新的JavaScript句法（syntax），而不转换新的API，比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。*/
		vendor:['vue','vue-resource','vue-router','vuex','babel-polyfill']
	},
	output:{
		path:'./build',
		publicPath: publicPath,
		filename: filename,
		chunkFilename: "bund/chunk/[name].[chunkHash:8].js",
	},
	
	resolve: {
		//导入无需加入后缀名
	    extensions: ['', '.js', '.vue'],
	    //别名
	    alias: {
	      'vue': 'vue/dist/vue.js'
	    }
	  },
	resolveLoader: {
	    root: path.join(__dirname, 'node_modules')
	 },
	module:{
		loaders:[
			{
				test: /\.css$/,
				// loader: "style!css!less"
				loader: ExtractTextPlugin.extract('style', ['css'])
			},
			{
				test: /\.less$/,
				// loader: "style!css!less"
				loader: ExtractTextPlugin.extract('style', ['css','less'])
			},
			{
				test:/\.vue$/,
				loader:'vue',
			},
			{
				test:/\.js$/,
				// excluding some local linked packages.
		        // for normal use cases only node_modules is needed.
		        exclude: /node_modules|vue\/src|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
				loader:'babel'
			},
			{
		        test: /\.json$/,
		        loader: 'json'
		     },

			//图片文件使用 url-loader 来处理，小于8kb的直接转为base64
      		{ test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=images/[name].[ext]'}
		]
	},
	vue:{
		loaders: {
	      // less: 'style!css!less',
	       css: ExtractTextPlugin.extract('vue-style-loader', 'css-loader')
	    }
	},
	babel: {
	    presets: ['es2015',"stage-2"],
	    plugins: ['transform-runtime']
	 },
	plugins:plugin
}

//展示源文件错误追踪
!isPro && (module.exports.devtool = '#source-map');