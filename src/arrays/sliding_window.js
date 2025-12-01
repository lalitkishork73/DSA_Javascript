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

export function SlidingWin(arr, k) {
  try {
    let prefix = [];
    console.log(arr);
    prefix[0] = arr[0];
    for (let i = 1; i < arr.length; i++) {
      prefix.push(arr[i] + prefix[i - 1]);
    }

    return prefix;
  } catch (err) {
    console.log(err);
  }
}

//Js implementation of anagram sunstring

export function countAnagramsBruteForce(s, p) {
  const k = p.length;
  const n = s.length;
  const sortedP = p.split("").sort().join("");
  let count = 0;

  for (let i = 0; i < n - k; i++) {
    let sub = s.substring(i, i + k);
    let sortedSub = sub.split("").sort().join("");
    if (sortedP === sortedSub) count++;
  }

  return count;
}

//

export function anagramSlidingWindow(s, p) {
  const k = p.length;
  const n = s.length;
  let ans = 0;
  let i = 0;
  let j = 0;
  const freq = new Map();

  for (let ch of p) freq.set(ch, (freq.get(ch) || 0) + 1);
  let count = freq.size;

  while (j < n) {
    const end = s[j];
    if (freq.has(end)) {
      freq.set(end, freq.get(end) - 1);
      if (freq.get(end) === 0) count--;
    }
    if (j - i + 1 < k) j++;
    else if (j - i + 1 === k) {
      if (count === 0) ans++;

      const start = s[i];
      if (freq.has(start)) {
        if (freq.get(start) === 0) {
          count++;
        }
        freq.set(start, freq.get(start) + 1);
      }
      j++;
      i++;
    }
  }

  return ans;
}

export function firstNegativeNumBrute(ar, k) {
  let ans = [];
  for (let i = 0; i < ar.length - k + 1; i++) {
    let firstNegative = 0;
    for (let j = i; j < i + k; j++) {
      if (ar[j] < 0) {
        firstNegative = ar[j];
        break;
      }
    }
    if (firstNegative == 0) ans.push(0);
    ans.push(firstNegative);
  }

  return ans;
}

export function firstNegativeNumber(ar, k) {
  const n = ar.length;
  let ans = [];
  let neg = [];
  let i = 0;
  let j = 0;

  while (j < n) {
    if (ar[j] < 0) neg.push(ar[j]);
    if (j - i + 1 < k) j++;
    else {
      ans.push(neg.length == 0 ? 0 : neg[0]);
      if (neg[0] == ar[i]) neg.shift();

      i++;
      j++;
    }
  }

  return ans;
}
