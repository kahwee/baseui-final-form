// @flow
import {uniqueConcat} from '../unique-concat';

describe('select/unique-concat', () => {
  const positives = [
    // [0] arr1
    // [1] arr2
    // [2] output
    [
      [{id: 'a'}, {id: 'b'}],
      [{id: 'a'}, {id: 'b'}],
      [{id: 'a'}, {id: 'b'}],
    ],
    [[{id: 'a'}], [{id: 'a'}, {id: 'b'}], [{id: 'a'}, {id: 'b'}]],
    [[{id: 'b'}], [{id: 'a'}, {id: 'b'}], [{id: 'b'}, {id: 'a'}]],
    [[{id: 'b'}], [], [{id: 'b'}]],
    [[], [], []],
    [[], [{id: 'b'}], [{id: 'b'}]],
    [[], [{id: 'b', hello: 'world'}], [{id: 'b', hello: 'world'}]],
    [[], [{id: 'b'}, {id: 'a'}], [{id: 'b'}, {id: 'a'}]],
  ];

  it('should run through positives', () => {
    positives.forEach(positive => {
      expect(uniqueConcat(positive[0], positive[1])).toEqual(positive[2]);
    });
  });
});
