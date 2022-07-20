/**
 * Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.
 *
 * 1 <= s.length <= 105
 * s consists of only lowercase English letters.
 */

const testCase = require("../../../Helper/testCase");

/**
 * @param {string} s
 * @return {number}
 */
let firstUniqChar = (s) => {
    let map = new Map();
    const n = s.length;

    for (let i = 0; i < n; i++) {
        let current = s[i];

        if (map.has(current)) {
            map.set(current, map.get(current) + 1);
        } else {
            map.set(current, 1);
        }
    }

    for (let i = 0; i < n; i++) {
        let current = s[i];

        if (map.get(current) === 1) {
            return i;
        }
    }

    return -1;
};

testCase(firstUniqChar('leetcode'), 0, true);
testCase(firstUniqChar('loveleetcode'), 2);
testCase(firstUniqChar('aabb'), -1);