#!/usr/bin/env node

var cmd = require('commander');
var chalk = require('chalk');
var dHelper = require('./docker.js');
var tmux = require('./tmux.js');


// TODO: Extract this to setup, as starting the server should not care what version was setup.
cmd
  .option('-m, --minecraft-version', 'Version to use. if not provided, latest is used.')
  .parse(process.argv);

var version = cmd.minecraft_version || 'latest';

console.log('Starting server with version: %s', chalk.bold(chalk.white(version)));
container = dHelper.getMinecraftContainer();
container.inspect().then(function (con) {
    console.log('Looking for container with name: ' + con.Name);
    if (!con.State.Running) {
        console.log("Container %s running.", chalk.red('NOT'));
        console.log("Starting container.");
        container.start(function (err, data) {
            if (!err) {
                console.log('Container started.');
                tmux.run(con.Name.replace('/', ''));
            }
        });
    } else {
        console.log("Container already %s.", chalk.green("running"));
        tmux.run(con.Name.replace('/', ''));
    }
}).catch(function (err) {
    console.log(err.reason);
    process.exit(1);
});
