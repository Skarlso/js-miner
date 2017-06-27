const fs = jest.genMockFromModule('fs')
const path = require('path')

let mockObjects = Object.create(null)

function __setMockFiles(mockFiles) {
  mockObjects = mockFiles
}

function writeFile(filename, version, encoding, callback) {
  console.log('Using Mock Filesystem.')
  let err = false
  if ('err.version' === path.basename(filename)) {
    err = 'error'
  }
  callback(err)
}

function readFileSync(filename, encoding) {
  return mockObjects[filename]
}

fs.__setMockFiles = __setMockFiles
fs.writeFile = writeFile
fs.readFileSync = readFileSync

module.exports = fs