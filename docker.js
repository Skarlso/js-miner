var Docker = require('dockerode');
var config = require('./config.js');
var chalk = require('chalk');

var docker = new Docker();
var DockerHelper = function() {};

DockerHelper.prototype.getMinecraftContainer = function() {
    return docker.getContainer(config.containerName);
};

DockerHelper.prototype.pullMinecraftImageVersion = function(version) {
    console.log("Pulling minecraft image");
    docker.pull('skarlso/minecraft:' + version, function (err, stream) {
        if (err) {
            console.log('Error: ' + err);
        } else {
            console.log('Pulling image skarlso/minecraft:%s was %s', chalk.bold(chalk.white(version)), chalk.green('SUCCESSFUL'));
        }
    });
};

DockerHelper.prototype.createMinecraftContainer = function(version) {
    // docker.getContainer(config.containerName);
    docker.createContainer({
        Image: 'skarlso/minecraft:' + version,
        AttachStdin: false,
        AttachStdout: false,
        AttachStderr: false,
        Tty: false,
        OpenStdin: false,
        StdinOnce: false,
        name: config.containerName,
        HostConfig: {
            PortBindings: {'25565/tcp': [{ 'HostPort': '0.0.0.0:25565' }] }
        }
    }).then(function(container) {
        return container.start();
    }).then(function(container) {
        return container.resize({
            h: process.stdout.rows,
            w: process.stdout.columns
        });
    }).then(function(container) {
        return container.stop();
    }).then(function(container) {
        return container.remove();
    }).then(function(data) {
        console.log('container removed');
    }).catch(function(err) {
        console.log(err);
    });
};

module.exports = new DockerHelper();
