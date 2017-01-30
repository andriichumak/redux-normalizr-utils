const path = require('path');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
	devtool: null,
	context: __dirname,
	entry: [
		'./src/index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '',
		filename: `redux-normalizr-utils${isProduction ? '.min' : ''}.js`
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules|__tests__/,
				loader: 'babel'
			}
		]
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin()
	]
};
