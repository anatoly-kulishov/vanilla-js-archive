const testCase = require("../../../Helpers/testCase");
/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
const findAnagrams = function (s, p) {
    if (p.length > s.length) return [];

    const map = {};

    for (let chr of p) {
        map[chr] = (map[chr] || 0) + 1
    }

    let r = 0, l = 0, count = 0;
    const result = [];

    while (r < s.length) {
        if (map[s[r]] > 0) count++;
        map[s[r]]--;
        r++;
        if (count === p.length) result.push(l);
        if (r - l === p.length) {
            if (map[s[l]] >= 0) count--;
            map[s[l]]++
            l++;
        }
    }

    return result;
};


testCase(findAnagrams('cbaebabacd', 'abc'), [0, 6], true);
testCase(findAnagrams('abab', 'ab'), [0, 1, 2]);
