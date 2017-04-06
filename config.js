/*jshint esversion: 6 */

const config = {};
const os = require('os');

config.bucket = process.env.MINER_BUCKET || 'my-minecraft-backup-bucket';
config.defaultName = 'miner_server';
config.repoTag = 'skarlso/minecraft:';
const configDir = os.homedir() + '/.miner_world/';
config.configDir = configDir;
config.bindBase = process.env.MINER_WORLD_BIND_BASE || configDir;
config.profile = process.env.MINER_AWS_PROFILE || 'default';

module.exports = config;
