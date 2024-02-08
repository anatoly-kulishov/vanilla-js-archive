const testCase = require("../../../../Helpers/testCase");

const containsDuplicate = (nums) => {
    const n = nums.length;
    const map = {};

    for (let i = 0; i < n; i++) {
        const current = nums[i];
        if (map[current] === undefined) {
            map[current] = 1;
        } else {
            return true;
        }
    }

    return false;
};

testCase(containsDuplicate([1, 2, 3, 1]), true, true);
testCase(containsDuplicate([1, 2, 3, 4]), false);
testCase(containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]), true);
