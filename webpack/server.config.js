const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { getWebpackDefinePlugin } = require('./utils')
const webpack = require('webpack')

module.exports = (env = {}) => {
  const isProd = !!env.prod
  return {
    mode: isProd ? 'production': 'development',
    entry: ['./src/server/index.js'],
    output: {
      path: path.resolve(__dirname, '../dist/server'),
      filename: 'server.js',
      publicPath: 'http://localhost:3001/static/'
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
          use: ['ignore-loader']
        }
      ],
    },
    resolve: {
      alias: {
        '@dist': path.resolve(__dirname, '../dist')
      },
      extensions: ['.js', '.json']
    },
    plugins: [
      new webpack.DefinePlugin(getWebpackDefinePlugin({
        __DEV__: !isProd,
        __PROD__: isProd,
        __SERVER__: true,
      }))
    ]
  }
}