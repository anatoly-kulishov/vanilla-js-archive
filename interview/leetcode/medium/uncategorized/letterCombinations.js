const testCase = require("../../../../Helpers/testCase");

function letterCombinations(digits) {
  let result = [];
  const keyBoard = {
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y', 'z'],
  };

  if (!digits) {
    return [];
  }

  if (digits.length === 1) {
    return keyBoard[digits];
  }

  const firstChars = keyBoard[digits[0]];
  const secondChars = keyBoard[digits[1]];

  for (let i in firstChars) {
    for (let j in secondChars) {
      result.push(`${firstChars[i]}${secondChars[j]}`);
    }
  }

  if (digits.length > 2) {
    for (let i = 2; i < digits.length; i++) {
      result = mixList(result, keyBoard[digits[i]]);
    }
  }

  return result;
}

const mixList = (origin, toMerge) => {
  const list = [];

  for (let firstChar of origin) {
    for (let secondChar of toMerge) {
      list.push(`${firstChar}${secondChar}`)
    }
  }

  return list;
}

testCase(letterCombinations('23'), ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"], true);
testCase(letterCombinations('234'), ["adg", "adh", "adi", "aeg", "aeh", "aei", "afg", "afh", "afi", "bdg", "bdh", "bdi", "beg", "beh", "bei", "bfg", "bfh", "bfi", "cdg", "cdh", "cdi", "ceg", "ceh", "cei", "cfg", "cfh", "cfi"]);
testCase(letterCombinations('2'), ["a", "b", "c"]);
testCase(letterCombinations(''), []);
