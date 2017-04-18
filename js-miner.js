#!/usr/bin/env node

var commands = require('commander')

commands
    .version('1.1.1')
    .command('backup', 'Backs up a world using the provided option to determine the process.')
    .command('start [NAME]', 'Starts a server.')
    .command('stop', 'Stops a server.')
    .command('setup [VERSION]', 'Setup initial container for minecraft with a given version.')
    .command('attach [NAME]', 'Attach to a running minecraft server.')
    .command('versions', 'List available minecraft versions.')
    .parse(process.argv)
