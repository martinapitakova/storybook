const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const path = require("path");
const createCompiler = require('@storybook/addon-docs/mdx-compiler-plugin');

module.exports = async ({ config, mode }) => {

	mode = 'development';

	config.module.rules.push({
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
		include: path.resolve(__dirname, "../")
	});

	config.module.rules.push({
		test: /\.mdx$/,
		use: [
			{
				loader: 'babel-loader',
			},
			{
				loader: '@mdx-js/loader',
				options: {
					compilers: [createCompiler({})],
				},
			},
		],
	});

	config.module.rules.push({
		test: /\.(stories|story)\.[tj]sx?$/,
		loader: require.resolve('@storybook/source-loader'),
		exclude: [/node_modules/],
		enforce: 'pre',
	});

	return config;
};

//configure(require.context('../src/stories', true, /\.stories\.(js|mdx)$/), module);

// module.exports = {
// 	mode: 'development',
// 	entry: ['./app/sass/main.sass', './app/components/Button.vue'],
//
// 	module: {
// 		rules: [
// 			{
// 				test: /\.css$/,
// 				use: [
// 					{
// 						loader: "postcss-loader",
// 						options: {
// 							ident: "postcss",
// 							plugins: [
// 								require("postcss-import"),
// 								require("tailwindcss"),
// 								require("autoprefixer")
// 							]
// 						}
// 					}
// 				],
// 			},
// 			{
// 				test: /\.sass$/,
// 				use: [
// 					{
// 						loader: 'file-loader',
// 						options: {
// 							name: 'build.min.css',
// 						}
// 					},
// 					{
// 						loader: 'extract-loader'
// 					},
// 					{
// 						loader: 'css-loader?-url'
// 					},
// 					{
// 						loader: 'postcss-loader'
// 					},
// 					{
// 						loader: 'sass-loader'
// 					},
//
// 				]
// 			},
// 			{
// 				test: /\.vue$/,
// 				use: [
// 						{
// 							loader: 'vue-loader'
// 						},
// 					]
// 			},
// 		]
// 	},
// 	plugins: [
// 		new HtmlWebpackPlugin({
// 			template: './index.html',
// 		}),
// 		new VueLoaderPlugin(),
// 	]
// }
