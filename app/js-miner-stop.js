#!/usr/bin/env node

var cmd = require('commander')
var dHelper = require('./docker/docker.js')
var config = require('./config/config.js')

cmd
  .option('-n, --minecraft-name [SERVER NAME]', 'Name of the server to stop.')
  .parse(process.argv)

var name = cmd.minecraftName || config.defaultName
dHelper.stopServer(name)
