const testCase = require("../../Helper/testCase");

const longestCommonPrefix = (strs) => {
  let prefix = ""
  if (strs === null || strs.length === 0) return prefix

  for (let i = 0; i < strs[0].length; i++) {
    const char = strs[0][i];

    for (let j = 1; j < strs.length; j++) {
      if (strs[j][i] !== char) return prefix
    }
    prefix = prefix + char
  }

  return prefix
};

testCase(longestCommonPrefix(["flower", "flow", "flight"]), "fl", true);
testCase(longestCommonPrefix(["dog", "racecar", "car"]), "");
testCase(longestCommonPrefix(["test"]), "test");
testCase(longestCommonPrefix([]), "");