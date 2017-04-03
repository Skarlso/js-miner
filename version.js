var fs = require('fs');
var Version = function() {};
var config = require('./config.js');


Version.prototype.saveServerVersion = function(name, version) {
    var filename = config.configDir + name + '.version';
    console.log(filename);
    fs.open(filename, 'wx', function (err, fd) {
        if (err) {
            if (err.code === 'EEXIST') {
                console.error('server file already exists');
                return;
            }

            throw err;
        }

        fs.writeFile(fd, version, function(err) {
            if (err) throw err;
        });
    });
};

Version.prototype.getServerVersion = function(name) {
    var filename = config.configDir + name + '.version';
    var version = 'asdf';
    openFile(filename, function (fd) {
        console.log('Outer version: ', version);
        fs.readFileSync(fd, 'utf8', function(err, data) {
            if (err) throw err;
            console.log('Outer version: ', version);
        });
    });
    return version;
};

function openFile(filename, f) {
    function callback(err, fd) {
        if (err) {
            if (err.code === 'EEXIST') {
                console.error('server file already exists');
                return;
            }

            throw err;
        }

        f(fd);
    }
    fs.open(filename, 'wx', callback);
}

module.exports = new Version();