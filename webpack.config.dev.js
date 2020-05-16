const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');

module.exports = merge(baseConfig, {
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    watchContentBase: true,
    progress: true
  },
  module: {
    rules: [
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /(Select|View)\.(js|jsx)$/,
        use: {
          loader: 'string-replace-loader',
          options: {
            search: '/_constructor/img/',
            replace: 'img/',
            flags: 'g'
          }
        }
      },
      {
        test: /main\.(js|jsx)$/,
        use: {
          loader: 'string-replace-loader',
          options: {
            search: "import './main.scss';",
            replace: "import 'bootstrap/dist/css/bootstrap.min.css';import './OLD/stolpodnos.css';import './main.scss';",
            flags: 'g'
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
});
