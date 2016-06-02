
var fetch = require('../src/fetch');

/* eslint-disable no-mixed-requires, max-nested-callbacks, max-len  */
const checkMulti = require('@djforth/morse-jasmine/check_multiple_calls')
  , spyManager = require('@djforth/morse-jasmine/spy_manager')()
  , stubs      = require('@djforth/morse-jasmine/stub_inner')(fetch);

describe('fetch', function(){
  let promise, prom, res, rej;
  beforeEach(function(){
    stubs.addSpy(['xhrRequest', 'createPromise']);
    spyManager.addSpy([
      {title: 'xhr', opts: ['get', 'open', 'send']}
    ]);

    spyManager.getSpy('xhr').get.and.returnValue('XMLHttpRequest');

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

    promise = fetch('my/json/feed')();
  });

  let fn_calls = {
    'xhrRequest': [()=>stubs.getSpy('xhrRequest')
    , ()=>[res, rej]
    ]
    , 'xhr.open': [()=>spyManager.getSpy('xhr').open
    , ()=>['GET', 'my/json/feed']
    ]
    , 'xhr.send': ()=>spyManager.getSpy('xhr').send
  };
  checkMulti(fn_calls);

  it('should success if promise resolved', function(done){
    promise.then(function(data){
      expect(data).toEqual('success');
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

