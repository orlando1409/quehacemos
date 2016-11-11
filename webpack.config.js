const webpack = require('webpack'),
path = require('path'),
fs = require('fs'),
HtmlWebpackPlugin = require('html-webpack-plugin'),
CopyWebpackPlugin = require('copy-webpack-plugin');


const config = {
	entry: [
		'./index.js'
	],
	module: {
		loaders: [

		]
	},
	
	resolve: {
		modulesDirectories:['node_modules','./components'],
		extensions: [
			'',
			'.js',
			'.css'
		]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/bundle.js'
	},
	plugins: [

		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './index.html'),
			hash: true,
			filename: './index.html',
			inject: 'body'
		}),

		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			}
		}),
	]
};

	/*
	This config is for webpack-dev-server so overwrite the output path
	and add hotloader and server config
	*/
	config.devtool = "source-map";
	config.output.path = path.resolve(__dirname, '/');
	config.entry.push('whatwg-fetch');
	config.entry.push('webpack-dev-server/client?http://localhost:3000');
	config.entry.push('webpack/hot/dev-server');

	config.plugins.push(
		new webpack.HotModuleReplacementPlugin()
	);
	config.devServer = {
		contentBase: __dirname,
		hot: true,
		port: 3000
	};

module.exports = config;
