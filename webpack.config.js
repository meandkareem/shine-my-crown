const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: path.join(__dirname, "assets"),
  entry: {
    main: ["./js/main"]
  },
  output: {
    path: path.join(__dirname, "public/assets"),
    publicPath: "/assets",
    filename: "[name].js"
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
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract([ // not working with "use" keyword
            { loader: "css-loader", options: { minimize: true } },
            { loader: "postcss-loader" },
            { loader: "sass-loader" }
        ])
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({ filename: "style.css" }),
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
