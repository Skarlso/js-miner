var mock = require('mock-fs');
var fs = require('fs')
var expect = require('chai').expect;
var v = require('../utils/version.js');
var config = require('../utils/config.js')

var testName = 'test_container'

describe("Version File Generator", () => {
  beforeEach(() => {
    let filename = config.configDir + testName + '.version'
    params = {}
    params[filename] = '1.11.1'
    params[config.configDir] = {}
    mock(params);
  })

  afterEach(mock.restore)

  describe("#getServerVersion", () => {
    it("retrieves a version for a given container", () => {
      expect(v.getServerVersion(testName)).to.be.equal('1.11.1')
    })
  })

  describe("#saveServerVersion", () => {
    it("saves a given version into a specific file", () => {
      return v.saveServerVersion('non_existing', '1.11.1').then((data) => {
        expect(data).to.equal('1.11.1')
      })
    })
  })
})
