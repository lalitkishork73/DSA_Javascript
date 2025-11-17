//slding window maximum sum of subarray of size k
export function slidingWindow(arr, size) {
  let max = 0,
    temp = 0;

  for (let i = 0; i < size; i++) {
    temp += arr[i];
  }

  max = temp;

  for (let i = size; i < arr.length; i++) {
    temp += arr[i] - arr[i - size];
    max = Math.max(max, temp);
  }

  return max;
  // Time complexity O(n)
  // Space complexity O(1)
}

//brute force approach

export function slidingWindowBruteForce(arr, size) {
  let max = 0;
  for (let i = 0; i < arr.length - size; i++) {
    let sum = 0;
    for (let j = i; j < i + size; j++) {
      sum += arr[j];
    }
    max = Math.max(max, sum);
  }

  return max;

  // Time complexity O(n^2)
  // Space complexity O(1)\
}

// prefix sum method Slding window maximum sum of subarray of size k

export function slidingWindowPrefixSum(arr, size) {
  let prefix = new Array(arr.length);
  prefix[0] = arr[0];

  for (let i = 1; i < arr.length; i++) {
    prefix[i] = prefix[i - 1] + arr[i];
  }

  let max = prefix[size - 1];
  for (let i = size; i < arr.length; i++) {
    let curr = prefix[i] - prefix[i - size];
    max = Math.max(max, curr);
  }

  return max;

  // Time complexity O(n)
  // Space complexity O(n) extra space for prefix array
}

export function slidingWindowDivideConquer(arr, size) {
  let sum = arr.slice(0, size).reduce((a, b) => a + b, 0);
  return arr.slice(size).reduce((max, curr, i) => {
    sum += curr - arr[i];
    return Math.max(max, sum);
  }, sum);
  // Time complexity O(n)
  // Space complexity O(1)
}
// Note: The above function uses array slicing and reduce method to calculate the sum of the first 'size' elements and then iterates through the rest of the array to find the maximum sum of any subarray of the given size.

export function minLengthSubArray(arr, s) {
  let sum = 0,
    left = 0,
    minlen = Infinity;

  for (let right = 0; right < arr.length; right++) {
    sum += arr[right];

    while (sum >= s) {
      minlen = Math.min(minlen, right - left + 1);
      sum -= arr[left];
      left++;
    }
  }
  return minlen === Infinity ? 0 : minlen;
  // Time complexity O(n)
  // Space complexity O(1)
}
export function LongestSubstring(arr) {
  let map = new Map();
  let left = 0,
    maxlen = -Infinity;

  for (let right = 0; right < arr.length; right++) {
    map.set(arr[right], (map.get(arr[right]) || 0) + 1);
    while (map.get(arr[right]) > 1) {
      map.set(arr[left], map.get(arr[left]) - 1); // decrement left element
      left++;
    }

    maxlen = Math.max(maxlen, right - left + 1);
  }

  return maxlen;
  // Time complexity O(n)
  // Space complexity O(n)
}

export function LongestSubarrayWithKDistinct(arr, k) {
  let maxLen = 0;
  let left = 0;
  let sum = 0;
  
  for (let right = 0; right < arr.length; right++) {
    sum += arr[right];
    while (sum > k && left <= right) {
      sum -= arr[left];
      left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }

  return maxLen;
  
  
  
  // Time complexity O(n)
  // Space complexity O(1)
}
