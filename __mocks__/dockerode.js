const dockerode = jest.genMockFromModule('dockerode')

opts = {
    err: false,
    containers: []
}
function __setup(opt) {
    Object.assign(opts, opt)
}

var Modem = function() {}

Modem.prototype.followProgress = function(stream, onFinished, onProgress) {
    onFinished()
}

var Docker = function() {
    this.opts = opts
    this.modem = new Modem()
}

Docker.prototype.listContainers = function(opts, callback) {
    callback(this.opts.err, this.opts.containers)
}

Docker.prototype.getContainer = function(name) {
    return name
}

Docker.prototype.pull = function(tag, callback) {
    let stream = Object.create(null)
    callback(this.opts.err, stream)
}

Docker.prototype.createContainer = function(opts) {
    return new Promise((resolve, reject) => {
        if (this.opts.err) reject(this.opts.err)
        else resolve(opts.resolve)
    })
}

Docker.prototype.__setup = __setup

module.exports = Docker