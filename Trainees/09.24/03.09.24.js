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

// const operations = [
//     {date: "2019-07-31", amount: "5422"},
//     {date: "2017-06-30", amount: "5220"},
//     {date: "2017-05-31", amount: "5365"},
//     {date: "2017-08-31", amount: "5451"},
//     {date: "2017-09-30", amount: "5303"},
//     {date: "2018-03-31", amount: "5654"},
//     {date: "2017-10-31", amount: "5509"},
//     {date: "2017-12-31", amount: "5567"},
//     {date: "2018-01-31", amount: "5597"},
//     {date: "2017-11-30", amount: "5359"},
//     {date: "2018-02-28", amount: "5082"},
//     {date: "2018-04-14", amount: "2567"}
// ]
//
// const sortOperations = (operations) => {
//     // Code here...
// }
//
// console.log(sortOperations(operations))

/** **************************************************************************************************************** **/

// function checkOrder() {
//     console.log('1');
//
//     async function asyncFn() {
//         console.log('2');
//         await Promise.resolve(null);
//         console.log('3');
//     }
//
//     asyncFn();
//
//     new Promise((resolve) => {
//         setTimeout(() => {
//             resolve();
//             console.log('4');
//         }, 0);
//     }).then(() => {
//         console.log('5');
//     });
//
//     console.log('6');
// }
//
// checkOrder();

/** **************************************************************************************************************** **/

// setTimeout(() => console.log('setTimeout'), 0);
//
// async function bar() {
//     console.log(10);
//     await Promise.resolve();
//     console.log(20);
//     return 30;
// }
//
// async function foo() {
//     console.log(40);
//     bar();
//     const data1 = await 'other';
//     console.log(data1);
//     await 50;
//     const data2 = await bar();
//     console.log(data2);
// }
//
// foo();
// console.log(60);