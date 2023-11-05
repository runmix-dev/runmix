const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path')

module.exports = (env = {}) => {
  const isProd = !!env.prod
  return {
    mode: isProd ? 'production': 'development',
    entry: ['./src/spa.entry.jsx'],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: [!isProd && 'react-refresh/babel'].filter(Boolean),
                presets: [
                  ['@babel/preset-react', { runtime: 'automatic' }],
                ],
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          type: 'asset/resource'
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
        }
      ],
    },
    resolve: {
      extensions: ['.js', '.json', '.jsx'],
      alias: {
        '@components': path.resolve(__dirname, '../src/components'),
      }
    },
    output: {
      path: path.resolve(__dirname, '../dist-spa'),
      filename: '[chunkhash].app.js',
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].[chunkhash].css',
      }),
      !isProd && new ReactRefreshWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../public/index.html'),
        title: 'RunJS Home Page',
      }),
    ].filter(Boolean),
    cache: isProd ? { 
      type: 'filesystem',
      cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/webpack-spa'),
    } : false,
    devServer: isProd ? {}: {
      static: [
        {
          directory: path.resolve(__dirname, '../dist-spa'),
        },
        {
          directory: path.resolve(__dirname, '../public'),
        },
      ],
      client: {
        overlay: {
          warnings: false,
          errors: true,
        },
      },
      compress: true,
      port: 9000,
      hot: 'only',
      historyApiFallback: true,
    },
  }
}