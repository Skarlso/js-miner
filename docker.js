var Docker = require('dockerode');
var config = require('./config.js');
var chalk = require('chalk');

var docker = new Docker();
var DockerHelper = function() {};

DockerHelper.prototype.getMinecraftContainer = function() {
    return docker.getContainer(config.containerName);
};

DockerHelper.prototype.pullMinecraftImageVersion = function(version) {
    console.log("Pulling minecraft image with version: %s", version);
    docker.pull('skarlso/minecraft:' + version, function (err, stream) {
        if (err) {
            console.log('Error: ' + err.reason);
        } else {
            console.log('Pulling image skarlso/minecraft:%s was %s', chalk.bold(chalk.white(version)), chalk.green('SUCCESSFUL'));
        }
    });
};

DockerHelper.prototype.createContainer = function() {
    // docker.getContainer(config.containerName);
};

DockerHelper.prototype.stopContainer = function() {
    var container = docker.getContainer(config.containerName);
    container.inspect().then(function (con) {
        if (con.State.Running) {
            console.log("Container %s.", chalk.gree('running'));
            console.log("Stopping container.");
            container.stop(function (err, data) {
                if (!err) {
                    console.log('Container stopped.');
                }
            });
        } else {
            console.log("Container %s running.", chalk.red("not"));
        }
    }).catch(function (err) {
        console.log(err.reason);
        process.exit(1);
    });
};

module.exports = new DockerHelper();
