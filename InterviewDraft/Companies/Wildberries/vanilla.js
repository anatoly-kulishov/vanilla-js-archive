/**
 * 1
 */
// String.prototype.repeatify = function(count) {
//     let result = ''
//
//     for(let i = 0; i < count; i++) {
//         result += this
//     }
//
//     return result
// }
//
// console.log('hello'.repeatify(3)); // ---> hellohellohello

/**
 * 2
 */
// let a = [1,1,3,4,5,6,7,7,8];
//
// const clearDub1 = (arr) => {
//     return [...new Set(arr)]
// }
//
// const clearDub2 = (arr) => {
//     const map = {}
//     let result = []
//
//     for(let i = 0; i < arr.length; i++) {
//         const current = arr[i];
//
//         if(!map[current]) {
//             map[current] = 1
//             result.push(current)
//         }
//     }
//
//     return result
// }
//
// console.log(clearDub1(a)); // [1, 3, 4, 5, 6, 7, 8]
// console.log(clearDub2(a)); // [1, 3, 4, 5, 6, 7, 8]

/**
 * 3
 */
// console.log(1);
//
// setTimeout(() => console.log(2));
//
// Promise.resolve().then(() => console.log(3));
// Promise.resolve().then(() => setTimeout(() => console.log(4)));
// Promise.resolve().then(() => console.log(5));
//
// setTimeout(() => console.log(6));
//
// console.log(7);
//
// Promise.resolve().then(console.log('123'));
//
// async function wait() {
//     console.log(8)
//     let prom = await new Promise(resolve => {
//         console.log(9)
//         setTimeout(resolve, 1000)
//     });
// }
//
// wait();



