const testCase = require("../../../Helpers/testCase");

/**
 * @param {number} n
 * @param {number} index
 * @param {number} maxSum
 * @return {number}
 */
const maxValue = function (n, index, maxSum) {
    // Calculate the minimum and maximum possible values at the given index
    let min = Math.floor(maxSum / n);
    let max = maxSum;

    // Function to calculate the sum of numbers based on the given length
    const findSum = (num, len) => {
        if (len < num) {
            // If the length is less than the number, calculate the sum using the formula for an arithmetic series
            return (len * (num + num - len + 1)) / 2;
        }
        // If the length is greater than or equal to the number, calculate the sum using the formula for an arithmetic series and add the remaining numbers
        return (num * (num + 1)) / 2 + (len - num);
    };

    // Function to check if a given number is within the maximum sum limit
    const isWithin = (num) => {
        // Calculate the sum of numbers on the left side of the index
        const leftSum = findSum(num, index + 1);
        // Calculate the sum of numbers on the right side of the index
        const rightSum = findSum(num, n - index);
        // Check if the sum of left and right sides, minus the number at the index, is within the maximum sum limit
        return maxSum >= leftSum + rightSum - num;
    };

    // Binary search to find the maximum possible value at the given index
    while (min <= max) {
        const mid = (min + max) >> 1;
        // If the mid-value is within the maximum sum limit, update the minimum value
        // Otherwise, update the maximum value
        isWithin(mid) ? (min = mid + 1) : (max = mid - 1);
    }

    // Return the maximum possible value at the given index
    return max;
};

testCase(maxValue(4, 2, 6), 2, true);
// testCase(maxValue(6, 1, 10), 3);
