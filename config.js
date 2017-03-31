var config = {};

config.bucket = process.env.MINER_BUCKET || 'my_minecraft_backup_bucket';
config.containerName = process.env.MINER_CONTAINER_NAME || 'mc_server';
config.world_location = process.env.MINER_WORLD_LOCATION || 'undef';
config.repoTag = 'skarlso/minecraft:';

module.exports = config;