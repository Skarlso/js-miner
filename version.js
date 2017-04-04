// var Promise = require('bluebird');
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
    var version = fs.readFileSync(filename, 'utf8');
    return version;
    // var version = 'asdf';
    // const readFileAsPromise = (file, options) =>
    //     new Promise((resolve, reject) =>
    //         fs.readFile(file, options, (err, data) =>
    //         err ? reject(err) : resolve(data)));

    // readFileAsPromise(filename)
    //     .then(function(data) {
    //         console.log("Outer version: ", version);
    //         version = 'bla';
    //         console.log('New version: ', version);
    //     })
    //     .catch(function(err) {console.log(`Error: ${err}`);});
    // return version;
};

// function openFile(filename, f) {
//     function callback(err, fd) {
//         if (err) {
//             if (err.code === 'EEXIST') {
//                 console.error('server file already exists');
//                 return;
//             }

//             throw err;
//         }

//         f(fd);
//     }
//     fs.open(filename, 'wx', callback);
// }

module.exports = new Version();