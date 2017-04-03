var config = {};
var osHomedir = require('os-homedir');

config.bucket = process.env.MINER_BUCKET || 'my_minecraft_backup_bucket';
config.defaultName = 'miner_server';
config.repoTag = 'skarlso/minecraft:';
var configDir = osHomedir() + '/.miner_world/';
config.configDir = configDir;
config.bindBase = process.env.MINER_WORLD_BIND_BASE || configDir;

module.exports = config;