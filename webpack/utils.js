require('dotenv').config()

function getWebpackDefinePlugin(envObj = {}) {
  for (const key in envObj) {
    envObj[key] = JSON.stringify(envObj[key])
  }
  return envObj
}

function getDevPublicPath(isProd) {
  return isProd ? process.env.PROD_PUBLIC_PATH: `http://localhost:${process.env.DEV_CLIENT_PORT}/static/`
}

module.exports = {
  getWebpackDefinePlugin,
  getDevPublicPath,
}