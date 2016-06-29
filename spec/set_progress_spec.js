const _ = require('lodash');

var set_progress = require('../src/set_progress');

const checkCalls = require("@djforth/morse-jasmine/check_calls")
  , getMod     = require("@djforth/morse-jasmine/get_module")(set_progress)
  , spyManager = require("@djforth/morse-jasmine/spy_manager")()
  , stubs      = require("@djforth/morse-jasmine/stub_inner")(set_progress);

describe('set_progress', function() {
  let prog, spy;
  afterEach(()=>{
    spyManager.removeAll();
  });

  beforeEach(function() {
    spyManager.addSpy('progress');
    spy = spyManager.getSpy('progress');
    prog = set_progress(spy);
  });

  it('should trigger progress with percentage if computable', function() {
    prog(100, 200, true);

    expect(spy).toHaveBeenCalled();

    let call = spy.calls.argsFor(0)[0];
    expect(call.percent).toEqual(50);
    expect(call.loaded).toEqual(100);
    expect(call.total).toEqual(200);
  });

  it('should trigger progress with 100% if not computable', function() {
    prog(100, 200, false);

    expect(spy).toHaveBeenCalled();

    let call = spy.calls.argsFor(0)[0];
    expect(call.percent).toEqual(100);
    expect(call.loaded).toEqual(100);
    expect(call.total).toEqual(200);
  });
});