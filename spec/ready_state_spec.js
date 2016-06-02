
const _ = require('lodash');
var ready_state = require('../src/ready_state');
var spyManager = require('@djforth/morse-jasmine/spy_manager')();

describe('readyState', function() {
  let readyState, status, xhr;
  beforeEach(function() {
    xhr = {
      status: 200
      , readyState: 4
      , statusText: 'an error'
      , responseText: 'data'
    }

    spyManager.addSpy(['suc', 'err', 'status']);
    spyManager.addReturn('status')('callFake', ()=>status);
    readyState = ready_state(
      spyManager.getSpy('suc')
      , spyManager.getSpy('err')
      , spyManager.getSpy('status')
    );

  });

  afterEach(function () {
    spyManager.removeAll();
  });

  it('should call nothing with status of 0', function() {
    status = 0;
    readyState(xhr);
    expect(spyManager.getSpy('suc')).not.toHaveBeenCalled();
    expect(spyManager.getSpy('err')).not.toHaveBeenCalled();
    expect(spyManager.getSpy('status')).toHaveBeenCalledWith(200, 4)
  });

   it('should call error with status of -1', function() {
    status = -1;
    readyState(xhr);
    expect(spyManager.getSpy('suc')).not.toHaveBeenCalled();
    expect(spyManager.getSpy('err')).toHaveBeenCalledWith('an error');
    expect(spyManager.getSpy('status')).toHaveBeenCalledWith(200, 4)
  });

  it('should call success with status of 1', function() {
    status = 1;
    readyState(xhr);
    expect(spyManager.getSpy('suc')).toHaveBeenCalledWith('data');
    expect(spyManager.getSpy('err')).not.toHaveBeenCalled();
    expect(spyManager.getSpy('status')).toHaveBeenCalledWith(200, 4)

  });
});