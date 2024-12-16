/**
 * 1
 */
// const a = [1, 2, 3]
// const b = [4, 5, 6]
//
// Array.prototype.push.apply(a, b);
//
// console.log(a) //
// console.log(b) //

/**
 * 2
 */
// for(var i = 0; i < 10; i++) {
//     setTimeout(function () {
//         console.log(i) // ?
//     }, 10)
// }

/**
 * 3
 */
// let num = 10,
//     obj1 = {
//         value: 'first value'
//     },
//     obj2 = {
//         value: 'second value'
//     },
//     obj3 = obj2;
//
//
// function change(num, obj1, obj2) {
//     num = num * 10;
//     obj1 = obj2;
//     obj2.value = 'new value';
// }
//
// change(num, obj1, obj2)
//
// console.log(num)
// console.log(obj1.value)
// console.log(obj2.value)
// console.log(obj3.value)

/**
 * 4
 */
// const a = 0;
// (function () {
//     console.log(a) //
//     console.log(b) //
//     console.log(foo()) //
//     console.log(bar()) //
//     console.log(this) //
//
//     var a = 1;
//     const b = 1;
//     function foo() {
//         return 2
//     }
//     var bar = function () {
//         return 4
//     }
// })()

/**
 * 5
 */
// let a = 10;
// let b = 1;
//
// function testFn() {
//     console.log(a) //
//     console.log(b) //
// }
//
// (function (funArg) {
//     let a = 20;
//     this.b = 2;
//     funArg();
// })(testFn)