
 import fetch from '../src/fetch';

 import SpyManager from '@djforth/stubs-spy-manager-jest';
 import CallHelper from '@djforth/jest-call-helpers';


describe('fetch', function(){
  let promise, prom, res, rej;
  const stubsSpies = SpyManager(fetch);
  const callHelper = CallHelper(stubsSpies);
  afterEach(()=>{
    stubsSpies.reset();
  });

  beforeEach(function(){
    prom = new Promise(function(resolve, reject){
      res = resolve;
      rej = reject;
    });

    stubsSpies.add([
     {
        stub: 'createPromise'
        , callback: ()=>({
          promise: prom
          , reject: rej
          , resolve: res
        })
      }
      , {
        spy: 'xhr.get'
        , callback: 'XMLHttpRequest'
      }
      , {
        spy: 'xhr.open'
      }
      , {
        spy: 'xhr.send'
      }
      , {
        stub: 'xhrRequest'
        , spy: 'xhr'
      }
    ]);
    stubsSpies.make();
    promise = fetch('my/json/feed')();
  });

  callHelper.add([
    ['xhrRequest', [()=>res, ()=>rej]]
    , ['xhr.open', ['GET', 'my/json/feed']]
    , ['xhr.send']
  ]);
  callHelper.checkCalls();
  callHelper.reset();


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

