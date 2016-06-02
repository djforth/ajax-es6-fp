const _ = require('lodash');

var check = require('../src/check_status');

describe('checkStatus', function() {

  it('should return 0 if not in error on completed state', function() {
    expect(check(200, 1)).toEqual(0)
  });

  it('should return 1 if in completed state', function() {
    expect(check(200, 4)).toEqual(1)
  });

  it('should return -1 if in completed state with error', function() {
    expect(check(500, 4)).toEqual(-1)
  });
});