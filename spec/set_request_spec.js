const _ = require('lodash');

var set_request = require('../src/set_request');

/* Globals jasmine*/

/* eslint-disable no-mixed-requires, max-nested-callbacks, max-len  */
const checkMulti = require('@djforth/morse-jasmine-wp/check_multiple_calls')
  , getMod     = require('@djforth/morse-jasmine-wp/get_module')(set_request)
  , spyManager = require('@djforth/morse-jasmine-wp/spy_manager')()
  , stubs      = require('@djforth/morse-jasmine-wp/stub_inner')(set_request);

function createDummyListener(event){
  return function(xhr, handler){
    xhr.addEventListener(event, function(evt){
      handler(evt, xhr);
    });
  };
}

describe('set_request', function(){
  afterEach(function(){
    spyManager.removeAll();
    stubs.revertAll();
  });

  describe('inner methods', function(){
    describe('addError', function(){
      let addError, xhr, err;
      beforeEach(function(){
        addError = getMod('addError');
        spyManager.addSpy([{title: 'xhr', opts: ['addEventListener']}, 'err']);
        xhr = spyManager.getSpy('xhr');
        err = spyManager.getSpy('err');
        addError(xhr, err);
      });

      describe('error event listener ', function(){
        let calls;
        beforeEach(function(){
          calls = xhr.addEventListener.calls.argsFor(0);
        });

        it('should set up error listener ', function(){
          expect(xhr.addEventListener);
          expect(calls[0]).toEqual('error');
          expect(_.isFunction(calls[1])).toBeTruthy();
        });

        it('should call err message in callback', function(){
          calls[1]({error: {message: 'with some error'}});
          expect(err).toHaveBeenCalledWith('Network Error: with some error');
        });
      });

      describe('abort event listener ', function(){
        let calls;
        beforeEach(function(){
          calls = xhr.addEventListener.calls.argsFor(1);
        });

        it('should set up abort listener ', function(){
          expect(xhr.addEventListener);
          expect(calls[0]).toEqual('abort');
          expect(_.isFunction(calls[1])).toBeTruthy();
        });

        it('should call err message in callback', function(){
          calls[1]({error: {message: 'with some error'}});
          expect(err).toHaveBeenCalledWith('Network Abort: with some error');
        });
      });
    });

    describe('addProgress', function(){
      let addProgress, calls, xhr, prog;
      beforeEach(function(){
        addProgress = getMod('addProgress');
        stubs.addSpy('progressFn');
        spyManager.addSpy([{title: 'xhr', opts: ['addEventListener']}, 'prog']);
        xhr = spyManager.getSpy('xhr');
        prog = spyManager.getSpy('prog');
        stubs.getSpy('progressFn').and.returnValue(prog);
        addProgress(xhr, prog);
        calls = xhr.addEventListener.calls.argsFor(0);
      });

      it('should set up progress listener ', function(){
        expect(xhr.addEventListener);
        expect(calls[0]).toEqual('progress');
        expect(_.isFunction(calls[1])).toBeTruthy();
      });

      let fn_calls = {
        progress: [()=>stubs.getSpy('progressFn')
        , ()=>[prog]
        ]
        , callback: [()=>{
          calls[1]({loaded: 20, total: 120, lengthComputable: true});
          return prog;
        }, ()=>[20, 120, true]]
      };
      checkMulti(fn_calls);
    });

    describe('addReadyState', function(){
      let addReadyState, calls, xhr, stateChange;
      beforeEach(function(){
        addReadyState = getMod('addReadyState');
        spyManager.addSpy([{title: 'xhr', opts: ['addEventListener']}, 'stateChange']);
        xhr = spyManager.getSpy('xhr');
        stateChange = spyManager.getSpy('stateChange');
        addReadyState(xhr, stateChange);
        calls = xhr.addEventListener.calls.argsFor(0);
      });

      it('should set up progress listener ', function(){
        expect(xhr.addEventListener);
        expect(calls[0]).toEqual('readystatechange');
        expect(_.isFunction(calls[1])).toBeTruthy();
      });

      let fn_calls = {
        callback: [()=>{
          calls[1]();
          return stateChange;
        }, ()=>[xhr]]
      };
      checkMulti(fn_calls);
    });
  });

  describe('create a XHR', function(){
    let xhr, xhr_request, requests;
    beforeEach(function(){
      xhr_request = sinon.useFakeXMLHttpRequest();
      requests = [];
      xhr_request.onCreate = function(xhr){
        requests.push(xhr);
      };

      stubs.addSpy([
        'errorFn'
        , 'addError'
        , 'addProgress'
        , 'addReadyState'
        , 'checkStatus'
        , 'parseData'
        , 'progressFn'
        , 'readyState'
        , 'successFn']
      );

      spyManager.addSpy(['err', 'prog', 'resolve', 'reject', 'suc', 'stateChange']);

      stubs.getSpy('addError').and.callFake(createDummyListener('error'));

      stubs.getSpy('addProgress').and.callFake(createDummyListener('progress'));

      stubs.getSpy('addReadyState').and.callFake(createDummyListener('readystatechange'));

      stubs.getSpy('errorFn').and.returnValue(spyManager.getSpy('err'));
      stubs.getSpy('successFn').and.returnValue(spyManager.getSpy('suc'));
      stubs.getSpy('readyState').and.returnValue(spyManager.getSpy('stateChange'));
      stubs.getSpy('progressFn').and.returnValue(spyManager.getSpy('prog'));

      xhr = set_request(spyManager.getSpy('resolve'), spyManager.getSpy('reject'));
    });

    afterEach(function(){
      xhr_request.restore();
    });

    let calls = {
      errorFn: [()=>stubs.getSpy('errorFn')
      , ()=>[spyManager.getSpy('reject')]
      ]
     , successFn: [()=>stubs.getSpy('successFn')
      , ()=>[spyManager.getSpy('resolve'), stubs.getSpy('parseData')]
     ]
      , readyState: [()=>stubs.getSpy('readyState')
      , ()=>[spyManager.getSpy('suc'), spyManager.getSpy('err'), stubs.getSpy('checkStatus')]
      ]
    };
    checkMulti(calls);

    it('should set error', function(){
      let error = stubs.getSpy('addError');
      expect(error).toHaveBeenCalled();
      let args = error.calls.argsFor(0);
      expect(args[1]).toEqual(spyManager.getSpy('err'));
    });

    it('should set readyState', function(){
      let readState = stubs.getSpy('addReadyState');
      expect(readState).toHaveBeenCalled();
      let args = readState.calls.argsFor(0);
      expect(args[1]).toEqual(spyManager.getSpy('stateChange'));
    });

    describe('check request', function(){
      beforeEach(function(){
        xhr.open('GET', '/some/json');
        xhr.send();
      });

      it('should set up xhr request', function(){
        expect(requests[0].url).toBe('/some/json');
      });

      it('should onstatechange if 200 returned', function(){
        requests[0].respond(200, {
          contentType: 'application/json'
          , responseText: 'Success'
        });

        expect(spyManager.getSpy('stateChange')).toHaveBeenCalled();
      });

      xit('should error if 500 returned', function(){
        requests[0].respond(500, {
          contentType: 'application/json'
          , responseText: 'An Error'
        });

        expect(spyManager.getSpy('reject')).toHaveBeenCalled();
      });



      // describe('progress', function(){

      // });
    });
  });
});

/* eslint-enable*/
