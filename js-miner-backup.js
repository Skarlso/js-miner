#!/usr/bin/env node

var cmd = require('commander');

cmd
  .option('-n, --world-name', 'The name of the world you would like to backup.')
  .parse(process.argv);

var name = cmd.worldName || 'miner_server';

var Aws = require('./aws.js');

Aws.s3Upload(name);
