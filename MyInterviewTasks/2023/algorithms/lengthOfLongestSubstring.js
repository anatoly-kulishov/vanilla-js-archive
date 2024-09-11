/**
 * Given a string s, find the length of the longest
 * substring without repeating characters.
 */
const lengthOfLongestSubstring = function (s) {
    const charSet = new Set();
    let maxLen = 0, start = 0, end = 0, n = s.length;

    while (start < n && end < n) {
        if (!charSet.has(s[end])) {
            charSet.add(s[end++]);
            maxLen = Math.max(maxLen, end - start);
        } else {
            charSet.delete(s[start++]);
        }
    }

    return maxLen;
};

console.log(lengthOfLongestSubstring("abcabcbb")); // 3
console.log(lengthOfLongestSubstring("bbbbb")); // 1
console.log(lengthOfLongestSubstring("pwwkew")); // 3
