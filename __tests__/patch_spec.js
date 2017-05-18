import patch from '../src/patch';

/* eslint-disable no-mixed-requires, max-nested-callbacks, max-len  */
import checkMulti from '@djforth/morse-jasmine-wp/check_multiple_calls';
import SpyManager from '@djforth/morse-jasmine-wp/spy_manager';
const spyManager = SpyManager();
import Stubs from '@djforth/morse-jasmine-wp/stub_inner';
const stubs = Stubs(patch);

describe('patch', function(){
  afterEach(()=>{
    spyManager.removeAll();
    stubs.revertAll(); // Reverts All stubs
  });

  describe('patch method', function(){
    let patching, promise, prom, res, rej;
    beforeEach(function(){
      stubs.addSpy(['add_id', 'xhrRequest', 'addHeaders', 'createPromise', 'getCSRF', 'addMethod']);

      spyManager.addSpy([
        {title: 'headers', opts: ['addCSRF', 'addRails', 'set']}
        , {title: 'xhr', opts: ['get', 'open', 'send']}
        , 'url_id'
        , 'data_set'
      ]);

      spyManager.getSpy('xhr').get.and.returnValue('XMLHttpRequest');
      spyManager.addReturn('url_id')('callFake', (id)=>`my/json/feed/${id}`);
      spyManager.addReturn('data_set')('returnValue', 'some data');
      stubs.getSpy('addMethod').and.returnValue(spyManager.getSpy('data_set'));

      stubs.getSpy('getCSRF').and.returnValue({
        token: 'some-token'
        , param: 'some-param'
      });

      stubs.getSpy('add_id').and.returnValue(spyManager.getSpy('url_id'));

      stubs.getSpy('xhrRequest').and.returnValue(spyManager.getSpy('xhr'));

      stubs.getSpy('addHeaders').and.returnValue(spyManager.getSpy('headers'));

      prom = new Promise(function(resolve, reject){
        res = resolve;
        rej = reject;
      });

      stubs.getSpy('createPromise').and.returnValue({
        promise: prom
        , reject: rej
        , resolve: res
      });

      patching = patch('my/json/feed');
      promise = patching({content: 'data'}, 1);
    });

    let fn_calls = {
      'addHeaders': ()=>stubs.getSpy('addHeaders')
      , 'headers.addCSRF': ()=>{
        return spyManager.getSpy('headers').addCSRF;
      }
      , 'add_id': [()=>stubs.getSpy('add_id')
      , ()=>['my/json/feed']
      ]
      , 'addMethod': [()=>stubs.getSpy('addMethod')
      , ()=>[{
        token: 'some-token'
        , param: 'some-param'
      }, 'patch']
      ]
      , 'headers.addRails': ()=>{
        return spyManager.getSpy('headers').addRails;
      }
      , 'xhrRequest': [()=>stubs.getSpy('xhrRequest')
      , ()=>[res, rej]
      ]
      , 'headers.set': [()=>spyManager.getSpy('headers').set
      , ()=>['XMLHttpRequest']
      ]
      , 'url_id': [()=>spyManager.getSpy('url_id')
      , ()=>[1]
      ]
      , 'data_set': [()=>spyManager.getSpy('data_set')
      , ()=>[{'content': 'data', 'some-param': 'some-token'}]
      ]
      , 'xhr.open': [()=>spyManager.getSpy('xhr').open
      , ()=>['PUT', 'my/json/feed/1']
      ]
      , 'xhr.send': [()=>spyManager.getSpy('xhr').send
      , ()=>['some data']]
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
});
/* eslint-enabled */
