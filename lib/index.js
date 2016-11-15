const traverse = require('babel-traverse').default
const readConfigFromFiles = require('./read-config-from-files')
const readDataFromFiles = require('./read-data-from-files')
const bootstrap = require('./plugins/bootstrap')
const defaultPlugins = [bootstrap]

function applyPluginHooks ({plugins, hookName, arg}) {
  return plugins.reduce((acc, plugin) => {
    if (plugin[hookName]) {
      return plugin[hookName](acc)
    } else {
      return acc
    }
  }, arg)
}

function index (props) {
  const { configIsFromFiles, dataIsFromFiles } = props
  const config = configIsFromFiles ? readConfigFromFiles() : props.config
  const data = dataIsFromFiles ? readDataFromFiles() : props.data

  const customPlugins = config.options.plugins.map((plugin) => require(plugin))
  const plugins = defaultPlugins.concat(customPlugins)

  let arg = { config, data, pluginData: {}, components: [], indexFile: null }

  arg = applyPluginHooks({ plugins, hookName: 'beforeAllComponents', arg })

  for (let i = 0; i < arg.components.length; i++) {
    arg.component = arg.components[i]
    arg = applyPluginHooks({ plugins, hookName: 'beforeEachComponent', arg })

    traverse(arg.component.ast, {
      JSXElement (nodePath) {
        arg.nodePath = nodePath
        arg = applyPluginHooks({ plugins, hookName: 'eachNodePath', arg })
        delete arg.nodePath
      }
    })

    arg = applyPluginHooks({ plugins, hookName: 'afterEachComponent', arg })
    delete arg.component
  }

  arg = applyPluginHooks({ plugins, hookName: 'afterAllComponents', arg })

  return arg
}

module.exports = index
