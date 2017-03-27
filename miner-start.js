#!/usr/bin/env node

var cmd = require('commander');
var chalk = require('chalk');

cmd
  .option('-m, --minecraft-version', 'Version to use. if not provided, latest is used.')
  .parse(process.argv);

var version = cmd.minecraft_version || 'latest';

console.log('Starting server with version: %s', chalk.bold(chalk.white(version)));