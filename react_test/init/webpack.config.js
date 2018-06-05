let convert    = require("./convert");
let entry      = convert.filename;
let path       = require('path');
module.exports = {
  entry    : `./${entry}`,
  output   : {
    path      : path.resolve(__dirname),
    filename  : 'bundle.js',
    publicPath: '/assets/',
  },
  watch    : true,
  module   : {
    rules: [
      {
        test   : /.jsx?$/,
        include: [ path.resolve(__dirname) ],
        loader : 'babel-loader',
        options: {
          presets: [ 'env', 'react' ],
          plugins: [ 'transform-object-rest-spread', 'transform-runtime' ],
        },
      },
      {
        test   : /\.less$/,
        include: [ path.resolve(__dirname) ],
        use    : [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "less-loader" },
        ],
      },
    ],
  },
  devtool  : "cheap-module-source-map",
  node: {
    fs: "empty",
  },
};