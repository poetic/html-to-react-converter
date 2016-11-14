/* eslint-env mocha */
const htr = require('../../../lib/index')
const assert = require('assert')

describe('index.js', function () {
  it('should pass', function () {
    assert(!htr())
  })
})
