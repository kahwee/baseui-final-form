// @flow

export function uniqueConcat<T>(
  arr1: Array<T>,
  arr2: Array<T>,
  idKey: string = 'id'
): Array<T> {
  return arr1.concat<T, T>(
    arr2.reduce<T>((valA, valB) => {
      // $FlowFixMe
      const found = arr1.some<T>(val1 => val1[idKey] === valB[idKey]);
      if (found) {
        return valA;
      } else {
        // $FlowFixMe
        return [...valA, valB];
      }
      // $FlowFixMe
    }, [])
  );
}
