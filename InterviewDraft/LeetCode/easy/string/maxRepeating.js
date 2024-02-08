const testCase = require("../../../../Helpers/testCase");

/**
 * @param str
 * @returns {*}
 */
let maxRepeating = (str) => {
  const n = str.length;
  let count = 0;
  let res = str[0];
  let cur_count = 1;

  for (let i = 0; i < n; i++) {
    if (i < n - 1 && str[i] === str[i + 1]) {
      cur_count++;
    } else {
      if (cur_count > count) {
        count = cur_count;
        res = str[i];
      }
      cur_count = 1;
    }
  }

  return res;
};

testCase(maxRepeating("geeekk"), 'e', true);
testCase(maxRepeating("aaaabbcbbb"), 'a');
