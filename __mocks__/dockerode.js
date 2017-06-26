const dockerode = jest.genMockFromModule('dockerode')

function listContainers(opts, callback) {
    console.error('Calling mock listContainers.')
    let err = false
    let containers = [{}, {}]
    callback(err, containers)
}

function pull(tag, callback) {
    console.log('Calling mock Pull.')
    let err = false
    let stream = Object.create(null)
    callback(err, stream)
}

function createContainer(opts) {
    console.log('Calling mock createContainer.')
    return new Promise((resolve, reject) => {
        if (opts.err) reject(opts.err)
        else resolve(opts.resolve)
    })
}

dockerode.listContainers = listContainers
dockerode.pull = pull
dockerode.createContainer = createContainer

module.exports = dockerode