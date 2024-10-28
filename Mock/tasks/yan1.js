/**
 * 1
 */
// console.log(true + false) // 1
// console.log(12 / "6") // 2
// console.log('number' + 15 + 3) // number153
// console.log(15 + 3 + 'number') // 18number
// console.log([1] > null) // true
// console.log('foo' + +'bar') // fooNaN
// console.log('true' == true) // false
// console.log(false == 'false') // false
// console.log(null == '') // false
// console.log(!!'false' == !!'true') // true
// console.log(['x'] == 'x') // true
// console.log([] + null + 1) // null1
// console.log(0 || '0' && {}) // {}
// console.log([1, 2, 3] == [1, 2, 3]) // false
//
// let a = '42'
// let b = new String(42)
// console.log(a == b) // true
// console.log(a === b) // false

/**
 * 2
 */
// var a = { b: 1 }
// c = Object.create(a)
//
// console.log(c.b) // 1
// delete c.b
// console.log(c.b) // 1
// delete a.b
// console.log(c.b) // und
//
// a.z = 2
// console.log(c.z) // 2
// c.z = 3
// console.log(a.z) // 2

/**
 * 3
 */
// var a = 1;
//
// function foo() {
//     console.log(a);
// }
//
// function bar() {
//     var a = 2;
//     foo();
// }
//
// bar();

/**
 * 4
 */
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
// f(); // 3
// new f(); // 5
// obj.m(); // 4
// new obj.m(); // und
// f.call(f); // 5
// obj.m.call(f); // 5

/**
 * 5
 */
// function foo() {
//     x = 10;
//     return {
//         x: 20,
//         bar: () => {
//             console.log(this.x)
//         },
//         baz: function () {
//             console.log(this.x)
//         }
//     }
// }
//
// const obj1 = foo();
// obj1.bar(); // 10
// obj1.baz(); // 20
//
// const obj2 = foo.call({x: 30});
// obj2.bar(); // 30
// obj2.baz(); // 20

/**
 * 6
 */
// var a = 5;
// setTimeout(() => {
//     console.log(a); // 25
//     a = 10;
// }, 0)
//
// var p = new Promise(function (resolve, reject) {
//     console.log(a); // 5
//     a = 25;
//     resolve();
// })
//
// p.then(function () {
//     // Some code
// })
//
// console.log(a); // 25

/**
 * 7
 */
// Promise.resolve()
//     .then(() => {
//         return '1'
//     })
//     .finally(data => {
//         console.log(data)
//         return '2'
//     })
//     .then(data  => console.log(data))

/**
 * 8
 */
// Promise.reject('a')
//     .then(p => p + '1', p => p + '2')
//     .catch(p => p + 'b')
//     .catch(p => p + 'c')
//     .then(p => p + 'd1')
//     .then('d2')
//     .then(p => p + 'd3')
//     .finally(p => p + 'e')
//     .then(p => console.log(p))

// a2d1d3

/**
 * 9
 */
// console.log('start')
//
// async function foo() {
//     console.log('1')
//     await console.log('2')
//     console.log('3')
// }
//
// foo();
//
// console.log('end')

// start 1 2 end 3
