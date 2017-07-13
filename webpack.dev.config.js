const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: ['./assets/js/main.js', './assets/sass/main.scss'],
  output: {
    filename: './assets/all.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: { presets: ['es2015'] }
      },
      {
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'postcss-loader', 'sass-loader'])
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: './assets/all.css',
      allChunks: true,
    }),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      comments: false,
    }),
  ],

  devServer: {
    port: 3000,
    inline: true,
    stats: 'minimal'
  },
};
