module.exports = [
  {
    mode: 'development',
    entry: ['./src/client.entry.jsx'],
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
    output: {
      filename: 'app.js'
    }
  },
  {
    mode: 'development',
    entry: ['./src/server.entry.mjs'],
    output: {
      filename: 'server.js'
    },
    target: 'node',
    module: {
      rules: [
        {
          test: /\.(jsx|mjs|js)$/i,
          use: ['babel-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg)$/,
          type: 'asset/resource'
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ],
    },
  }
]