const luckyNumber = (arr, luckyNumber) => {
  if(arr.length <= 1) return false;

  for(let i = 0; i < arr.length - 2; i++) {
    let first = arr[i]
    let second = arr[i + 1]
    let third = arr[i + 2]

    if((first + second + third) === luckyNumber) {
      return true
    }
  }

  return false;
}

console.log(luckyNumber([1, 2, 3, 22, 2, 3, 2, 69, 5], 7)) // true
console.log(luckyNumber([1, 10, 17, 3, 3, 1], 7)) // true
console.log(luckyNumber([1, 2, 3], 6)); // true
console.log(luckyNumber([1, 2, 3], 7)); // false
console.log(luckyNumber([7], 7)); // false
console.log(luckyNumber([])); // false