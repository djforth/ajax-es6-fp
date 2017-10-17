import _ from 'lodash';
import destroy from '../src/destroy';
import SpyManager from '@djforth/stubs-spy-manager-jest';
import CallHelper from '@djforth/jest-call-helpers';


describe('destroy', function(){
  const stubsSpies = SpyManager(destroy);
  const callHelper = CallHelper(stubsSpies);
  afterEach(()=>{
    stubsSpies.reset();
  });

  describe('destroy method', function(){
    let kill, promise, prom, res, rej;
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
          , callback: 'XMLHttpRequest'
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

      kill = destroy('my/json/feed');
      promise = kill(1);
    });

    callHelper.add([
      ['getCSRF']
      , ['addHeaders']
      , ['add_id', ['my/json/feed']]
      , ['addMethod', [{
        token: 'some-token'
        , param: 'some-param'
      }, 'delete']]
      , ['headers.addRails']
      , ['xhrRequest', [()=>res, ()=>rej]]
      , ['headers.set', ['XMLHttpRequest']]
      , ['url_id', [1]]
      , ['data_set']
      , ['xhr.open', ['DELETE', 'my/json/feed/1']]
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

