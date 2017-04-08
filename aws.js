/*jshint esversion: 6 */

const chalk = require('chalk');
const config = require('./config');
const fs = require('fs');
const archiver = require('archiver');
const AWS = require('aws-sdk');

const Aws = function () {};

Aws.prototype.s3Upload = function(name) {
    let filename = `${name}_world_archive${Date.now()}.zip`;
    let outputFile = config.bindBase + '/' + filename;
    let srcDir = config.bindBase + name;
    let output = fs.createWriteStream(outputFile);
    let archive = archiver('zip', {
        zlib: { level: 9 }
    });

    output.on('close', () => {
        console.log('Done zipping world to: ', outputFile);
    });

    archive.on('error', (err) => {
        throw err;
    });

    archive.pipe(output);

    archive.file(config.bindBase + name + '.version', { name: name + '.version' });
    archive.directory(srcDir + '/');
    archive.finalize();

    let credentials = new AWS.SharedIniFileCredentials({profile: config.profile});
    AWS.config.credentials = credentials;
    AWS.config.update({
        signatureVersion: 'v4'
    });
    let s3 = new AWS.S3();
    let bucket = config.bucket;
    console.log("Uploading '%s' to bucket '%s'.", chalk.cyan(name), chalk.green(bucket));

    let params = {Bucket: config.bucket, Key: filename, Body: fs.createReadStream(outputFile)};
    s3.upload(params, function(err, data) {
        if (err) {
            console.log(chalk.red(err));
        } else {
            console.log('Upload done to location:', chalk.green(data.key));
        }
    });
};

module.exports = new Aws();
