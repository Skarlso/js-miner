var Docker = require('dockerode');
var config = require('./config.js');
var chalk = require('chalk');
var Spinner = require('cli-spinner').Spinner;
var ver = require('./version.js');
var Promise = require('bluebird');

var docker = new Docker();
var DockerHelper = function() {};

DockerHelper.prototype.getMinecraftContainer = function(name) {
    var opts = {
        "limit": 1,
        "filters": '{"label": ["world='+ name +'"], "status": ["running"]}',
    };
    return new Promise(function(resolve, reject) {
        docker.listContainers(opts, function(err, containers) {
            if (containers !== null && containers.length > 0) {
                var contName = containers[0].Names[0].replace('/', '');
                console.log("Found container labeled with %s. Container name is: %s", chalk.bold(chalk.white(name)), chalk.bold(chalk.green(contName)));
                resolve(docker.getContainer(contName));
            } else {
                reject(new Error("No containers tagged with "+ chalk.bold(chalk.white(name)) +" found."));
            }
        });
    });
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

// TODO: This doesn't work properly yet. If I use the Connect stdin bit, it will not be able to
// detach from that hijack.
DockerHelper.prototype.attachToServer = function(name) {
    this.getMinecraftContainer(name).then(function (container) {
        var attach_opts = {stream: true, stdin: true, stdout: true, stderr: true};
        // var opts = {'Detach': true, 'Tty': true, stream: true, stdin: true, stdout: true, stderr: true};
        container.attach(attach_opts, function (err, stream) {
            // stream.pipe(process.stdout);
            stream.pipe(process.stdout);
            // // Connect stdin
            // var isRaw = process.isRaw;
            // process.stdin.resume();
            // process.stdin.setRawMode(true);
            // process.stdin.pipe(stream);
        });
    }).catch(function (err) {
        console.log(err);
    });
};

DockerHelper.prototype.stopServer = function(name) {
    this.getMinecraftContainer(name).then(function (container) {
        var attach_opts = {stream: true, stdin: true, stdout: true, stderr: true};
        container.attach(attach_opts, function (err, stream) {
            stream.pipe(process.stdout);
            stream.write('stop\n');
        });
    }).catch(function (err) {
        console.log(err);
    });
};

DockerHelper.prototype.startServer = function(name) {
    // docker run -itd skarlso/minecraft:1.9 bash -c 'echo "eula=true" > eula.txt ; java -jar /minecraft/craftbukkit.jar nogui'
    // Get version for server. // -> load the file with the name of the server + .version. Which will contain the version.
    var version = ver.getServerVersion(name);
    var bindDir = config.bindBase + name + ':/data';
    console.log('Server is currently running on version: %s', chalk.bold(chalk.green(version)));
    console.log('Binding to world location: ', chalk.bold(chalk.green(bindDir)));
    docker.createContainer({
        Image: 'skarlso/minecraft:' + version,
        AttachStdin: true,
        AttachStdout: true,
        AttachStderr: false,
        Tty: true,
        OpenStdin: true,
        StdinOnce: false,
        WorkingDir: '/data',
        Labels: {
            'world':name
        },
        'Volumes': {
            '/data': {}
        },
        'Hostconfig': {
            'Binds': [config.bindBase + name + ':/data']
        },
        Cmd: ["bash", "-c", "echo \"eula=true\" > eula.txt ; java -jar /minecraft/craftbukkit.jar nogui"],
        HostConfig: {
            PortBindings: {'25565/tcp': [{ 'HostPort': '25565' }] }
        }
    }).then(function(container) {
        return container.start();
    }).catch(function(err) {
        console.log(err);
    });
};

module.exports = new DockerHelper();
