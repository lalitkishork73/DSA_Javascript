export function countFrequenciesElement(arr) {
  return arr.reduce((acc, curr) => {
    acc[curr] = (acc[curr] | 0) + 1;
    return acc;
  }, {});
}
