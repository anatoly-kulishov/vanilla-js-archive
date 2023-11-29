const testCase = require("../../../../Helpers/testCase");

const missingNumber = function (nums) {
    const filledArr = Array.from({length: nums.length}, (_, i) => i + 1)

    for(let i = 0; i < filledArr.length; i++) {
        const current = filledArr[i];

        if(!nums.includes(current)) {
            return current
        }
    }

    return 0;
};

testCase(missingNumber([3, 0, 1]), 2, true);
testCase(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]), 8);
testCase(missingNumber([0, 1]), 2);
