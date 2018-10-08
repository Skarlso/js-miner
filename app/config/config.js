/* jshint esversion: 6 */

const config = {}
const os = require('os')
const homedir = os.homedir();
const path = require('path');
const configDir = path.join(homedir, '.miner_world')
const yaml = require('js-yaml');
const fs = require('fs');

let configYaml = {}

try {
  configYaml = yaml.safeLoad(fs.readFileSync(path.join(configDir, 'config.yaml'), 'utf8'))
} catch (e) {
  console.log(`file ${configDir}/config.yaml not found. first time run creating it...`)
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir)
  }
  console.log('config dir created. creating config file.')
  configYaml.bucket = process.env.MINER_BUCKET || 'my-minecraft-backup-bucket';
  configYaml.defaultName = 'miner_server';
  configYaml.bindBase = process.env.MINER_WORLD_BIND_BASE || configDir;
  configYaml.profile = process.env.MINER_AWS_PROFILE || 'default';
  configYaml.repoTag = process.env.MINE_CON_BASE || 'skarlso/minecraft'
  let content = `
bucket: my-minecraft-backup-bucket
name: miner_server
repoTag: skarlso/minecraft
bindBase: miner_world
awsProfile: default
  `
  fs.writeFileSync(path.join(configDir, 'config.yaml'), content)
}

config.bucket = configYaml.bucket
config.defaultName = configYaml.name
config.repoTag = configYaml.repoTag
config.configDir = configDir
config.bindBase = configYaml.bindBase
config.profile = configYaml.awsProfile

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
