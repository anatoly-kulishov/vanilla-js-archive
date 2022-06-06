const testCase = require("../../Helper/testCase");

const searchInsert = (nums, target) => {
  let pos = 0;

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (num === target) return i;
    if(target > num) pos++;
  }

  return pos;
};

testCase(searchInsert([1, 3, 5, 6], 5), 2, true);
testCase(searchInsert([1, 3, 5, 6], 2), 1);
testCase(searchInsert([1, 3, 5, 6], 7), 4);