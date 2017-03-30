#!/usr/bin/env node
console.log('Stopping server.');

var dHelper = require('./docker.js');

dHelper.stopContainer();