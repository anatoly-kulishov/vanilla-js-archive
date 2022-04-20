function removeDupes(str) {
  /** 1 **/
  // const res = [];
  // const map = {};
  // for (let i = 0; i < str.length; i++) {
  //   const char = str[i];
  //   if (!map[char]) {
  //     map[char] = true;
  //     res.push(char);
  //   }
  // }
  // return res.join('');

  /** 2 **/
  return Array.from(new Set(str)).join('');
}

console.log(removeDupes('abcd')); // abcd
console.log(removeDupes('aabbccdd')); // abcd
console.log(removeDupes('abcddbca')); // abcd
console.log(removeDupes('abababcdcdcd')); // abcd
