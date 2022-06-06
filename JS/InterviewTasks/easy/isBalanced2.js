const testCase = require("../../Helper/testCase");

// O(n)
function isBalanced2(string) {
  const stack = [];
  const brackets = {
    '}': '{',
    ']': '[',
    ')': '('
  };

  for (let i = 0; i < string.length; i++) {
    const current = string[i];
    if (isClosedBracket(current)) {
      if (brackets[current] !== stack.pop()) return false;
    } else {
      stack.push(current);
    }
  }

  return stack.length === 0;
}

function isClosedBracket(char) {
  return [')', '}', ']'].indexOf(char) > -1;
}

testCase(isBalanced2('()'), true, true);
testCase(isBalanced2('()[]{}'), true);
testCase(isBalanced2('(]'), false);
testCase(isBalanced2('([)]'), false);
testCase(isBalanced2('{[]}'), true);