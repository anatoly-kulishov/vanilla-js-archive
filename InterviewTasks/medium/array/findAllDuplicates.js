const testCase = require("../../../Helpers/testCase");

/**
 * @param {number[]} nums
 * @return {number[]}
 */
const findDuplicates = (nums) => {
    const map = {};
    const result = [];

    for (let i = 0; i < nums.length; i++) {
        const current = nums[i];
        if (map[current] === undefined) {
            map[current] = 1;
        } else {
            map[current] += 1;
            result.push(current);
        }
    }

    return result;
};

testCase(findDuplicates([4, 3, 2, 7, 8, 2, 3, 1]), [2, 3]);
testCase(findDuplicates([1, 1, 2]), [1]);
testCase(findDuplicates([1]), []);