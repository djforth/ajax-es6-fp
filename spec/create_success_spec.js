const _ = require('lodash');
var suc = require('../src/create_success');
var spyManager = require('@djforth/morse-jasmine/spy_manager')()
  , checkMulti = require('@djforth/morse-jasmine/check_multiple_calls');

describe('creates success function', function() {
  let spy, resolve;
  afterEach(()=>{
    spyManager.removeAll();
  });

  beforeEach(function() {
    spyManager.addSpy(['resolve', 'parse']);
    spyManager.addReturn('parse')('returnValue', 'parsed data');

    resolve = suc(spyManager.getSpy('resolve'), spyManager.getSpy('parse'));
    resolve('data')
  });

  afterEach(function () {
    spyManager.removeAll();
  });

  it('should return a function', function() {
    expect(_.isFunction(resolve)).toBeTruthy();

  });

  let calls = {
    'parse':[()=>spyManager.getSpy('parse')
    , ()=>['data']
    ]
   , 'resolve':[()=>spyManager.getSpy('resolve')
    , ()=>['parsed data']
    ]
  }
  checkMulti(calls);

});