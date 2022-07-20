/**
 * Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.
 *
 * n == nums.length
 * 1 <= n <= 104
 * 0 <= nums[i] <= n
 * All the numbers of nums are unique.
 */

const testCase = require("../../../Helper/testCase");

/**
 * @param nums
 * @returns {number}
 */
const missingNumber = (nums) => {
    const n = nums.length + 1;
    const arr = Array.from({length: n}, (el, index) => index);

    for (let i = 0; i < arr.length; i++) {
        const current = arr[i];

        if (nums.indexOf(current) === -1) {
            return current;
        }
    }
};

testCase(missingNumber([3, 0, 1]), 2, true);
testCase(missingNumber([0, 1]), 2);
testCase(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]), 8);