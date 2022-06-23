const testCase = require("../../Helper/testCase");

function removeSymbolDuplicates(str) {
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

testCase(removeSymbolDuplicates('abcd'), 'abcd', true);
testCase(removeSymbolDuplicates('aabbccdd'), 'abcd');
testCase(removeSymbolDuplicates('abcddbca'), 'abcd');
testCase(removeSymbolDuplicates('abababcdcdcd'), 'abcd');
