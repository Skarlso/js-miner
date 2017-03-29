var Docker = require('dockerode');
var config = require('./config.js');
var chalk = require('chalk');

var docker = new Docker();
var DockerHelper = function() {};
DockerHelper.prototype.getMinecraftContainer = function() {
    return docker.getContainer(config.containerName);
};

module.exports = new DockerHelper();