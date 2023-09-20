const path = require('path')
const AssetsPlugin = require('assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env = {}) => {
  const isProd = !!env.prod
  return {
    mode: isProd ? 'production': 'development',
    entry: ['./src/client.entry.jsx'],
    module: {
      rules: [
        {
          test: /\.jsx?$/i,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: isProd ? 'defaults, not ie 10-11': {esmodules: true}
                  }
                ],
                ['@babel/preset-react', {"runtime": "automatic"}]
              ]
            }
          },
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          type: 'asset/resource'
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
        }
      ]
    },
    output: {
      path: path.resolve(__dirname, '../dist/client/static'),
      filename: `bundle-[contenthash].${isProd ? 'js' : 'mjs'}`,
      chunkFilename: `[id].[chunkhash].${isProd ? 'js' : 'mjs'}`,
      publicPath: 'http://localhost:3001/static/'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].[chunkhash].css',
      }),
      new AssetsPlugin({
        filename: './dist/server/assets.json',
        fileTypes: [isProd ? 'js': 'mjs', 'css']
      })
    ]
  }
}