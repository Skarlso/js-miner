var chalk = require('chalk');
var Aws = function () {};

Aws.prototype.s3Upload = function() {
    console.log(chalk.green('Uploading to S3'));
};

module.exports = new Aws();
