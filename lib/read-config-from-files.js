const fs = require('fs')
const { fatal } = require('./helpers/logger')

function readFile (filePath, msg) {
  let fileContent

  try {
    fileContent = fs.readFileSync(filePath)
  } catch (e) {
    if (msg) {
      fatal(msg)
    } else {
      throw e
    }
  }

  return JSON.parse(fileContent)
}

function readdir (dirPath, msg) {
  let pageFiles = []

  try {
    pageFiles = fs.readdirSync(dirPath)
  } catch (e) {
    // do nothing
  }

  if (!pageFiles.length) {
    fatal(msg)
  }

  return pageFiles
}

module.exports = function readConfigFromFiles () {
  const config = {}

  config.options = readFile(
    'hrc/options.json',
    'You MUST create hrc/options.json, please read: https://github.com/poetic/html-to-react-converter#hrcconfigjson'
  )

  config.routes = readFile(
    'hrc/routes.json',
    'You MUST create hrc/routes.json, please read: https://github.com/poetic/html-to-react-converter#hrcroutesjson'
  )

  config.pages = readdir(
    'hrc/pages/',
    'You MUST create at least one hrc/pages/[PageName].json, please read: https://github.com/poetic/html-to-react-converter#hrcpagespagenamejson'
  ).map((name) => readFile(`hrc/pages/${name}`))

  return config
}
