
var create = require('../src/create');
var _ = require('lodash');

/* eslint-disable no-mixed-requires, max-nested-callbacks, max-len  */
const checkMulti = require('@djforth/morse-jasmine-wp/check_multiple_calls')
  , spyManager = require('@djforth/morse-jasmine-wp/spy_manager')()
  , stubs      = require('@djforth/morse-jasmine-wp/stub_inner')(create);

describe('create', function(){
  let creator, promise, prom, res, rej;
  afterEach(()=>{
    spyManager.removeAll();
    stubs.revertAll(); // Reverts All stubs
  });

  beforeEach(function(){
    stubs.addSpy(['xhrRequest', 'addHeaders', 'createPromise', 'getCSRF']);
    spyManager.addSpy([
      {title: 'headers', opts: ['addCSRF', 'addRails', 'set']}
      , {title: 'xhr', opts: ['get', 'open', 'send']}
    ]);

    stubs.getSpy('getCSRF').and.returnValue({
      token: 'some-token'
      , param: 'some-param'
    });

    spyManager.getSpy('xhr').get.and.returnValue('XMLHttpRequest');

    stubs.getSpy('addHeaders').and.returnValue(spyManager.getSpy('headers'));

    stubs.getSpy('xhrRequest').and.returnValue(spyManager.getSpy('xhr'));

    prom = new Promise(function(resolve, reject){
      res = resolve;
      rej = reject;
    });

    stubs.getSpy('createPromise').and.returnValue({
      promise: prom
      , reject: rej
      , resolve: res
    });

    creator = create('my/json/feed');
    promise = creator({title: 'foo'});
  });

  let fn_calls = {
    'getCSRF': ()=>stubs.getSpy('getCSRF')
    , 'addHeaders': ()=>stubs.getSpy('addHeaders')
    , 'headers.addCSRF': ()=>{
      return spyManager.getSpy('headers').addCSRF;
    }
    , 'headers.addRails': ()=>{
      return spyManager.getSpy('headers').addRails;
    }
    , 'xhrRequest': [()=>stubs.getSpy('xhrRequest')
    , ()=>[res, rej]
    ]
    , 'headers.set': [()=>spyManager.getSpy('headers').set
    , ()=>['XMLHttpRequest']
    ]
    , 'xhr.open': [()=>spyManager.getSpy('xhr').open
    , ()=>['POST', 'my/json/feed']
    ]
  };
  checkMulti(fn_calls);

  it('should return a function', function(){
    expect(_.isFunction(creator)).toBeTruthy();
  });

  it('should success if promise resolved', function(done){
    promise.then(function(data){
      expect(data).toEqual('success');
      let send = spyManager.getSpy('xhr').send;
      expect(send).toHaveBeenCalled();

      let calls = send.calls.argsFor(0)[0];
      expect(calls.title).toEqual('foo');
      expect(_.has(calls, 'some-param')).toBeTruthy();
      expect(calls['some-param']).toEqual('some-token');
    });

    res('success');

    setTimeout(function(){
      done();
    }, 100);
  });

  it('should fail if promise rejected', function(done){
    promise.catch(function(err){
      expect(err).toEqual('fail');
    });

    rej('fail');

    setTimeout(function(){
      done();
    }, 100);
  });
});
/* eslint-enabled */

