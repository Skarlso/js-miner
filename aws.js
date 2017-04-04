var chalk = require('chalk');
var config = require('./config');
var fs = require('fs');
var archiver = require('archiver');
var AWS = require('aws-sdk');

var Aws = function () {};

Aws.prototype.s3Upload = function(name) {
    var filename = name + '_world_archive' + Date.now() + '.zip';
    var outputFile = config.bindBase + '/' + filename;
    var srcDir = config.bindBase + name;
    var output = fs.createWriteStream(outputFile);
    var archive = archiver('zip', {
        zlib: { level: 9 }
    });

    output.on('close', function() {
        console.log('Done zipping world to: ', outputFile);
    });

    archive.on('error', function(err) {
        throw err;
    });

    archive.pipe(output);

    archive.file(config.bindBase + name + '.version', { name: name + '.version' });
    archive.directory(srcDir + '/');
    archive.finalize();

    var credentials = new AWS.SharedIniFileCredentials({profile: config.profile});
    AWS.config.credentials = credentials;
    AWS.config.update({
        signatureVersion: 'v4'
    });
    var s3 = new AWS.S3();
    var bucket = config.bucket;
    console.log("Uploading '%s' to bucket '%s'.", chalk.cyan(name), chalk.green(bucket));

    var params = {Bucket: config.bucket, Key: filename, Body: fs.createReadStream(outputFile)};
    s3.upload(params, function(err, data) {
        if (err) {
            console.log(chalk.red(err));
        }
        console.log('Upload done to location:', chalk.green(data.key));
    });
};

module.exports = new Aws();
