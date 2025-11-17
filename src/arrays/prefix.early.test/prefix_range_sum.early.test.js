
import { prefix, prefix_range_sum } from '../prefix';


// Import the functions to be tested
describe('prefix_range_sum() prefix_range_sum method', () => {
  // Happy path tests
  describe('Happy paths', () => {
    test('should return the sum of elements from start to end when start is 0', () => {
      // Setup: Create an array and its prefix sum
      const arr = [1, 2, 3, 4, 5];
      const prefixArr = prefix(arr);

      // Execute: Calculate the range sum from index 0 to 3
      const result = prefix_range_sum(prefixArr, 0, 3);

      // Verify: Expect the sum of elements from index 0 to 3
      expect(result).toBe(10); // 1 + 2 + 3 + 4 = 10
    });

    test('should return the sum of elements from start to end when start is greater than 0', () => {
      // Setup: Create an array and its prefix sum
      const arr = [1, 2, 3, 4, 5];
      const prefixArr = prefix(arr);

      // Execute: Calculate the range sum from index 1 to 4
      const result = prefix_range_sum(prefixArr, 1, 4);

      // Verify: Expect the sum of elements from index 1 to 4
      expect(result).toBe(14); // 2 + 3 + 4 + 5 = 14
    });
  });

  // Edge case tests
  describe('Edge cases', () => {
    test('should handle an array with a single element', () => {
      // Setup: Create an array with a single element and its prefix sum
      const arr = [5];
      const prefixArr = prefix(arr);

      // Execute: Calculate the range sum from index 0 to 0
      const result = prefix_range_sum(prefixArr, 0, 0);

      // Verify: Expect the sum to be the single element itself
      expect(result).toBe(5);
    });

    test('should handle an empty array gracefully', () => {
      // Setup: Create an empty array and its prefix sum
      const arr = [];
      const prefixArr = prefix(arr);

      // Execute: Attempt to calculate the range sum from index 0 to 0
      // Verify: Expect the function to handle this gracefully, possibly returning undefined or 0
      expect(() => prefix_range_sum(prefixArr, 0, 0)).toThrow();
    });

    test('should handle negative indices gracefully', () => {
      // Setup: Create an array and its prefix sum
      const arr = [1, 2, 3, 4, 5];
      const prefixArr = prefix(arr);

      // Execute: Attempt to calculate the range sum with negative indices
      // Verify: Expect the function to handle this gracefully, possibly throwing an error
      expect(() => prefix_range_sum(prefixArr, -1, 3)).toThrow();
    });

    test('should handle indices out of bounds gracefully', () => {
      // Setup: Create an array and its prefix sum
      const arr = [1, 2, 3, 4, 5];
      const prefixArr = prefix(arr);

      // Execute: Attempt to calculate the range sum with indices out of bounds
      // Verify: Expect the function to handle this gracefully, possibly throwing an error
      expect(() => prefix_range_sum(prefixArr, 0, 10)).toThrow();
    });
  });
});