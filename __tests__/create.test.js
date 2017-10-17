
 import create from '../src/create';
 import _ from 'lodash';

/* eslint-disable no-mixed-requires, max-nested-callbacks, max-len  */
import SpyManager from '@djforth/stubs-spy-manager-jest';
import CallHelper from '@djforth/jest-call-helpers';

describe('create', function(){
  const stubsSpies = SpyManager(create);
  const callHelper = CallHelper(stubsSpies);
  let creator, promise, prom, res, rej;
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
        spy: 'headers.addCSRF'
      }
      , {
        spy: 'headers.addRails'
      }
      , {
        spy: 'headers.set'
      }
      , {
        stub: 'addHeaders'
        , spy: 'headers'
      }
      , {
        stub: 'createPromise'
        , callback: ()=>({
          promise: prom
          , reject: rej
          , resolve: res
        })
      }
      , {
        stub: 'getCSRF'
        , callback: ()=>({
          token: 'some-token'
          , param: 'some-param'
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
    creator = create('my/json/feed');
    promise = creator({title: 'foo'});
  });

  callHelper.add([
    ['getCSRF']
    , ['addHeaders']
    , ['headers.addCSRF']
    , ['headers.addRails']
    , ['xhrRequest', [()=>res, ()=>rej]]
    , ['headers.set', ['XMLHttpRequest']]
  ]);

  callHelper.checkCalls();
  callHelper.reset();

  it('should return a function', function(){
    expect(creator).toBeFunction();
    // expect(_.isFunction(creator)).toBeTruthy();
  });

  it('should success if promise resolved', function(done){
    promise.then(function(data){
      expect(data).toEqual('success');
      let send = stubsSpies.get('xhr').send;
      expect(send).toHaveBeenCalled();
      let calls = send.mock.calls[0][0];
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

