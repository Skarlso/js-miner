// Pull Image of defined Version
// miner setup 1.9
// miner setup // -- latest Image
// miner setup 11.1
// Create the container with given World Location
var chalk = require('chalk')
var cmd = require('commander')
var dHelper = require('./docker.js')
var config = require('./config.js')

cmd
    .option('-m, --minecraft-version [VERSION]', 'Version to use. if not provided, latest is used.')
    .option('-n, --minecraft-name [NAME]', 'Name of the server. Usually the map it hosts for easy identification.')
    .parse(process.argv)

var version = cmd.minecraftVersion || 'latest'
var name = cmd.minecraftName || config.defaultName
console.log('Setting up minecraft server with version %s and name %s', chalk.bold(chalk.white(version)), chalk.bold(chalk.green(name)))
dHelper.setup(name, version)
