/**
 * Write a function that reverses a string. The input string is given as an array of characters s.
 * You must do this by modifying the input array in-place with O(1) extra memory.
 *
 * 1 <= s.length <= 105
 * s[i] is a printable ascii character.
 */

const testCase = require("../../../Helpers/testCase");

/**
 * @param s
 * @returns {*}
 */
const reverseString = (s) => {
    let a_pointer = 0;
    let b_pointer = s.length - 1;

    while (a_pointer <= b_pointer) {
        // [s[a_pointer], s[b_pointer]] = [s[b_pointer], s[a_pointer]];

        let temp = s[a_pointer];
        s[a_pointer] = s[b_pointer];
        s[b_pointer] = temp;

        a_pointer++;
        b_pointer--;
    }

    return s;
};

testCase(reverseString(["h", "e", "l", "l", "o"]), ["o", "l", "l", "e", "h"], true);
testCase(reverseString(["H", "a", "n", "n", "a", "h"]), ["h", "a", "n", "n", "a", "H"]);