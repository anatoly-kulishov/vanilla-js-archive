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

console.log(isBalanced('(x + y) - (4)')) // -> true
console.log(isBalanced('(((10 ) ()) ((?)(:)))')) // -> true
console.log(isBalanced('[{()}]')) // -> true
console.log(isBalanced('(50)(')) // -> false
console.log(isBalanced('[{]}')) // -> false