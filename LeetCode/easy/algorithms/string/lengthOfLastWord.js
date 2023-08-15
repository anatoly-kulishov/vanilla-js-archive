const testCase = require("../../../../Helpers/testCase");

/**
 * @param {string} s
 * @return {number}
 */
const lengthOfLastWord = (s) => {
    return s.trim().split(' ').at(-1).length;
};

testCase(lengthOfLastWord('Hello World'), 5);
testCase(lengthOfLastWord('   fly me   to   the moon  '), 4);
testCase(lengthOfLastWord('luffy is still joyboy'), 6);
