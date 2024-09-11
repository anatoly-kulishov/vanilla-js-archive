/**
 * Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.
 *
 * 1 <= s.length <= 105
 * s consists of only lowercase English letters.
 */

const testCase = require("../../../../Helpers/testCase");

let firstUniqChar = (s) => {
    let map = {};

    for (let i = 0; i < s.length; i++) {
        let current = s[i];

        if (map[current] !== undefined) {
            map[current] = map[current] + 1;
        } else {
            map[current] = 1
        }
    }

    for (let i = 0; i < s.length; i++) {
        let current = s[i];

        if (map[current] === 1) {
            return i;
        }
    }

    return -1;
};

testCase(firstUniqChar('leetcode'), 0, true);
testCase(firstUniqChar('loveleetcode'), 2);
testCase(firstUniqChar('aabb'), -1);
