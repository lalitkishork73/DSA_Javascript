import {
  slidingWindow,
  slidingWindowBruteForce,
  slidingWindowPrefixSum,
  slidingWindowDivideConquer,
  minLengthSubArray,
  LongestSubstring,
  LongestSubarrayWithKDistinct
} from "./arrays/sliding_window.js";
import {
  prefix,
  prefix_range_sum,
  prefix_XOR,
  Subarray_with_XOR,
  prefix_range_XOR,
  Unique_Element_Problem,
} from "./arrays/prefix.js";
import { countFrequenciesElement } from "./arrays/prefix.early.test/arrayMethods.js";
import { print } from "./print.js";

/* 
  Prefix comulative sum range proplems 
*/

// print(prefix([2, 4, 6, 8, 10]));
// print(prefix_range_sum(prefix([2, 4, 6, 8, 10]), 1, 2));
// print(prefix_XOR([5, 2, 7, 3]));
// print(prefix_range_XOR(prefix_XOR([1, 2, 3, 4, 5]), 2, 4));
// print(Subarray_with_XOR([4, 2, 2, 6, 4], 6));
// print(Unique_Element_Problem([4, 2, 2, 6, 4]));

/* 
  Sliding window problems
*/

print(slidingWindowPrefixSum([2, 1, 5, 3, 9, 1], 3));
print(slidingWindow([2, 1, 5, 1, 3, 2], 3));
print(slidingWindowBruteForce([2, 1, 5, 1, 3, 2], 3));
print(slidingWindowPrefixSum([2, 1, 5, 3, 9, 1], 3));
print(slidingWindowDivideConquer([2, 1, 5, 1, 3, 2], 3));

const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];
const numbs = [1, 2, 5, 4, 88, 4, 5, 21];
print(countFrequenciesElement(fruits));
print(countFrequenciesElement(numbs));
print(minLengthSubArray([2, 3, 1, 2, 4, 3], 7));
print(LongestSubstring("abcabcbb"));
console.log("ad")
console.log("ad`")
print(LongestSubarrayWithKDistinct([1, 2, 1, 0, 1, 1, 0], 4));
