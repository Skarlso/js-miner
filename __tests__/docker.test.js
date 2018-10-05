jest.mock('dockerode')
jest.mock('fs')

const dockerHelper = require('../app/docker/docker')
const testName = 'test'
const dockerode = require('dockerode')
const Docker = new dockerode()

describe("#setup", () => {
  test('it can setup a new server by pulling a container', () => {
    expect(() => { dockerHelper.setup(testName, '1.11.1') }).not.toThrow()
  })
})

describe("#getMinecraftContainer", () => {
  test('can retrieve a container', () => {
    Docker.__setup({ containers: [{ Names: [testName] }] })
    let cont = { Names: [testName] }
    expect.assertions(1)
    return expect(dockerHelper.getMinecraftContainer(testName)).resolves.toEqual(cont)
  })
  test('errors when no containers are found', () => {
    Docker.__setup({ containers: [] })
    let err = new Error("No containers tagged with test found.")
    expect.assertions(1)
    return expect(dockerHelper.getMinecraftContainer(testName)).rejects.toMatchObject(err)
  })
})

describe("#startServer", () => {
  test('can start a server', () => {
    Docker.__setup({ containers: [{ Names: [testName] }] })
    expect(() => { dockerHelper.startServer(testName) }).not.toThrow()
  })
  test('can not start a not setup server', () => {
    Docker.__setup({ err: new Error('No version found for server.') })
    // global.console = { error: jest.fn(), log: jest.fn(), warn: jest.fn()}
    dockerHelper.startServer('error')
    // expect(console.error).toBeCalled()
  })
})

// @TODO: js.fn() doesn't work on console.error for some reason.
describe("#stopServer", () => {
  test('can stop a server', () => {
    Docker.__setup({ containers: [{ Names: [testName] }] })
    expect(() => { dockerHelper.stopServer(testName) }).not.toThrow()
  })

  test('trying to stop a not running container', () => {
    let err = new Error("No containers tagged with test found.")
    Docker.__setup({ err: err, containers: [] })
    expect(() => { dockerHelper.stopServer(testName) }).not.toThrow()
  })
})

describe("#attachToServer", () => {
  test('can attach to a server', () => {
    Docker.__setup({ containers: [{ Names: [testName] }] })
    expect(() => { dockerHelper.attachToServer(testName) }).not.toThrow()
  })
})