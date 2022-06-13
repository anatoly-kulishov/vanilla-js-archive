const testCase = require("../../Helper/testCase");

const singleNumber = (nums) => {
  const map = {};

  if (nums.length === 1) return nums[0];

  for (let i = 0; i < nums.length; i++) {
    const current = nums[i];
    if (map[current] !== undefined) {
      map[current] += 1;
    } else {
      map[current] = 1;
    }
  }

  for (let key in map) {
    const current = map[key];
    if(current === 1) {
      return Number(key)
    }
  }
};


testCase(singleNumber([2, 2, 1]), 1, true);
testCase(singleNumber([4, 1, 2, 1, 2]), 4);
testCase(singleNumber([1,0,1]), 0);
testCase(singleNumber([1]), 1);
