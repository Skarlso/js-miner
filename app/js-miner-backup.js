#!/usr/bin/env node

var cmd = require('commander')
var Aws = require('./aws/aws.js')

cmd
  .option('-n, --world-name [WORLD]', 'The name of the world you would like to backup.')
  .parse(process.argv)

var name = cmd.worldName || 'miner_server'
Aws.s3Upload(name)
