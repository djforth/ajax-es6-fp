const _ = require('lodash');
var err = require('../src/create_error');

var spyManager = require('@djforth/morse-jasmine/spy_manager')();

describe('creates error method', function() {
  afterEach(()=>{
    spyManager.removeAll();
  });

  let spy, reject;
  beforeEach(function() {
    spyManager.addSpy(['reject', 'parse']);
    spyManager.addReturn('parse')('returnValue', 'error')
    reject = err(spyManager.getSpy('reject'), spyManager.getSpy('parse'));
  });

  afterEach(function () {
    spyManager.removeAll();
  });

  it('should return function', function() {
    expect(_.isFunction(reject)).toBeTruthy();
  });

  it('should call spy and throw error', function() {
    reject('an error', 404);

    expect(spyManager.getSpy('reject')).toHaveBeenCalledWith('error', 404);
    expect(spyManager.getSpy('parse')).toHaveBeenCalledWith('an error')
  });
});