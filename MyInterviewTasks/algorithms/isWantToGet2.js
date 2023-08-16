function isWantToGet2(amountRequired, limits) {

}

const limits = { 1000: 5, 500: 2, 100: 5, 50: 100, 30: 6 };

console.log(isWantToGet2(230, limits)); // { 30: 1, 100: 2 }
console.log(isWantToGet2(150, limits)); // { 100: 1, 50: 1 }
console.log(isWantToGet2(1000, limits)); // { 1000: 1 }
console.log(isWantToGet2(200, limits)); // { 100: 2 }
console.log(isWantToGet2(120, limits)); // { 30: 4 }
console.log(isWantToGet2(275, limits)); // undefined
console.log(isWantToGet2(50000, limits)); // undefined
