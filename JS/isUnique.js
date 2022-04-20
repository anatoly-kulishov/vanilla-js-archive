function isUnique(string) {
  return new Set(string).size === string.length
}

console.log(isUnique('123')) // -> true
console.log(isUnique('123456')) // -> true
console.log(isUnique('abcABC')) // -> true
console.log(isUnique('1231')) // -> false