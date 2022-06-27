const testCase = require("../../Helper/testCase");

const intersect = (nums1, nums2) => {
  const result = [];

  const map = nums1.reduce((acc, i) => {
    acc[i] = acc[i] ? acc[i] + 1 : 1;
    return acc;
  }, {});

  for (let i = 0; i < nums2.length; i++) {
    const current = nums2[i];
    let count = map[current];

    if(count && count > 0) {
      result.push(current)
      map[current] -= 1;
    }
  }

  return result;
};

testCase(intersect([1, 2, 2, 1], [2, 2]), [2, 2], true);
testCase(intersect([4, 9, 5], [9, 4, 9, 8, 4]), [9, 4]);
