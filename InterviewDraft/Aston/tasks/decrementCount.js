// function decrementCount(a) {
//     return () => {
//         if (a <= 0) return 0;
//         return a--;
//     }
// }

function decrementCount(a) {}

const a = decrementCount(5);

console.log(a()) // 5
console.log(a()) // 4
console.log(a()) // 3
console.log(a()) // 2
console.log(a()) // 1
console.log(a()) // 0
console.log(a()) // 0

console.log('-------------------');

const b = decrementCount(3);

console.log(b()) // 3
console.log(b()) // 2
console.log(b()) // 1
console.log(b()) // 0
