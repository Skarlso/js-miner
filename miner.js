var Aws = require('./aws.js');
var Miner = function () {};

Miner.prototype.backup = function() {
    Aws.s3Upload();
};

module.exports = new Miner();
