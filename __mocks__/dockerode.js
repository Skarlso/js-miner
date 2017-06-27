const dockerode = jest.genMockFromModule('dockerode')

var Docker = function() {}

Docker.prototype.__setup = function() {
    console.log('calling the stub')
}

Docker.prototype.listContainers = function(opts, callback) {
    console.error('Calling mock listContainers.')
    let err = false
    let containers = [{}, {}]
    callback(err, containers)
}

Docker.prototype.pull = function(tag, callback) {
    console.log('Calling mock Pull.')
    let err = false
    let stream = Object.create(null)
    callback(err, stream)
}

Docker.prototype.createContainer = function(opts) {
    console.log('Calling mock createContainer.')
    return new Promise((resolve, reject) => {
        if (opts.err) reject(opts.err)
        else resolve(opts.resolve)
    })
}

module.exports = Docker