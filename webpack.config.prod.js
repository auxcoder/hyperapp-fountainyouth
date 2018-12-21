const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const webpack = require('webpack');

const OUTPUT_DIR = './build';

const plugins = [
  new HtmlWebpackPlugin({
    title: 'Hyperapp One',
    template: './src/index.html',
    filename: path.join(__dirname, './index.html'),
  }),
  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'defer',
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[hash]css',
    chunkFilename: '[id].css',
  }),
  new UglifyJsPlugin(),
  new MinifyPlugin(),
  new webpack.optimize.ModuleConcatenationPlugin(),
];

module.exports = () => ({
  entry: ['./src/index.js', './styles/app.css'],
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, OUTPUT_DIR),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, './')],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins,
});
