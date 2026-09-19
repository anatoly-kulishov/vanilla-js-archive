const testCase = require("../../../../Helpers/testCase");

const strStr = (haystack, needle) => {
  if (needle.length === 0) return 0;
  if (needle === haystack) return 0;

  for (let i = 0; i <= haystack.length - needle.length; i++) {
    if (needle === haystack.substring(i, i + needle.length)) {
      return i;
    }
  }

  return -1;
};

testCase(strStr('hello', 'll'), 2, true);
testCase(strStr('world!', 'ld!'), 3);
testCase(strStr('aaaaa', 'bba'), -1);
testCase(strStr('abc', 'abc'), 0);
testCase(strStr('abc', ''), 0);
