#!/usr/bin/env node

var cmd = require('commander')
var chalk = require('chalk')
var dHelper = require('./docker/docker.js')

cmd
  .option('-n, --minecraft-name [SERVER NAME]', 'Name of the server to launch.')
  .option('-m, --mod [craftbukkit|forge]', 'The mod to use. By default it is craftbukkit.')
  .parse(process.argv)

var name = cmd.minecraftName || 'miner_server'
var mod = cmd.mod || 'craftbukkit'

console.log('Starting %s.', chalk.bold(chalk.white(name)))
dHelper.startServer(name, mod)
