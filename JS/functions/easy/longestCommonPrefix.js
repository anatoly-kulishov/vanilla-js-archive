/**
 * @param {string[]} strs
 * @return {string}
 */
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

console.log("Result:", longestCommonPrefix(["flower", "flow", "flight"])); // "fl"
console.log("Result:", longestCommonPrefix(["dog", "racecar", "car"])); // ""
console.log("Result:", longestCommonPrefix(['test'])); // "test"
console.log("Result:", longestCommonPrefix([])); // ""