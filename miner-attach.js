#!/usr/bin/env node

var cmd = require('commander');
var chalk = require('chalk');
var dHelper = require('./docker.js');
var config = require('./config.js');

cmd
  .option('-n, --minecraft-name [SERVER NAME]', 'Name of the server to attach to.')
  .parse(process.argv);

var name = cmd.minecraftName || 'miner_server';
dHelper.attachToServer(name);