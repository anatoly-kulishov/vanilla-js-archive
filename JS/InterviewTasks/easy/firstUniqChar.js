const testCase = require("../../Helper/testCase");

let firstUniqChar = (s) => {
  let map = new Map();

  for (let i = 0; i < s.length; i++) {
    let current = s[i];

    if (map.has(current)) {
      map.set(current, map.get(current) + 1)
    } else {
      map.set(current, 1);
    }
  }

  for (let i = 0; i < s.length; i++) {
    if (map.get(s[i]) === 1) {
      return i;
    }
  }

  return -1;
};

testCase(firstUniqChar('leetcode'), 0, true);
testCase(firstUniqChar('loveleetcode'), 2);
testCase(firstUniqChar('aabb'), -1);