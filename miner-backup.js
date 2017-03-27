#!/usr/bin/env node

// var cmd = require('commander');

// cmd
//   .option('-f, --force', 'force installation')
//   .parse(process.argv);

var Aws = require('./aws.js');
Aws.s3Upload();
