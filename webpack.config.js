const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
  },

  output: {
    publicPath: '/',
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
  },


  mode: "development",

  devServer: {
    writeToDisk: true,
    contentBase: path.join(__dirname, '/dist'),
    port: 9000,
  },

  module: {
    rules: [
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            }
          }
        ]
      },

      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },

      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: '[name].[ext]',
              outputPath: "images",
            }
          }
        ]
      },

      {
        test: /\.(svg|eot|woff|woff2|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts'
            }
          }
        ]
      },

      {
        test: require.resolve('jquery'),
        loader: 'expose-loader',
        options: {
          exposes: ['$', 'jQuery'],
        },
      },
      
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),

    new HtmlWebpackPlugin({
      filename: "product.html",
      template: "./src/product.html",
    }),

    new HtmlWebpackPlugin({
      filename: "checkout.html",
      template: "./src/checkout.html",
    }),

    new HtmlWebpackPlugin({
      filename: "payment.html",
      template: "./src/payment.html",
    }),

    new HtmlWebpackPlugin({
      filename: "search.html",
      template: "./src/search.html",
    }),

    new MiniCssExtractPlugin({
      filename: "css/style.css"
    }),

    

    new CssMinimizerPlugin({}),

  ],


};