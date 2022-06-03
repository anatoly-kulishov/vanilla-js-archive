function rle(str) {
  const dictionary = {};
  let result = '';

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (dictionary[char] !== undefined) {
      dictionary[char] = dictionary[char] + 1;
    } else {
      dictionary[char] = 1;
    }
  }

  for (const [key, value] of Object.entries(dictionary)) {
    if (value <= 1) {
      result += key;
    } else {
      result += key + value;
    }
  }

  return result;
}

function rle2(str) {
  const dictionary = {};
  let result = '';

  for (let char of str) {
    if(dictionary[char] !== undefined) {
      dictionary[char] = dictionary[char] + 1
    } else {
      dictionary[char] = 1;
    }
  }

  for(const key in dictionary) {
    const value = dictionary[key];
    if(value <= 1) {
      result += key;
    } else {
      result += key + value;
    }
  }

  return result;
}

console.log('Test cases:');
console.log('[RLE]', rle('AABBBCCXYZ') === 'A2B3C2XYZ');
console.log('[RLE]', rle('AAAABBBCCXYZDDDDEEEFFFAAAAAABBBBBBBBBBBBBBBBBBBBBBBBBBBBbbb') === 'A10B31C2XYZD4E3F3b3');
console.log('[RLE]', rle('AABcDDDeFgggg') === 'A2BcD3eFg4');
