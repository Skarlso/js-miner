#!/usr/bin/env node

var cmd = require('commander')
var chalk = require('chalk')
var dHelper = require('./docker/docker.js')

cmd
  .option('-n, --minecraft-name [SERVER NAME]', 'Name of the server to launch.')
  .parse(process.argv)

var name = cmd.minecraftName || 'miner_server'

console.log('Starting %s.', chalk.bold(chalk.white(name)))
dHelper.startServer(name)
