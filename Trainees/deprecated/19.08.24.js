/**
 * Output:
 * let that = this // 1
 * arrow func // 2
 * "this" as second params in filter // 3
 */
// const userService = {
//     currentFilter: "active",
//     users: [
//         { name: "Alex", status: "active" },
//         { name: "Nick", status: "deleted" }
//     ],
//     getFilteredUsers: function() {
//         return this.users.filter(function(user) {
//             return user.status === this.currentFilter;
//         });
//     }
// };
//
// console.log(userService.getFilteredUsers());
/** **************************************************** */
// console.log('start');
//
// const promise1 = new Promise((resolve, reject) => {
//   console.log(1)
// })
//
// console.log('end');
/** **************************************************** */
// console.log('start');
//
// const promise1 = new Promise((resolve, reject) => {
//   console.log(1)
//   resolve(2)
// })
//
// promise1.then(res => {
//   console.log(res)
// })
//
// console.log('end');
/** **************************************************** */
// console.log("start");
//
// const promise1 = new Promise((resolve, reject) => {
//   console.log(1);
//   resolve(2);
//   console.log(3);
// });
//
// promise1.then(res => {
//   console.log(res);
// });
//
// console.log("end");
/** **************************************************** */
// console.log("start");
//
// const promise2 = new Promise((resolve, reject) => {
//   console.log(1);
// });
//
// promise2.then((res) => {
//   console.log(2);
// });
//
// console.log("end");
/** **************************************************** */
// console.log('start')
//
// const fn = () => (new Promise((resolve, reject) => {
//   console.log(1);
//   resolve('success')
// }))
//
// console.log('middle')
//
// fn().then(res => {
//   console.log(res)
// })
//
// console.log('end')
/** **************************************************** */
// console.log('start')
//
// Promise.resolve(1).then((res) => {
//   console.log(res)
// })
//
// Promise.resolve(2).then((res) => {
//   console.log(res)
// })
//
// console.log('end')
/** **************************************************** */
// console.log("start");
//
// setTimeout(() => {
//   console.log("setTimeout");
// });
//
// Promise.resolve().then(() => {
//   console.log("resolve");
// });
//
// console.log("end");
/** **************************************************** */
// const promise = new Promise((resolve, reject) => {
//   console.log(1);
//   setTimeout(() => {
//     console.log("timerStart");
//     resolve("success");
//     console.log("timerEnd");
//   }, 0);
//   console.log(2);
// });
//
// promise.then((res) => {
//   console.log(res);
// });
//
// console.log(4);
/** **************************************************** */
// const timer1 = setTimeout(() => {
//   console.log('timer1');
//
//   const promise1 = Promise.resolve().then(() => {
//     console.log('promise1')
//   })
// }, 0)
//
// const timer2 = setTimeout(() => {
//   console.log('timer2')
// }, 0)
/** **************************************************** */
// console.log('start');
//
// const promise1 = Promise.resolve().then(() => {
//   console.log('promise1');
//   const timer2 = setTimeout(() => {
//     console.log('timer2')
//   }, 0)
// });
//
// const timer1 = setTimeout(() => {
//   console.log('timer1')
//   const promise2 = Promise.resolve().then(() => {
//     console.log('promise2')
//   })
// }, 0)
//
// console.log('end');
/** **************************************************** */
// const stripProperty = (obj, prop) => {
//     // Code here...
// }
//
// const someObj = {
//     name: 'Anatoly',
//     age: 25
// }
//
// console.log('Before', someObj) // Before { name: 'Anatoly', age: 25 }
//
// stripProperty(someObj, 'age');
//
// console.log('After', someObj) // After { name: 'Anatoly' }
/** **************************************************** */
// function recursiveTraversal(obj) {
//     // Code here...
// }
//
// const myObj = {
//     key1: 'value1',
//     key2: {
//         nestedKey1: 'nestedValue1',
//         nestedKey2: {
//             deeplyNestedKey: 'deeplyNestedValue'
//         }
//     },
//     key3: 'value3'
// };
//
// recursiveTraversal(myObj);
/** **************************************************** */
/**
 * На JS написать программу, которая выводит шахматную доску,
 * где чёрные клетки символы “#”, а белые – “_”. Размер доски должен задаваться переменными.
 *
 * Пример:
 * #_#_#_#_
 * _#_#_#_#
 * #_#_#_#_
 * _#_#_#_#
 * #_#_#_#_
 * _#_#_#_#
 * #_#_#_#_
 * _#_#_#_#
 */
// const printChessboard = (row, col) => {}
//
// printChessboard(8, 8);
/** **************************************************** */
/**
 * Given a sorted array of distinct integers and a target value, return the index if the target is found.
 * If not, return the index where it would be if it were inserted in order.
 * You must write an algorithm with O(log n) runtime complexity.
 */
// const searchInsert = (nums, target) => {
//     // Code here...
// };
//
// console.log(searchInsert([1, 3, 5, 6], 5)); // 2
// console.log(searchInsert([1, 3, 5, 6], 2)); // 1
// console.log(searchInsert([1, 3, 5, 6], 7)); // 4
/** **************************************************** */
// const twoSum = (nums, target) => {
//     // Code here...
// };
//
// console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
// console.log(twoSum([3, 2, 4], 6)); // 1, 2]
// console.log(twoSum([3, 3], 6)); // [0, 1]
/** **************************************************************************************************************** **/
// const reversLinkedList = (head) => {
//     // Code here...
// };
//
// console.log(reversLinkedList([1, 2, 3, 4, 5])); // [5, 4, 3, 2, 1]
// console.log(reversLinkedList([1, 2])); // [2, 1]
// console.log(reversLinkedList([])); // []