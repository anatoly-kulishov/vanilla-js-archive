const testCase = require("../../Helper/testCase");

function removeDupes(str) {
  /** 1 **/
  // const res = [];
  // const map = {};
  // for (let i = 0; i < str.length; i++) {
  //   const char = str[i];
  //   if (!map[char]) {
  //     map[char] = true;
  //     res.push(char);
  //   }
  // }
  // return res.join('');

  /** 2 **/
  return Array.from(new Set(str)).join('');
}

testCase(removeDupes('abcd'), 'abcd', true);
testCase(removeDupes('aabbccdd'), 'abcd');
testCase(removeDupes('abcddbca'), 'abcd');
testCase(removeDupes('abababcdcdcd'), 'abcd');
