const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: './src/App.jsx',
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  output: {
    filename: 'app.[contenthash:8].js'
  },
  devServer: {
    client: {
      overlay: {
        warnings: false,
        errors: true,
      }
    }
  }
}