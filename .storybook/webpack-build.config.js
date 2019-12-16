const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const path = require("path");

// module.exports = async ({ config, mode }) => {
//
// 	mode = 'development';
//
// 	config.module.rules.push({
// 		test: /\.css$/,
// 		use: [
// 			{
// 				loader: "postcss-loader",
// 				options: {
// 					ident: "postcss",
// 					plugins: [
// 						require("postcss-import"),
// 						require("tailwindcss"),
// 						require("autoprefixer")
// 					]
// 				}
// 			}
// 		],
// 		include: path.resolve(__dirname, "../")
// 	});
//
// 	return config;
// };

module.exports = {
	mode: 'development',
	entry: ['./app/sass/main.sass', './app/components/Button.vue'],

	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: "postcss-loader",
						options: {
							ident: "postcss",
							plugins: [
								require("postcss-import"),
								require("tailwindcss"),
								require("autoprefixer")
							]
						}
					}
				],
			},
			{
				test: /\.sass$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'build.min.css',
						}
					},
					{
						loader: 'extract-loader'
					},
					{
						loader: 'css-loader?-url'
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: 'sass-loader'
					},

				]
			},
			{
				test: /\.vue$/,
				use: [
						{
							loader: 'vue-loader'
						},
					]
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html',
		}),
		new VueLoaderPlugin(),
	]
}
