// Pull Image of defined Version
// miner setup 1.9
// miner setup // -- latest Image
// miner setup 11.1
// Create the container with given World Location
var chalk = require('chalk');
var cmd = require('commander');
var dHelper = require('./docker.js');

cmd
  .option('-m, --minecraft-version', 'Version to use. if not provided, latest is used.')
  .parse(process.argv);

var version = cmd.minecraft_version || 'latest';

console.log('Setting up minecraft server with version %s', chalk.bold(chalk.white(version)));
dHelper.pullMinecraftImageVersion(version);
