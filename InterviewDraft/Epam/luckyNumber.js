const luckyNumber = (arr, luckyNumber) => {
  const n = arr.length;

  if(n <= 1) {
    return false;
  }

  for(let i = 0; i < n - 2; i++) {
    const first = arr[i];
    const second = arr[i + 1];
    const third = arr[i + 2];

    if((first + second + third) === luckyNumber) {
      return true;
    }
  }

  return false;
}

const luckyNumber = (arr, luckyNumber) => {}

console.log(luckyNumber([1, 2, 3, 22, 2, 3, 2, 69, 5], 7)); // true
console.log(luckyNumber([1, 10, 17, 3, 3, 1], 7)); // true
console.log(luckyNumber([1, 2, 3], 6)); // true
console.log(luckyNumber([1, 2, 3], 7)); // false
console.log(luckyNumber([7], 7)); // false
console.log(luckyNumber([])); // false
