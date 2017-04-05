#!/usr/bin/env node

var cmd = require('commander');
var chalk = require('chalk');
var dHelper = require('./docker.js');
var config = require('./config.js');

cmd
  .option('-n, --minecraft-name [SERVER NAME]', 'Name of the server to launch.')
  .parse(process.argv);

var name = cmd.minecraftName || 'miner_server';

console.log('Starting %s.', chalk.bold(chalk.white(name)));
dHelper.startServer(name);
// container = dHelper.getMinecraftContainer();
// container.inspect().then(function (con) {
//     console.log('Looking for container with name: ' + con.Name);
//     if (!con.State.Running) {
//         console.log("Container %s running.", chalk.red('NOT'));
//         console.log("Starting container.");
//         console.log("Binding to location: %s/:/data", config.bind);
//         container.start(function (err, data) {
//             if (!err) {
//                 console.log('Container started.');
//                 tmux.run(con.Name.replace('/', ''));
//             } else {
//                 console.log(err);
//                 process.exit(1);
//             }
//         });
//     } else {
//         console.log("Container already %s.", chalk.green("running"));
//         tmux.run(con.Name.replace('/', ''));
//     }
// }).catch(function (err) {
//     console.log(err.reason);
//     process.exit(1);
// });
