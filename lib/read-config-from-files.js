const fs = require('fs')

function readFile (filePath, errorMessage) {
  let fileContent

  try {
    fileContent = fs.readFileSync(filePath)
  } catch (e) {
    throw errorMessage || e
  }

  return JSON.parse(fileContent)
}

function readdir (dirPath, errorMessage) {
  try {
    return fs.readdirSync(dirPath)
  } catch (e) {
    throw errorMessage || e
  }
}

module.exports = function readConfigFromFiles () {
  const config = {}

  config.options = readFile(
    'hrc/options.json',
    'You need to create hrc/options.json, please read this: https://github.com/poetic/html-to-react-converter#hrcconfigjson'
  )

  config.routes = readFile(
    'hrc/routes.json',
    'You need to create hrc/routes.json, please read this: https://github.com/poetic/html-to-react-converter#hrcroutesjson'
  )

  const pageFiles = readdir(
    'hrc/pages/',
    'You need to create hrc/pages/'
  )
  if (!pageFiles.length) {
    const pageFilesErrorMessage = 'You need to create at least one hrc/pages/[PageName].json, please read this: https://github.com/poetic/html-to-react-converter#hrcpagespagenamejson'
    throw pageFilesErrorMessage
  }
  config.pages = pageFiles.map((name) => readFile(`hrc/pages/${name}`))

  return config
}
