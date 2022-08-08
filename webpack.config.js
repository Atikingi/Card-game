const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const mode =
   process.env.NODE_ENV === 'production' ? 'production' : 'development';
const sourceMapMode =
   process.env.NODE_ENV === 'production' ? 'hidden-source-map' : 'source-map';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
   entry: './src/index.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      clean: true,
   },
   mode,
   module: {
      rules: [
         { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
         {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
         },
         {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
         },
      ],
   },
   optimization: {
      minimizer: ['...', new CssMinimizerPlugin()],
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, './src/index.html'),
         filename: 'index.html',
      }),
      new CopyPlugin({
         patterns: [{ from: 'public', to: 'public' }],
      }),
      new MiniCssExtractPlugin(),
   ],
   devtool: sourceMapMode,
};
