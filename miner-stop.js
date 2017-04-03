#!/usr/bin/env node
console.log('Stopping server.');

var dHelper = require('./docker.js');
var chalk = require('chalk');

container = dHelper.getMinecraftContainer();
container.inspect().then(function (con) {
    console.log('Looking for container with name: ' + con.Name);
    if (con.State.Running) {
        console.log("Container %s running.", chalk.red('IS'));
        console.log("Starting container.");
        container.stop(function (err, data) {
            if (!err) {
                console.log('Container stopped.');
            }
        });
    } else {
        console.log("Container already %s.", chalk.green("stopped"));
    }
}).catch(function (err) {
    console.log(err.reason);
    process.exit(1);
});