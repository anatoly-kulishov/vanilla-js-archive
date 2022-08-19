const testCase = require("../../Helpers/testCase");

function allAnagrams(array) {
  const sorted = array.map(str => str.split('').sort().join(''));
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] !== sorted[0]) {
      return false;
    }
  }
  return true;
}

testCase(allAnagrams(['abcd', 'bdac', 'cabd']), true, true);
testCase(allAnagrams(['abcd', 'bdXc', 'cabd']), false);