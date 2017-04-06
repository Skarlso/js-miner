/*jshint esversion: 6 */

const fs = require('fs');
const config = require('./config.js');
const Version = function() {};

Version.prototype.saveServerVersion = function(name, version) {
    let filename = config.configDir + name + '.version';
    fs.open(filename, 'wx', (err, fd) => {
        if (err) {
            if (err.code === 'EEXIST') {
                console.error(`Server file already exists under ${filename}`);
                return;
            }
            throw err;
        } else {
            fs.writeFile(fd, version, (err) => {
                if (err) throw err;
            });
            console.log(`Version information saved under: ${filename}`);
        }
    });
};

Version.prototype.getServerVersion = function(name) {
    let filename = config.configDir + name + '.version';
    let version = fs.readFileSync(filename, 'utf8');
    return version;
};

module.exports = new Version();
