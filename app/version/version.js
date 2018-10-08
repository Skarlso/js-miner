/* jshint esversion: 6 */

var fs = require("fs")
const config = require('../config/config.js')
const path = require('path');
const Version = function () { }

Version.prototype.saveServerVersion = function (name, version) {
  let filename = path.join(config.configDir, name + '.version')
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, version, 'utf8', (err) => {
      if (err) reject(err)
      else resolve(version)
    })
  })
}

Version.prototype.getServerVersion = function (name) {
  let filename = path.join(config.configDir, name + '.version')
  let version = fs.readFileSync(filename, 'utf8')
  return version
}

module.exports = new Version()
