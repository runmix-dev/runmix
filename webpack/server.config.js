const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { getWebpackDefinePlugin, getDevPublicPath } = require('./utils')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env = {}) => {
  const isProd = !!env.prod
  return {
    mode: isProd ? 'production': 'development',
    entry: ['./src/server/index.js'],
    output: {
      path: path.resolve(__dirname, '../dist/server'),
      filename: 'server.js',
      publicPath: getDevPublicPath(isProd)
    },  
    target: 'node',
    externalsPresets: { node: true },
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.(jsx|mjs|js)$/i,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', {targets: {node: 'current'}}],
                ['@babel/preset-react', {"runtime": "automatic"}]
              ]
            }
          },
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          type: 'asset/resource',
          generator: {
            emit: false
          }
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
          generator: {
            emit: false
          }
        }
      ],
    },
    resolve: {
      alias: {
        '@dist': path.resolve(__dirname, '../dist'),
        '@components': path.resolve(__dirname, '../src/components'),
      },
      extensions: ['.js', '.json', '.jsx']
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].[chunkhash].css',
      }),
      new webpack.DefinePlugin(getWebpackDefinePlugin({
        __DEV__: !isProd,
        __PROD__: isProd,
        __SERVER__: true,
      }))
    ],
    cache: isProd ? { type: 'filesystem' } : false,
  }
}