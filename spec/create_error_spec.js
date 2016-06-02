const _ = require('lodash');
var err = require('../src/create_error');

var spyManager = require('@djforth/morse-jasmine/spy_manager')()

describe('creates error method', function() {
  let spy, reject;
  beforeEach(function() {
    spyManager.addSpy('reject');
    reject = err(spyManager.getSpy('reject'))
  });

  afterEach(function () {
    spyManager.removeAll();
  });

  it('should return function', function() {
    expect(_.isFunction(reject)).toBeTruthy();
  });

  it('should call spy and throw error', function() {
    expect(()=>{
      return reject('an error')
    }).toThrow(new Error('an error'));

    expect(spyManager.getSpy('reject')).toHaveBeenCalledWith('an error')
  });
});