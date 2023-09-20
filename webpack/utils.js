function getWebpackDefinePlugin(envObj = {}) {
  for (const key in envObj) {
    envObj[key] = JSON.stringify(envObj[key])
  }
  return envObj
}

module.exports = {
  getWebpackDefinePlugin,
}