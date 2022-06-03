const strStr = (haystack, needle) => {
  if(needle.length === 0) return 0;
  if(needle === haystack) return 0;

  for (let i = 0; i <= haystack.length - needle.length; i++) {
    if (needle === haystack.substring(i, i + needle.length)) {
      return i;
    }
  }

  return -1;
};

console.log('Test cases:');
console.log('[strStr]', strStr('hello', 'll') === 2);
console.log('[strStr]', strStr('world!', 'ld!') === 3);
console.log('[strStr]', strStr('aaaaa', 'bba') === -1);
console.log('[strStr]', strStr('abc', 'abc') === 0);
console.log('[strStr]', strStr('abc', '') === 0);
