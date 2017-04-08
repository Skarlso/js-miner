/*jshint esversion: 6 */

var config = {};
const os = require('os');

config.bucket = process.env.MINER_BUCKET || 'my-minecraft-backup-bucket';
config.defaultName = 'miner_server';
config.repoTag = 'skarlso/minecraft:';
var configDir = os.homedir() + '/.miner_world/';
config.configDir = configDir;
config.bindBase = process.env.MINER_WORLD_BIND_BASE || configDir;
config.profile = process.env.MINER_AWS_PROFILE || 'default';
// Options for mod are craftbukkit | forge
config.mod = process.env.MINER_MOD || 'craftbukkit';
config.defaultContainer = {
        Image: 'skarlso/minecraft:latest',
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: false,
        Tty: true,
        OpenStdin: true,
        StdinOnce: false,
        WorkingDir: '/data',
        Labels: {
            'world': config.defaultName
        },
        'Volumes': {
            '/data': {}
        },
        'Hostconfig': {
            'Binds': [config.bindBase + config.defaultName + ':/data']
        },
        Cmd: ["bash", "-c", `echo \"eula=true\" > eula.txt ; java -jar /minecraft/craftbukkit.jar nogui`],
        HostConfig: {
            PortBindings: {'25565/tcp': [{ 'HostPort': '25565' }] }
        }
};

module.exports = config;