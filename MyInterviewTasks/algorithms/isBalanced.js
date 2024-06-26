/**
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
 *
 * An input string is valid if:
 * Open brackets must be closed by the same type of brackets.
 * Open brackets must be closed in the correct order.
 *
 * s consists of parentheses only '()[]{}'.
 */

// function isBalanced(string) {
//     const queue = [];
//     const start = '{[(';
//     const end = '}])';
//     const map = {
//         '}': '{',
//         ']': '[',
//         ')': '('
//     }
//
//     for (let i = 0; i < string.length; i++) {
//         const char = string[i];
//         if (start.includes(char)) {
//             queue.push(char);
//         }
//         if (end.includes(char)) {
//             const last = queue.pop();
//             if (map[char] !== last) {
//                 return false;
//             }
//         }
//     }
//
//     return !queue.length;
// }

function isBalanced(s) {}

console.log(isBalanced('()')); // true
console.log(isBalanced('()[]{}')); // true
console.log(isBalanced('(]')); // false
console.log(isBalanced('([)]')); // false
console.log(isBalanced('{[]}')); // true
