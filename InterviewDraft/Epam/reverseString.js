const testCase = require("../../Helpers/testCase");

const reverseString = (s) => {
  let a_pointer = 0;
  let b_pointer = s.length - 1;

  while (a_pointer <= b_pointer) {
    let temp = s[a_pointer];

    s[a_pointer] = s[b_pointer];
    s[b_pointer] = temp;

    a_pointer += 1;
    b_pointer -= 1;
  }

  return s;
};

testCase(reverseString(["h", "e", "l", "l", "o"]), ["o", "l", "l", "e", "h"], true);
testCase(reverseString(["H", "a", "n", "n", "a", "h"]), ["h", "a", "n", "n", "a", "H"]);