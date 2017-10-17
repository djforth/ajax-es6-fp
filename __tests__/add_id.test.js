import _ from 'lodash';
import add_id from '../src/add_id';

/* eslint-disable no-mixed-requires, max-nested-callbacks, max-len  */

describe('add_id', function(){
  let url_id;
  beforeEach(function(){
    url_id = add_id('some/url');
  });
  it('should add_id', function(){
    expect(_.isFunction(url_id)).toBeTruthy();
    expect(url_id(1)).toEqual('some/url/1');
  });
});
/* eslint-enable */
