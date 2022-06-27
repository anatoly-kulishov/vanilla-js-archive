const testCase = require("../../Helper/testCase");

function isBalanced(string) {
  const queue = [];
  const start = '{[(';
  const end = '}])';
  const map = {
    '}': '{',
    ']': '[',
    ')': '('
  }

  for (let i = 0; i < string.length; i++) {
    const char = string[i];
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