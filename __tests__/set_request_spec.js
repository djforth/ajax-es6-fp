import _ from 'lodash';
import set_request from '../src/set_request';
import sinon from 'sinon';
import SpyManager from '@djforth/stubs-spy-manager-jest';
import CallHelper from '@djforth/jest-call-helpers';

function createDummyListener(event){
  return function(xhr, handler){
    xhr.addEventListener(event, function(evt){
      handler(evt, xhr);
    });
  };
}

describe('set_request', function(){
  const stubsSpies = SpyManager(set_request);
  const callHelper = CallHelper(stubsSpies);

  afterEach(function(){
    stubsSpies.reset();
  });

  describe('inner methods', function(){
    describe('addError', function(){
      let addError, xhr, err;
      beforeEach(function(){
        stubsSpies.add([
          {
            spy: 'err'
          }
          , {
            spy: 'xhr.addEventListener'
          }
        ]);
        stubsSpies.make();
        addError = stubsSpies.getFn('addError');
        // spyManager.addSpy([{title: 'xhr', opts: ['addEventListener']}, 'err']);
        xhr = stubsSpies.get('xhr');
        err = stubsSpies.get('err');
        addError(xhr, err);
      });

      describe('error event listener ', function(){
        let calls;
        beforeEach(function(){
          calls = xhr.addEventListener.mock.calls[0];
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
          calls = xhr.addEventListener.mock.calls[1];
          console.log(calls);
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
        stubsSpies.add([
          {
            spy: 'prog'
          }
          , {
            stub: 'progressFn'
            , spy: 'prog'
          }
          , {
            spy: 'xhr.addEventListener'
          }
        ]);
        stubsSpies.make();
        addProgress = stubsSpies.getFn('addProgress');
        xhr = stubsSpies.get('xhr');
        prog = stubsSpies.get('prog');

        addProgress(xhr, prog);
        calls = xhr.addEventListener.mock.calls[0];
      });

      it('should set up progress listener ', function(){
        expect(xhr.addEventListener);
        expect(calls[0]).toEqual('progress');
        expect(calls[1]).toBeFunction();
      });

      callHelper.add([
        ['progressFn', [()=>prog]]
      ]);

      callHelper.checkCalls();
      callHelper.reset();

      xtest('Progress function should return the correct attribute', ()=>{
        const progAttrs = calls[1]({loaded: 20, total: 120, lengthComputable: true});
        console.log(progAttrs);
        expect(progAttrs[0]).toEqual(20);
        expect(progAttrs[1]).toEqual(120);
        expect(progAttrs[2]).toBeTruthy();
      });

      // let fn_calls = {
      //   progress: [()=>stubs.getSpy('progressFn')
      //   , ()=>[prog]
      //   ]
      //   , callback: [()=>{
      //     calls[1]({loaded: 20, total: 120, lengthComputable: true});
      //     return prog;
      //   }, ()=>[20, 120, true]]
      // };
      // checkMulti(fn_calls);
    });

    describe('addReadyState', function(){
      let addReadyState, calls, xhr, stateChange;
      beforeEach(function(){
        stubsSpies.add([
          {
            spy: 'stateChange'
          }
          , {
            spy: 'xhr.addEventListener'
          }
        ]);
        stubsSpies.make();
        addReadyState = stubsSpies.getFn('addReadyState');

        xhr = stubsSpies.get('xhr');
        stateChange = stubsSpies.get('stateChange');
        addReadyState(xhr, stateChange);
        calls = xhr.addEventListener.mock.calls[0];
      });

      it('should set up progress listener ', function(){
        expect(xhr.addEventListener);
        expect(calls[0]).toEqual('readystatechange');
        expect(calls[1]).toBeFunction();
      });

      // let fn_calls = {
      //   callback: [()=>{
      //     calls[1]();
      //     return stateChange;
      //   }, ()=>[xhr]]
      // };
      // checkMulti(fn_calls);
      // test('Progress function should return the correct attribute', ()=>{
      //   const [loaded, total, lengthComputable] = calls[1]({loaded: 20, total: 120, lengthComputable: true});
      //   expect(loaded).toEqual(20);
      //   expect(total).toEqual(120);
      //   expect(lengthComputable).toBeTruthy();
      // });
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

      stubsSpies.add([
        {
          spy: 'err'
        }
        , {
          spy: 'prog'
        }
        , {
          spy: 'resolve'
        }, {
          spy: 'reject'
        }
        , {
          spy: 'suc'
        }
        , {
          spy: 'stateChange'
        }
        , {
          stub: 'errorFn'
          , spy: 'err'
        }
        , {
          stub: 'addError'
          , callback: ()=>createDummyListener('error')
        }
        , {
          stub: 'addProgress'
          , callback: ()=>createDummyListener('progress')
        }
        , {
          stub: 'addReadyState'
          , callback: ()=>createDummyListener('readystatechange')
        }
        , {
          stub: 'checkStatus'
        }
        , {
          stub: 'parseData'
        }
        , {
          stub: 'progressFn'
          , spy: 'prog'
        }
        , {
          stub: 'readyState'
          , spy: 'stateChange'
        }
        , {
          stub: 'successFn'
          , spy: 'suc'
        }
      ]);
      stubsSpies.make();

      xhr = set_request(stubsSpies.get('resolve'), stubsSpies.get('reject'));
    });

    afterEach(function(){
      xhr_request.restore();
    });

    callHelper.add([
      ['errorFn', [()=>stubsSpies.get('reject')]]
      , ['successFn', [()=>stubsSpies.get('resolve'), ()=>stubsSpies.get('parseData')]]
      , ['readyState', [()=>stubsSpies.get('suc'), ()=>stubsSpies.get('err'), ()=>stubsSpies.get('checkStatus')]]
    ]);

    callHelper.checkCalls();
    callHelper.reset();

    it('should set error', function(){
      let error = stubsSpies.get('addError');
      expect(error).toHaveBeenCalled();
      let args = error.mock.calls[0];
      expect(args[1]).toEqual(stubsSpies.get('err'));
    });

    it('should set readyState', function(){
      let readState = stubsSpies.get('addReadyState');
      expect(readState).toHaveBeenCalled();
      let args = readState.mock.calls[0];
      expect(args[1]).toEqual(stubsSpies.get('stateChange'));
    });

    describe('check request', function(){
      beforeEach(function(){
        xhr.open('GET', '/some/json');
        xhr.send();
      });

      it('should set up xhr request', function(){
        expect(requests[0].url).toBe('/some/json');
      });

      xit('should onstatechange if 200 returned', function(){
        requests[0].respond(200, {
          contentType: 'application/json'
          , responseText: 'Success'
        });

        expect(stubsSpies.get('stateChange')).toHaveBeenCalled();
      });
    });
  });
});

/* eslint-enable*/
