/* jshint esversion: 6 */

const config = {}
const os = require('os')
const homedir = require('os').homedir();

yaml = require('js-yaml');
fs = require('fs');

try {
  var confYaml = yaml.safeLoad(fs.readFileSync(homedir + '/.config/js-miner/config.yml', 'utf8'));
} catch (e) {
  console.log(e);
}

config.bucket = process.env.MINER_BUCKET || 'my-minecraft-backup-bucket'
config.defaultName = 'miner_server'
config.repoTag = process.env.MINE_CON_BASE || 'skarlso/minecraft:'
const configDir = os.homedir() + '/.miner_world/'
config.configDir = configDir
config.bindBase = process.env.MINER_WORLD_BIND_BASE || configDir
config.profile = process.env.MINER_AWS_PROFILE || 'default'
// Options for mod are craftbukkit | forge
config.mod = process.env.MINER_MOD || 'craftbukkit'
config.defaultContainer = {
  Image: config.repoTag + 'latest',
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
  Cmd: [
    'bash', '-c', `echo "eula=true" > eula.txt ; java -jar /minecraft/craftbukkit.jar nogui`
  ],
  HostConfig: {
    PortBindings: {
      '25565/tcp': [
        {
          'HostPort': '25565'
        }
      ]
    }
  }
}

module.exports = config
