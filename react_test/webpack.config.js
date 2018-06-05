let path                           = require('path');
let webpack                        = require('webpack');
let { ProvidePlugin }              = require('webpack');
let { HotModuleReplacementPlugin } = require('webpack');
let { SourceMapDevToolPlugin }     = require('webpack');

module.exports = {
  entry    : './www/app/main.js',
  output   : {
    path      : path.resolve(__dirname, './www/dist'),
    filename  : 'bundle.js',
    publicPath: '/dist/',
  },
  watch    : true,
  module   : {
    rules: [
      {
        test   : /\.jsx?$/,
        include: [ path.resolve(__dirname, './www/app') ],
        exclude: [ path.resolve(__dirname, './node_modules') ],
        loader : 'babel-loader',
        options: {
          presets: [ 'env', 'react' ],
          plugins: [ 'transform-object-rest-spread', 'transform-runtime' ],
        },
      },
      {
        test   : /\.less$/,
        include: [ path.resolve(__dirname, './www/app') ],
        exclude: [ path.resolve(__dirname, './node_modules') ],
        use    : [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader : "less-loader",
            options: {
              javascriptEnabled: true,
              paths            : [ path.resolve(__dirname, "./node_modules") ],
            },
          },
        ],
      },
    ],
  },
  resolve  : { extensions: [ '*', '.less', '.js' ] },
  devtool  : "cheap-module-source-map",
  // devtool  : "source-map",
  // plugins  : [
  //   // new ProvidePlugin({}),
  //   // new HotModuleReplacementPlugin(),
  //   // new SourceMapDevToolPlugin(),
  // ],
  // devServer: {
  //   //我们在这里对webpack-dev-server进行配置
  //
  //   contentBase       : './www',
  //   historyApiFallback: true,
  //   inline            : true,
  //   // hot               : true,
  //   port              : 8080,
  //   open              : true,
  // },
};

// "devw": "webpack-dev-server --config webpack.config.js --mode development",
//    "devw": "webpack-dev-server --config webpack.config.js --inline --hot --content-base ./www --port 8080 --mode development --open",