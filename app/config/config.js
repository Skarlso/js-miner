/* jshint esversion: 6 */

const config = {}
const os = require('os')
const homedir = os.homedir();
const configDir = homedir + '/.miner_world/'
const yaml = require('js-yaml');
const fs = require('fs');

try {
  var configYaml = yaml.safeLoad(fs.readFileSync(homedir + '/.config/js-miner/config.yml', 'utf8'));
} catch (e) {
  console.log(e);
}

// bucket: my-minecraft-backup-bucket
// name: miner_server
// repoTag: skarlso/minecraft
// bindBase: ~/.miner_world/
// awsProfile: default

config.bucket = configYaml.bucket || 'my-minecraft-backup-bucket'
config.defaultName = configYaml.name || 'miner_server'
config.repoTag = configYaml.repoTag || 'skarlso/minecraft'
config.configDir = configDir
config.bindBase = configYaml.bindBase || configDir
config.profile = configYaml.awsProfile || 'default'
// Options for mod are craftbukkit | forge
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
