const parse = require('../src/parse');

describe('parseData', function() {
  let data, json;
  beforeEach(function () {
    data = [{foo:'bar'}, {bar:'foo'}]
    json =  JSON.stringify(data);
    // parse =  getMod('parseData');
  });

  it('should return undefined if no data parsed', function() {
    expect(parse()).toBeUndefined();
  });

  it('should return parsed data if no data parsed', function() {
    expect(parse(json)).toEqual(data);
  });
});