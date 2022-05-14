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

  return sum
}

console.log(romanToInt("III")); // 3
console.log(romanToInt("LVIII")); // 58
console.log(romanToInt("MCMXCIV")); // 1994