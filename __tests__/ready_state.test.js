import ready_state from '../src/ready_state';
import SpyManager from '@djforth/stubs-spy-manager-jest';
const stubsSpies = SpyManager(ready_state);

describe('readyState', function(){
  let readyState, status, xhr;
  afterEach(()=>{
    stubsSpies.reset();
  });

  beforeEach(function(){
    xhr = {
      status: 200
      , readyState: 4
      , statusText: 404
      , responseText: 'a response'
    };
    stubsSpies.add([
      {
        spy: 'suc'
      }
      , {
        spy: 'err'
      }
      , {
        spy: 'status'
        , callback: ()=>status
      }
    ]);
    stubsSpies.make();

    readyState = ready_state(
      stubsSpies.get('suc')
      , stubsSpies.get('err')
      , stubsSpies.get('status')
    );
  });

  it('should call nothing with status of 0', function(){
    status = 0;
    readyState(xhr);
    expect(stubsSpies.get('suc')).not.toHaveBeenCalled();
    expect(stubsSpies.get('err')).not.toHaveBeenCalled();
    expect(stubsSpies.get('status')).toHaveBeenCalledWith(200, 4);
  });

  it('should call error with status of -1', function(){
    status = -1;
    readyState(xhr);
    expect(stubsSpies.get('suc')).not.toHaveBeenCalled();
    expect(stubsSpies.get('err')).toHaveBeenCalledWith('a response', 404, 200);
    expect(stubsSpies.get('status')).toHaveBeenCalledWith(200, 4);
  });

  it('should call success with status of 1', function(){
    status = 1;
    readyState(xhr);
    expect(stubsSpies.get('suc')).toHaveBeenCalledWith('a response');
    expect(stubsSpies.get('err')).not.toHaveBeenCalled();
    expect(stubsSpies.get('status')).toHaveBeenCalledWith(200, 4);
  });
});
