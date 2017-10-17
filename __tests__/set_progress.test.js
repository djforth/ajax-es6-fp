import _ from 'lodash';
import set_progress from '../src/set_progress';
import SpyManager from '@djforth/stubs-spy-manager-jest';
const stubsSpies = SpyManager(set_progress);

describe('set_progress', function(){
  let prog, spy;
  afterEach(()=>{
    stubsSpies.reset();
  });

  beforeEach(function(){
    stubsSpies.add([
      {
        spy: 'progress'
      }
    ]);
    stubsSpies.make();

    spy = stubsSpies.get('progress');
    prog = set_progress(spy);
  });

  it('should trigger progress with percentage if computable', function(){
    prog(100, 200, true);

    expect(spy).toHaveBeenCalled();

    let call = spy.mock.calls[0][0];
    expect(call.percent).toEqual(50);
    expect(call.loaded).toEqual(100);
    expect(call.total).toEqual(200);
  });

  it('should trigger progress with 100% if not computable', function(){
    prog(100, 200, false);

    expect(spy).toHaveBeenCalled();

    let call = spy.mock.calls[0][0];
    expect(call.percent).toEqual(100);
    expect(call.loaded).toEqual(100);
    expect(call.total).toEqual(200);
  });
});
