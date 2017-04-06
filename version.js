/*jshint esversion: 6 */

const fs = require('fs');
const config = require('./config.js');
var Version = function() {};

Version.prototype.saveServerVersion = function(name, version) {
    let filename = config.configDir + name + '.version';
    console.log(filename);
    fs.open(filename, 'wx', (err, fd) => {
        if (err) {
            if (err.code === 'EEXIST') {
                console.error('server file already exists');
                return;
            }
            throw err;
        }
        fs.writeFile(fd, version, (err) => {
            if (err) throw err;
        });
    });
};

Version.prototype.getServerVersion = function(name) {
    let filename = config.configDir + name + '.version';
    let version = fs.readFileSync(filename, 'utf8');
    return version;
};

module.exports = new Version();