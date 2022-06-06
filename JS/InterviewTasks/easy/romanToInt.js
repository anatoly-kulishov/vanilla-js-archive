const testCase = require("../../Helper/testCase");

function romanToInt(s) {
  const arrayStrings = s.split("");
  let sum = 0;

  const romanNumerals = {
    "I": 1,
    "V": 5,
    "X": 10,
    "L": 50,
    "C": 100,
    "D": 500,
    "M": 1000
  }

  arrayStrings.forEach((num, index) => {
    if (romanNumerals[num] < romanNumerals[arrayStrings[index + 1]]) {
      sum -= romanNumerals[num]
    } else {
      sum += romanNumerals[num]
    }
  })

  return sum;
}

testCase(romanToInt('III'), 3, true);
testCase(romanToInt('LVIII'), 58);
testCase(romanToInt('MCMXCIV'), 1994);