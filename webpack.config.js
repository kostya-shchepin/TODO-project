const path = require('path') // Импортируем модуль "path" для работы с путями файлов
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
	entry: './src/index.js', // Точка входа для сборки проекта

	output: {
		filename: 'bundle.js', // Имя выходного файла сборки
		path: path.resolve(__dirname, 'dist'), // Путь для выходного файла сборки
		clean: true,
	},

	module: {
		rules: [
			{
				test: /\.(css)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
			},
			{
				test: /\.(less)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
			},
			{ test: /\.(js)$/, use: 'babel-loader' },
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
	],

	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'), // Каталог для статики
		},
		open: true, // Автоматически открывать браузер
	},

	mode: 'development', // Режим сборки
}
