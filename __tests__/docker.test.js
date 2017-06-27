jest.mock('dockerode')
jest.mock('fs')

const dockerHelper = require('../utils/docker')
const config = require('../utils/config')
const testName = 'test'
const dockerode = require('dockerode')
const Docker = new dockerode()

describe("#setup", () => {
  test('it can setup a new server by pulling a container', () => {
    expect(() => {dockerHelper.setup(testName, '1.11.1')}).not.toThrow()
  })
})

describe("#getMinecraftContainer", () => {
  test('can retrieve a container', () => {
    Docker.__setup({containers: [{Names: [testName]}]})
    expect.assertions(1)
    return expect(dockerHelper.getMinecraftContainer(testName)).resolves.toBe(testName)
  })
  test('handles failures from dockerode'), () => {
    Docker.__setup({containers: [{Names: [testName]}]})
    expect.assertions(1)
    return expect(dockerHelper.getMinecraftContainer(testName)).rejects.toBe('error')
  }
})
