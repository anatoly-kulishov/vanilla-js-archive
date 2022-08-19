const testCase = require("../../Helpers/testCase");

function highestFrequency(array) {
  const map = {};
  let maxFreq = 0;
  let maxFreqStr = array[0];

  for (let i = 0; i < array.length; i++) {
    const current = array[i];

    if (map[current]) {
      map[current]++
    } else {
      map[current] = 1;
    }

    if(map[current] > maxFreq) {
      maxFreq = map[current];
      maxFreqStr = current;
    }
  }

  return maxFreqStr;
}


testCase(highestFrequency(['abc', 'def', 'abc', 'def', 'abc']), 'abc', true);
testCase(highestFrequency(['abc', 'def']), 'abc');
testCase(highestFrequency(['abc', 'abc', 'def', 'def', 'def', 'ghi', 'ghi', 'ghi', 'ghi']), 'ghi');