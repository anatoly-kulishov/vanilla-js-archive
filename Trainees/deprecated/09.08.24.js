/** **************************************************************************************************************** **/
// console.log(1);
// setTimeout(() => console.log(2));
// Promise.resolve().then(() => console.log(3));
// Promise.resolve().then(() => setTimeout(() => console.log(4)));
// Promise.resolve().then(() => console.log(5));
// setTimeout(() => console.log(6));
// console.log(7);
// Promise.resolve().then(console.log('123'))
// async function wait() {
//     console.log(8)
//     let prom = await new Promise(resolve => {
//         console.log(9)
//         setTimeout(resolve, 1000)
//     });
// }
// wait()

// 1 7 123 8 9 3 5 2 6 4
/** **************************************************************************************************************** **/
// console.log('hello'.repeatify(3)); // ---> hellohellohello
/** **************************************************************************************************************** **/
// let a = [1,1,3,4,5,6,7,7,8];
// const clearDub = (arr) => {}
/** **************************************************************************************************************** **/
// 1: [test].split('').reverse() // tset
// 2: [...arg].reverse()
// 3: const reverseString = (s) => {
//     let a_pointer = 0;
//     let b_pointer = s.length - 1;
//
//     while (a_pointer <= b_pointer) {
//         let temp = s[a_pointer];
//
//         s[a_pointer] = s[b_pointer];
//         s[b_pointer] = temp;
//
//         a_pointer++;
//         b_pointer--;
//     }
//
//     return s;
// };

// const reverseString = (s) => {};
//
// console.log(reverseString(['h', 'e', 'l', 'l', 'o'])) // ['o', 'l', 'l', 'e', 'h']
// console.log(reverseString(['H', 'a', 'n', 'n', 'a', 'h'])) // ['h', 'a', 'n', 'n', 'a', 'H']
/** **************************************************************************************************************** **/
// function isLetter(str) {
//     return /^[a-zA-ZА-Яа-я]+$/.test(str)
// }
//
// function reverseOnlyLetters(str) {
//     let result = str.split("");
//
//     let left = 0;
//     let right = result.length - 1;
//
//     while (left < right) {
//         while (left < right && !isLetter(result[left])) {
//             left++;
//         }
//         while (left < right && !isLetter(result[right])) {
//             right--;
//         }
//
//         if (left < right) {
//             let temp = result[left];
//
//             result[left] = result[right];
//             result[right] = temp;
//
//             left++;
//             right--;
//         }
//     }
//
//     return result.join("");
// }