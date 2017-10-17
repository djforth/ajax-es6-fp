import _ from 'lodash';
import suc from '../src/create_success';
import SpyManager from '@djforth/stubs-spy-manager-jest';
import CallHelper from '@djforth/jest-call-helpers';

describe('creates success function', function(){
  const stubsSpies = SpyManager(suc);
  const callHelper = CallHelper(stubsSpies);
  let spy, resolve;
  afterEach(()=>{
    stubsSpies.reset();
  });

  beforeEach(function(){
    stubsSpies.add([
      {
        spy: 'parse'
        , callback: 'parsed data'
      }
      , {
        spy: 'reject'
        , callback: 'reject'
      }
    ]);
    stubsSpies.make();


    resolve = suc(stubsSpies.get('reject'), stubsSpies.get('parse'));
    resolve('data');
  });

  it('should return a function', function(){
    expect(resolve).toBeFunction();
  });

  callHelper.add([
    ['parse', ['data']]
    , ['reject', ['parsed data']]
  ]);

  callHelper.checkCalls();
  callHelper.reset();
});
