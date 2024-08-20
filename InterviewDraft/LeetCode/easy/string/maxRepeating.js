const testCase = require("../../../../Helpers/testCase");

let maxRepeating = (str) => {
  let res = str[0];

  let count = 0;
  let cur_count = 1;

  for (let i = 0; i < str.length; i++) {
    if (i < str.length - 1 && str[i] === str[i + 1]) {
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
