// async function a(p) {
//   return p;
// }

// console.log("1");
// (async function () {
//   console.log("f1");
//   console.log(await "a1");
//   console.log("f2");
//   console.log(await a("a2"));
//   console.log("f3");
// })();
// console.log("2");

// // 1 f1 2 a1 f2 a2 f3


// const foo = async () => {
//   console.log("1");
//   return 100;
// };

// const bar = async () => {
//   console.log("2");
//   const r = await foo();
//   console.log(r);
//   foo().then((res) => console.log(res));
//   await console.log("3");
//   console.log(await "4");
// };

// bar();


////////////////////////////////////////////////////////////////////////////////////////////////////

// queueMicrotask(() => {
//   console.log("1");
// });

// Promise.reject("2")
//   .catch((res1) => {
//     console.log("res1", res1);
//     return "4";
//   })
//   .then((res2) => {
//     console.log("res2", res2);
//   }, );

// queueMicrotask(() => {
//   console.log("3");
// });

// 1 2 3 4

// ////////////////////////////////////////////////////////////////////////////////////////////////////


// function logger() {
//   console.log(`I output only external context: ${this.item}`);
// }

// const obj = { item: "some value" };
// const obj22 = { item: "some value 2" };
// const obj33 = { item: "some value 3" };

// // logger.bind(obj)();
// // logger.apply(obj);
// // logger.call(obj);
// logger.bind(obj).bind(obj22).call(obj33); // ()



////////////////////////////////////////////////////////////////////////////////////////////////////

// function makeCounter() {
//   let counter = 0; // 1
//   return function () {
//     return ++counter;
//   };
// }

// let someCounter = makeCounter();

// for (var i = 0; i < 10; i++) {
//   setTimeout(() => console.log(someCounter())); // 2...11
// }

// console.log(someCounter()); // 1

////////////////////////////////////////////////////////////////////////////////////////////////////

// class Person {
//   constructor(name) {
//     this.name = name;
//   }

//   sayHelloRegular() {
//     console.log(`Привет, меня зовут ${this.name}`);
//   }

//   sayHelloArrow = () => {
//     console.log(`Привет, меня зовут ${this.name}`);
//   };
// }

// const person1 = new Person("Александр"); //
// const person2 = new Person("Екатерина");

// // const regularFunc = person1.sayHelloRegular.bind(person1);
// // regularFunc(); //

// // const arrowFunc = person2.sayHelloArrow;
// // arrowFunc(); // Екатерина
