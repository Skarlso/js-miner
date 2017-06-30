jest.mock('dockerode')
jest.mock('fs')

const dockerHelper = require('../utils/docker')
const config = require('../utils/config')
const v = require('../utils/version')
const testName = 'test'
const dockerode = require('dockerode')
const Docker = new dockerode()

beforeEach(() => {
  global.console.log = () => {
    throw new Error('err');
  };
})

describe("#setup", () => {
  test('it can setup a new server by pulling a container', () => {
    let err = new Error('err')
    expect(() => {dockerHelper.setup(testName, '1.11.1')}).toThrow(err)
  })
})

describe("#getMinecraftContainer", () => {
  test('can retrieve a container', () => {
    Docker.__setup({containers: [{Names: [testName]}]})
    let cont = {Names: [testName]}
    expect.assertions(1)
    return expect(dockerHelper.getMinecraftContainer(testName)).resolves.toEqual(cont)
  })
  test('errors when no containers are found', () => {
    Docker.__setup({containers: []})
    let err = new Error("No containers tagged with test found.")
    expect.assertions(1)
    return expect(dockerHelper.getMinecraftContainer(testName)).rejects.toMatchObject(err)
  })
})

describe("#startServer", () => {
  test('can start a server', () => {
    Docker.__setup({containers: [{Names: [testName]}]})
    expect(() => {dockerHelper.startServer(testName)}).not.toThrow()
  })
})

describe("#stopServer", () => {
  test('can stop a server', () => {
    Docker.__setup({containers: [{Names: [testName]}]})
    expect(() => {dockerHelper.stopServer(testName)}).not.toThrow()
  })

  test('trying to stop a not running container only displays an error message', () => {
    Docker.__setup({containers: []})
    expect(() => {dockerHelper.stopServer(testName)}).not.toThrow()
  })
})

describe("#attachToServer", () => {
  test('can attach to a server', () => {
    Docker.__setup({containers: [{Names: [testName]}]})
    expect(() => {dockerHelper.attachToServer(testName)}).not.toThrow()
  })
})