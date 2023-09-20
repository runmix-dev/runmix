const path = require('path')

module.exports = {
  static: {
    directory: path.join(__dirname, '../dist/client/static')
  },
  port: process.env.DEV_CLIENT_PORT,
  hot: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
}