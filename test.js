// console.log(5)
// Promise.resolve(1)
//     .then(() => console.log(2))
//     .then(console.log(3))
//     .then(() => console.log(4))
// console.log(6)

/** **************************************************************************************************************** **/

// Promise.resolve(1)
//     .then(() => console.log('1:', 2))
//     .then(console.log('2:', 3))
//     .then(() => console.log('3:', 4))
//
// Promise.resolve(1)
//     .then(() => console.log('4:', 2))
//     .then(console.log)
//     .then(() => console.log('5:', 4))

/** **************************************************************************************************************** **/

// var f = function () {
//     this.x = 5;
//     (function () {
//         this.x = 3
//     })();
//     console.log('1:', this.x)
// }
//
// var obj = {
//     x: 4,
//     m: function () {
//         console.log('2:', this.x)
//     }
// }
//
// f();
// new f();
// obj.m();
// new obj.m();
// f.call(f);
// obj.m.call(f);

/** **************************************************************************************************************** **/
// let value = 100
//
// function worker() {
//     value = 10
//     return;
//     function value() {}
// }
//
// worker()
//
// console.log(value) //