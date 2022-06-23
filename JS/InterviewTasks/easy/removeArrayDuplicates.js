const testCase = require("../../Helper/testCase");

const removeArrayDuplicates = (nums) => {
  const res = [];
  const doubles = [];

  for (let el of nums) {
    if (!res.includes(el)) {
      res.push(el);
    } else {
      doubles.push('_');
    }
  }

  return {
    count: doubles.length + 1,
    nums: [...res, ...doubles]
  };
};

testCase(removeArrayDuplicates([1, 1, 2]), {count: 2, nums: [1, 2, '_']}, true);
testCase(removeArrayDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]), {count: 6, nums: [0, 1, 2, 3, 4, '_', '_', '_', '_', '_']});