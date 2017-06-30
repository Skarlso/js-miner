/* jshint esversion: 6 */

const Docker = require('dockerode')
const config = require('./config.js')
const chalk = require('chalk')
const Spinner = require('cli-spinner').Spinner
const ver = require('./version.js')
const docker = new Docker()
const DockerHelper = function () {}

DockerHelper.prototype.getMinecraftContainer = function (name) {
  var opts = {
    'limit': 1,
    'filters': '{"label": ["world=' + name + '"], "status": ["running"]}'
  }
  return new Promise((resolve, reject) => {
    docker.listContainers(opts, (err, containers) => {
      if (err) {
        reject(err)
      }
      if (containers !== null && containers.length > 0) {
        let contName = containers[0].Names[0].replace('/', '')
        console.log('Found container labeled with %s. Container name is: %s', chalk.bold(chalk.white(name)), chalk.bold(chalk.green(contName)))
        resolve(docker.getContainer(contName))
      } else {
        reject(new Error(`No containers tagged with ${chalk.bold(chalk.white(name))} found.`))
      }
    })
  })
}

DockerHelper.prototype.setup = function (name, version) {
  var spinner = new Spinner('Pulling minecraft image... %s')
  spinner.setSpinnerString('|/-\\')
  spinner.start()
  docker.pull(config.repoTag + version, (err, stream) => {
    if (err) {
      console.error(`error while pulling image: ${err}`)
      process.exit(1)
    }
    docker.modem.followProgress(stream, onFinished, onProgress)

    function onFinished (err, output) {
      spinner.stop(false)
      console.log('\nDone pulling.')
      ver.saveServerVersion(name, version).then((result) => {
        console.log(`Saved version ${result}`)
      }).catch((err) => {
        console.error(`Error while saving version ${err}`)
        process.exit(1)
      })
    }
    function onProgress (event) {
    }
  })
}

DockerHelper.prototype.attachToServer = function (name) {
  this.getMinecraftContainer(name).then((container) => {
    const spawn = require('child_process').spawn
    var child = spawn(`docker`, [`attach`, `${container.id}`], {stdio: 'inherit', detached: true})
    child.on('error', (err) => {
      console.error('Failed to start child process: ', err)
    })
  }).catch((err) => {
    console.error(err)
  })
}

DockerHelper.prototype.stopServer = function (name) {
  this.getMinecraftContainer(name).then((container) => {
    let attachOpts = {stream: true, stdin: true, stdout: true, stderr: true}
    container.attach(attachOpts, (err, stream) => {
      if (err) {
        console.error(`error while attaching: ${err}`)
        process.exit(1)
      }
      stream.pipe(process.stdout)
      stream.write('stop\n')
    })
  }).catch((err) => {
    console.error(err)
  })
}

DockerHelper.prototype.startServer = function (name) {
  let version = ver.getServerVersion(name)
  let bindDir = config.bindBase + name + ':/data'
  console.log('Server is currently running on version: %s', chalk.bold(chalk.green(version)))
  console.log('Binding to world location: ', chalk.bold(chalk.green(bindDir)))
  console.log('Using mod system:', config.mod)
  var opts = config.defaultContainer
  if (config.mod === 'forge') {
    Object.assign(opts, {Cmd: ['bash', '-c', `echo "eula=true" > eula.txt ; java -jar /minecraft/forge.jar nogui`]})
  }
  Object.assign(opts, {
    Image: config.repoTag + version,
    Labels: {
      'world': name
    },
    'Hostconfig': {
      'Binds': [config.bindBase + name + ':/data']
    }
  })
  docker.createContainer(opts).then((container) => {
    return container.start()
  }).catch((err) => {
    console.error(err)
  })
}

module.exports = new DockerHelper()
