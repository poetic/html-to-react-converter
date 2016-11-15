const readConfigFromFiles = require('./read-config-from-files')

function index ({ config, configIsFromFiles }) {
  const finalConfig = configIsFromFiles ? readConfigFromFiles() : config
  return finalConfig
}

module.exports = index
