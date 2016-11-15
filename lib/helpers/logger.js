const chalk = require('chalk')

// error message and terminate
function fatal (msg) {
  console.log(chalk.red(`FATAL: ${msg}`))
  if (process) {
    process.exit(1)
  } else {
    throw msg
  }
}

// error message and keep going
function warn (msg) {
  console.log(chalk.yellow(`WARN: ${msg}`))
}

// info message
function info (msg) {
  console.log(chalk.green(`INFO: ${msg}`))
}

module.exports = {
  fatal,
  warn,
  info
}
