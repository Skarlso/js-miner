#!/usr/bin/env node

var cmd = require('commander')
var chalk = require('chalk')
var dHelper = require('./docker/docker.js')

cmd
  .parse(process.argv)

console.log('Listing available versions....', chalk.bold(chalk.white(name)))
dHelper.startServer(name)
