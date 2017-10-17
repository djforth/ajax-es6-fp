import patch from '../src/patch';

import SpyManager from '@djforth/stubs-spy-manager-jest';
import CallHelper from '@djforth/jest-call-helpers';

describe('patch', function(){
  const stubsSpies = SpyManager(patch);
  const callHelper = CallHelper(stubsSpies);

  afterEach(()=>{
    stubsSpies.reset();
  });

  describe('patch method', function(){
    let patching, promise, prom, res, rej;
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
          spy: 'url_id'
          , callback: (id)=>`my/json/feed/${id}`
        }
        , {
          spy: 'data_set'
          , callback: 'some data'
        }
        , {
          stub: 'add_id'
          , spy: 'url_id'
        }
        , {
          stub: 'addMethod'
          , spy: 'data_set'
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
      patching = patch('my/json/feed');
      promise = patching({content: 'data'}, 1);
    });

    callHelper.add([
      ['getCSRF']
      , ['addHeaders']
      , ['add_id', ['my/json/feed']]
      , ['addMethod', [{
        token: 'some-token'
        , param: 'some-param'
      }, 'patch']]
      , ['headers.addRails']
      , ['xhrRequest', [()=>res, ()=>rej]]
      , ['headers.set', ['XMLHttpRequest']]
      , ['url_id', [1]]
      , ['data_set']
      , ['xhr.open', ['PUT', 'my/json/feed/1']]
      , ['xhr.send', ['some data']]
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
});
/* eslint-enabled */

