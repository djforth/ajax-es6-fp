import ready_state from '../src/ready_state';
import SpyManager from '@djforth/morse-jasmine-wp/spy_manager';
const spyManager = SpyManager();

describe('readyState', function(){
  let readyState, status, xhr;
  afterEach(()=>{
    spyManager.removeAll();
  });

  beforeEach(function(){
    xhr = {
      status: 200
      , readyState: 4
      , statusText: 404
      , responseText: 'a response'
    };

    spyManager.addSpy(['suc', 'err', 'status']);
    spyManager.addReturn('status')('callFake', ()=>status);
    readyState = ready_state(
      spyManager.getSpy('suc')
      , spyManager.getSpy('err')
      , spyManager.getSpy('status')
    );
  });

  afterEach(function(){
    spyManager.removeAll();
  });

  it('should call nothing with status of 0', function(){
    status = 0;
    readyState(xhr);
    expect(spyManager.getSpy('suc')).not.toHaveBeenCalled();
    expect(spyManager.getSpy('err')).not.toHaveBeenCalled();
    expect(spyManager.getSpy('status')).toHaveBeenCalledWith(200, 4);
  });

  it('should call error with status of -1', function(){
    status = -1;
    readyState(xhr);
    expect(spyManager.getSpy('suc')).not.toHaveBeenCalled();
    expect(spyManager.getSpy('err')).toHaveBeenCalledWith('a response', 404, 200);
    expect(spyManager.getSpy('status')).toHaveBeenCalledWith(200, 4);
  });

  it('should call success with status of 1', function(){
    status = 1;
    readyState(xhr);
    expect(spyManager.getSpy('suc')).toHaveBeenCalledWith('a response');
    expect(spyManager.getSpy('err')).not.toHaveBeenCalled();
    expect(spyManager.getSpy('status')).toHaveBeenCalledWith(200, 4);
  });
});
