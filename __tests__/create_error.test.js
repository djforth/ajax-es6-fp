import _ from 'lodash';
import err from '../src/create_error';
import SpyManager from '@djforth/stubs-spy-manager-jest';
const stubsSpies = SpyManager(err);

describe('creates error method', function(){
  afterEach(()=>{
    stubsSpies.reset();
  });

  let spy, reject;
  beforeEach(function(){
    stubsSpies.add([
      {
        spy: 'parse'
        , callback: 'error'
      }
      ,{
        spy: 'reject'
      }
    ]);
    stubsSpies.make();
    reject = err(stubsSpies.get('reject'), stubsSpies.get('parse'));
  });


  it('should return function', function(){
    expect(reject).toBeFunction();
  });

  it('should call spy and throw error', function(){
    reject('error', 'can\'t be found', 404);

    expect(stubsSpies.get('reject')).toHaveBeenCalledWith({error: 'error', status: 'can\'t be found', statusCode: 404});
    expect(stubsSpies.get('parse')).toHaveBeenCalledWith('error');
  });
});
