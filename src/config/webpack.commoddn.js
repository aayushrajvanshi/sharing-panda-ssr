const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const helpers = require('./helpers');

const NODE_ENV = process.env.NODE_ENV;
const isProd = NODE_ENV === 'production';

module.exports = {
  entry: {
    'app': [
      'script-loader!jquery/dist/jquery.min.js',
      'script-loader!uikit/dist/js/uikit.min.js',
      'script-loader!uikit/dist/js/uikit-icons.js',
      helpers.root('client/app/index.js')
    ]
  },

  externals: {
    jquery: 'jQuery',
    $: 'jQuery'
  },

  output: {
    path: helpers.root('dist'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.html'],
    alias: {
      'app': 'client/app'
    }
  },

  module: {
    rules: [
      // JS files
      {
        test: /\.(js|jsx)?$/,
        include: helpers.root('client'),
        loader: 'babel-loader'
      },

      // SCSS files
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                'sourceMap': true,
                'importLoaders': 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  autoprefixer
                ]
              }
            },
            'sass-loader'
          ]
        })
      }, {
        test: /\.(jpe?g|png|gif)$/i,
        use: [{
          loader: 'file-loader?hash=sha512&digest=hex&name=./images/[hash:9].[ext]'
        }, {
          loader: 'image-webpack-loader?bypassOnDebug=false'
        }]
      }, {
        test: /\.(woff|ttf|eot|woff2|svg)$/i,
        use: [{
          loader: 'file-loader?hash=sha512&digest=hex&name=./fonts/[name].[ext]'
        }]
      }
    ]
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    }),

    new HtmlWebpackPlugin({
      title: "Sharing Panda | India's Crowd Funding Website",
      favicon: helpers.root('client/public/favicon.png'),
      template: helpers.root('client/public/index.html'),
      inject: 'body'
    }),

    new ExtractTextPlugin({
      filename: 'css/[name].[hash].css',
      disable: !isProd
    }),

    new CopyWebpackPlugin([{
      from: helpers.root('client/public')
    }])
  ]
};
