#!/usr/bin/env node
// var cmd = require('commander');
var commands = require('commander');

commands
    .version('0.0.1')
    .command('backup', 'Backs up a world using the provided option to determine the process.')
    .command('start [VERSION]', 'Starts a server.')
    .command('stop', 'Stops a server.')
    .command('setup [VERSION]', 'Setup initial container for minecraft with a given version.')
    .command('attach', 'Attach to a running minecraft server.')
    .command('versions', 'List available minecraft versions.')
    .parse(process.argv);
