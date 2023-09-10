const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/App.jsx',
  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        use: 'babel-loader'
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
  }
}