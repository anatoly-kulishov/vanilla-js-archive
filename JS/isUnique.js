function isUnique(str) {

  /** 1 **/
  // for (let i = 0; i < str.length; i++) {
  //   if (str.lastIndexOf(str[i]) !== i) {
  //     return false
  //   }
  // }
  // return true

  /** 2 **/
  // const chars = new Set()
  //
  // for (let i = 0; i < str.length; i++) {
  //   const current = str[i]
  //
  //   if (chars.has(current)) {
  //     return false
  //   }
  //
  //   chars.add(current)
  // }
  // return true

  /** 3 **/
  return new Set(str).size === str.length
}

console.log(isUnique('123')) // -> true
console.log(isUnique('123456')) // -> true
console.log(isUnique('abcABC')) // -> true
console.log(isUnique('1231')) // -> false