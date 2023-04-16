/**
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
 *
 * An input string is valid if:
 * Open brackets must be closed by the same type of brackets.
 * Open brackets must be closed in the correct order.
 *
 * 1 <= s.length <= 104
 * s consists of parentheses only '()[]{}'.
 */

const testCase = require("../../../Helpers/testCase");

/**
 * @param s
 * @returns {boolean}
 */
function isBalanced(s) {
    const queue = [];
    const start = '{[(';
    const end = '}])';
    const map = {
        '}': '{',
        ']': '[',
        ')': '('
    }

    for (let char of s) {
        if (start.includes(char)) {
            queue.push(char);
        }
        if (end.includes(char)) {
            const last = queue.pop();
            if (map[char] !== last) {
                return false;
            }
        }
    }

    return !queue.length;
}

testCase(isBalanced('()'), true, true);
testCase(isBalanced('()[]{}'), true);
testCase(isBalanced('(]'), false);
testCase(isBalanced('([)]'), false);
testCase(isBalanced('{[]}'), true);