var Docker = require('dockerode');
var config = require('./config.js');
var chalk = require('chalk');
var Spinner = require('cli-spinner').Spinner;
var ver = require('./version.js');

var docker = new Docker();
var DockerHelper = function() {};

DockerHelper.prototype.getMinecraftContainer = function() {
    return docker.getContainer(config.defaultName);
};

DockerHelper.prototype.setup = function(name, version) {
    var self = this;
    var spinner = new Spinner('Pulling minecraft image... %s');
    spinner.setSpinnerString('|/-\\');
    spinner.start();
    docker.pull(config.repoTag + version, function(err, stream) {
        docker.modem.followProgress(stream, onFinished, onProgress);

        function onFinished(err, output) {
            spinner.stop(false);
            if (!err) {
                console.log('\nDone pulling.');
                ver.saveServerVersion(name, version);
            } else {
                console.log(err);
                process.exit(1);
            }
        }
        function onProgress(event) {
        }
    });
};

DockerHelper.prototype.attachToContainer = function() {
    var container = this.getMinecraftContainer();
    container.attach({stream: true, stdout: true, stderr: true}, function (err, stream) {
        stream.pipe(process.stdout);
    });
};

DockerHelper.prototype.startContainer = function(name) {
    // docker run -itd skarlso/minecraft:1.9 bash -c 'echo "eula=true" > eula.txt ; java -jar /minecraft/craftbukkit.jar nogui'
    // Get version for server. // -> load the file with the name of the server + .version. Which will contain the version.
    var version = ver.getServerVersion(name);
    console.log('Server is currently running on version: %s', chalk.bold(chalk.green(version)));
    docker.createContainer({
        Image: 'skarlso/minecraft:' + version,
        AttachStdin: true,
        AttachStdout: false,
        AttachStderr: false,
        Tty: true,
        OpenStdin: false,
        StdinOnce: false,
        'Volumes': {
            '/data': {}
        },
        'Hostconfig': {
            'Binds': [config.bindBase + name + ':/data']
        },
        Cmd: ["echo \"eula=true\" > eula.txt", "java -jar /minecraft/craftbukkit.jar nogui"],
        name: name,
        HostConfig: {
            PortBindings: {'25565/tcp': [{ 'HostPort': '25565' }] }
        }
    }).then(function(container) {
        container.start();
    }).catch(function(err) {
        console.log(err);
    });
};

module.exports = new DockerHelper();
