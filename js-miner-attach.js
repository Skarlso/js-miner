#!/usr/bin/env node

var cmd = require('commander')
var dHelper = require('./docker.js')
var config = require('./config.js')

cmd
  .option('-n, --minecraft-name [SERVER NAME]', 'Name of the server to attach to.')
  .parse(process.argv)

var name = cmd.minecraftName || config.defaultName
dHelper.attachToServer(name)
