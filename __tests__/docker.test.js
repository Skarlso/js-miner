jest.mock('dockerode')
jest.mock('fs')

const dockerHelper = require('../utils/docker')
const config = require('../utils/config')
const testName = 'test'

describe("#setup", () => {
  test('it can setup a new server by pulling a container', () => {
    expect(() => {dockerHelper.setup(testName, '1.11.1')}).not.toThrow()
  })
})

describe("#getMinecraftContainer", () => {
  test('can retrieve a containers name', () => {
    expect.assertions(1)
    return expect(dockerHelper.getMinecraftContainer(testName)).resolves.toBe(testName)
  })
})
