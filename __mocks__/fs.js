const fs = jest.genMockFromModule('fs')

let mockObjects = Object.create(null)

function __setMockFiles(mockFiles) {
  mockObjects = mockFiles
}

function fileWrite(filename, version, encoding, callback) {
  if (version != 'err') {
    return version
  } else {
    throw 'error'
  }
}

function readFileSync(filename, encoding) {
  return mockObjects[filename]
}

fs.__setMockFiles = __setMockFiles
fs.fileWrite = fileWrite
fs.readFileSync = readFileSync

module.exports = fs