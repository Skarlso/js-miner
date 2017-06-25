jest.mock('fs')

const v = require('../utils/version.js');
const config = require('../utils/config.js')
const testName = 'test_container'
const fs = require('fs')

describe("Version File Generator", () => {
  let filename = config.configDir + testName + '.version'
  const MOCK_FILE_INFO = {}
  MOCK_FILE_INFO[filename] = '1.11.1'
  MOCK_FILE_INFO.err = null
  beforeEach(() => {
    fs.__setMockFiles(MOCK_FILE_INFO)
  })
  test('can read version info from a version file', () => {
    expect(v.getServerVersion(testName)).toBe('1.11.1')
  })
  test('can save version info into a version file', () => {
    expect.assertions(1)
    return v.saveServerVersion(testName).then(data => {
      expect(data).toBe('1.11.1')
    })
  })
})
