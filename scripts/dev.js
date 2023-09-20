require('dotenv').config()
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const nodemon = require('nodemon')

const clientConfig = require('../webpack/client.config')()
const serverConfig = require('../webpack/server.config')()
const devOptions = require('../webpack/dev-server.config')

let clientAssetsInitialized = false
let nodemonInitialized = false

const clientCompiler = webpack(clientConfig)
const serverCompiler = webpack(serverConfig)
clientCompiler.hooks.afterEmit.tap('clientAfterEmitPlugin', () => {
  console.info('[webpack] client assets emitted')
  if (!clientAssetsInitialized) {
    clientAssetsInitialized = true
    serverCompiler.hooks.afterEmit.tap('serverAfterEmitPlugin', () => {
      console.info('[webpack] server assets emitted')
      if (!nodemonInitialized) {
        nodemonInitialized = true
        console.info('[nodemon] starting')
        nodemon({
          script: 'dist/server/server',
          ext: 'js json',
          watch: ['dist/server/server.js'],
        })
          .on('start', () => {
            console.info(
              `[nodemon] started. Now starting local web server at port 8080`
            )
          })
          .on('crash', () => {
            console.error('[nodemon] crashed')
          })
      }
    })
    serverCompiler.watch({}, (err, stats) => {
      if (err) {
        return console.error(err)
      }
      const statString = stats.toString()
      process.stdout.write(statString + '\n')
    })
  }
})

const devServer = new WebpackDevServer(devOptions, clientCompiler)

devServer.startCallback(err => {
  if (err) {
    console.error('[webpack] devServer listening failed')
    return console.error(err)
  }
  console.info(`[webpack] devServer listening on port 8080`)
})