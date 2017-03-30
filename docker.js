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

DockerHelper.prototype.createMinecraftContainer = function() {
    // docker.getContainer(config.containerName);
};

module.exports = new DockerHelper();
