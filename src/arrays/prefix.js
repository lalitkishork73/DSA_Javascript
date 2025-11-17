export function prefix(arr) {
  let prefix = new Array(arr.length);

  prefix[0] = arr[0];
  for (let i = 1; i < arr.length; i++) {
    prefix[i] = prefix[i - 1] + arr[i];
  }

  return prefix;
}
export function prefix_range_sum(arr, start, end) {
  if (start === 0) return arr[end];
  return arr[end] - arr[start - 1];
}
export function prefix_XOR(arr) {
  let prefix = new Array(arr.length);

  prefix[0] = arr[0];
  for (let i = 1; i < arr.length; i++) {
    prefix[i] = prefix[i - 1] ^ arr[i];
  }

  return prefix;
}

export function prefix_range_XOR(arr, start, end) {
  if (start === 0) return arr[end];
  return arr[end] ^ arr[start - 1];
}

export function Subarray_with_XOR(arr, target) {
  let count = 0;
  let prefix = prefix_XOR(arr);

  for (let i of prefix) {
    if (prefix[i] === target) count++;
  }

  return count;
}
export function Unique_Element_Problem(arr) {
  let uniq = [];
  let prefix = prefix_XOR(arr);

  let map = new Map();

  for (let i of prefix) {
    if (!map.has(prefix[i])) {
      map.set(prefix[i], 0);
      uniq.push(prefix[i]);
    }
  }

  return uniq;
}
