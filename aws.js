var chalk = require('chalk');
var AWS = require('aws-sdk');
var config = require('./config');

var Aws = function () {};

Aws.prototype.s3Upload = function() {
    var s3 = new AWS.S3();
    var bucket = config.bucket;
    console.log(chalk.green('Uploading to bucket ') + chalk.cyan(bucket) + '!');
};

module.exports = new Aws();
