const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: { main: './src/index.js' },
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	devServer: {
		publicPath: '/',
		host: '192.168.100.3',
		port: 8080,
		proxy: {
		  '/api/**': {
			target: '192.168.100.3:8000',
			secure: false,
			changeOrigin: true,
		  }
		},
	  },
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.(s*)css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
				]
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				use: ['file-loader']
			},
			{
				test: /\.(ttf|woff|woff2|eot|svg)$/,
				use: ['file-loader']
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'main.css',
		})
	]
};
