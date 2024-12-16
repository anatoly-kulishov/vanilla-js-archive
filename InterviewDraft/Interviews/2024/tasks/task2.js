/** **************************************************************************************************************** **/

// console.log(typeof null); //
// console.log(typeof function () {}); //
// console.log(typeof Object); //
// console.log(typeof Math); //
// console.log(typeof {}); //
// console.log(typeof undefined); //
// console.log(typeof NaN); //
// console.log(typeof Symbol); //
// console.log(typeof typeof 1); //


// console.log(1 + 2 + "" > 3); //
// console.log(null || (2 && 3) || 4); //
// console.log(0 ?? "True"); //
// console.log(0 || "True"); //

/** **************************************************************************************************************** **/

// console.log({} === {}); //
// console.log([] == []); //
// console.log(true == 1); //
// console.log(false == 0); //
// console.log(false === ""); //
// console.log([] == ""); //

// const res3 = Boolean(true && 3) + "d"; //
// console.log(res3); //

/** **************************************************************************************************************** **/

// const array = [1, 2, 3];
// const [first, ...rest] = array;
// console.log(first, rest); //

/** **************************************************************************************************************** **/

// const arr = [1, 2, 3];
// arr.push(4);
// arr.pop();
// arr.push(5);
// console.log(arr); //

/** **************************************************************************************************************** **/

// let a = { b: 1 };
// c = Object.create(a);

// console.log(c.b); //
// delete c.b;
// console.log(c.b); //
// delete a.b;
// console.log(c.b); //
// a.z = 2;
// console.log(c.z); //
// c.z = 3;
// console.log(a.z); //

/** **************************************************************************************************************** **/

// var l = 25;
// var x = 11;

// function bar(foo) {
//   var x = 30;
//   foo();
// }

// function foo() {
//   console.log("x", x); //
// }

// foo.x = 20;
// bar.x = 40;

// bar(foo); //

// l.x = 100;

// console.log("foo.x", foo.x); //
// console.log(bar.l); //
// console.log(l.x); //

/** **************************************************************************************************************** **/

// function makeCounter() {
//   let counter = 0;
//   return function () {
//     return ++counter;
//   };
// }
//
// let someCounter = makeCounter();
//
// for (var i = 0; i < 10; i++) {
//   setTimeout(() => console.log(someCounter()));
// }
//
// console.log('first', someCounter()); //

/** **************************************************************************************************************** **/

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

// const person1 = new Person("Александр");
// const person2 = new Person("Екатерина");

// const regularFunc = person1.sayHelloRegular;
// regularFunc(); //
//
// const arrowFunc = person2.sayHelloArrow;
// arrowFunc(); //

/** **************************************************************************************************************** **/

// class Foo {
//   constructor() {
//     this.id = "foo";
//     this.print();
//   }

//   print() {
//     console.log("foo" + this.id);
//   }
// }

// class Bar extends Foo {
//   constructor() {
//     super();
//     this.id = "bar";
//     this.print();
//     super.print();
//   }

//   print() {
//     console.log("bar" + this.id);
//   }
// }

// new Bar(); //

/** **************************************************************************************************************** **/

// let set = new Set();
// set.add(1).add(2).add(3);
// let map = new Map();
// map.set("a", 1).set("b", 2).set("c", 3);
//
// const data = {
//     num: 123, // 123
//     str: "Some text", // "Some text",
//     undefined: undefined, // undefined // --
//     null: null, // null: null,
//     filled_object: {
//         a: "text",
//         b: "text",
//     }, // {
//     //  a: "text",
//     // b: "text",
//     //   }
//     empty_object: {}, // {}
//     filled_array: [1, 2, 3], // [1, 2, 3],
//     empty_array: [], // []
//     und_array: [undefined, undefined, undefined], // [null, null, null]
//     not_a_number: NaN,  // null
//     set: set, // {}
//     map: map, // {}
//     function: function () {
//         return "hello!";
//     }, // --
//
// };
//
// console.log(JSON.parse(JSON.stringify(data))); //

/** **************************************************************************************************************** **/

// Promise.reject("a")
//     .then(
//         (p) => p + "1",
//         (p) => p + "2"
//     )
//     .catch((p) => p + "b")
//     .catch((p) => p + "с")
//     .then((p) => p + "d1")
//     .then(console.log)
//     .then((p) => p + "d3")
//     .finally((p) => p + "e")
//     .then((p) => console.log(p));

/** **************************************************************************************************************** **/

// setTimeout(() => console.log("a"));
//
// Promise.resolve()
//     .then((first) => {
//         console.log("first:", first);
//         return "b";
//     })
//     .then(
//         Promise.resolve().then((second) => {
//             console.log("second: ", second);
//             return "c";
//         })
//     )
//     .then((third) => console.log("third:", third));
//
// console.log("d");

/** **************************************************************************************************************** **/

// console.log("1");
//
// setTimeout(() => console.log("2"), 1);
//
// let promise = new Promise((resolve) => {
//     console.log("3");
//     resolve();
// });
//
// promise.then(() => console.log("4"));
//
// setTimeout(() => console.log("5"));
//
// console.log("6");

/** **************************************************************************************************************** **/

// const runEventLoopTask = () => {
//     console.log(1);
//     setTimeout(() => console.log(2));
//     Promise.reject(3).catch(console.log);
//     new Promise((resolve) => setTimeout(resolve)).then(() => console.log(4));
//     Promise.resolve(5).then(console.log);
//     console.log(6);
//     setTimeout(() => console.log(7), 0);
// };
//
// runEventLoopTask();

/** **************************************************************************************************************** **/

// Promise.resolve(1)
//     .then(console.log(2))
//     .then((n) => console.log(n))
//     .catch((e) => console.log(e));
//
// console.log(3);
//
// setTimeout(() => {
//     console.log(4);
// }, 4000);
//
// Promise.reject(5)
//     .then(console.log(6))
//     .then((n) => console.log(n))
//     .finally((n) => console.log(n))
//     .catch((e) => console.log(e))
//     .then((n) => console.log(n));
//
// console.log(7);
//
// setTimeout(() => {
//     console.log(8);
// }, 0);

/** **************************************************************************************************************** **/

// console.log("0");
//
// setTimeout(() => {
//     console.log("1");
// }, 0);
//
// let result = new Promise((resolve, reject) => {
//     console.log("2");
//     resolve("3");
//
//     console.log("4");
//     reject("5");
// });
//
// console.log("6");
//
// result
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error))
//     .finally(() => console.log("7"));

/** **************************************************************************************************************** **/

// // В каком порядке выведутся console.log
// const C1 = ({ children }) => {
//     console.log("1");
//
//     React.useEffect(() => {
//         console.log("2");
//     }, []);
//
//     return <>{children}</>;
// };
//
// const C2 = () => {
//     console.log("3");
//
//     React.useEffect(() => {
//         console.log("4");
//     }, []);
//
//     return <div>YOWZ</div>;
// };
//
// export default function App() {
//     return (
//         <C1>
//             <C2 />
//         </C1>
//     );
// }

// StrictMode 11 33 4 2 4 2
// !StrictMode 1 3 4 2

/** **************************************************************************************************************** **/

// Указать неточности и то что можно было бы исправить.
// import React, { useCallback, useEffect, useState  } from "react";
//
// const PleaseReviewMe = () => {
//     const [count, setCount] = useState(1);
//     const [items, setItems] = useState([{ id: 1 }]);
//
//     React.useLayoutEffect(() => {
//         document.addEventListener("click", () => {
//           setInterval(() => console.log(count), 1000);
//         });
//       });
//
//     useEffect(() => {
//         const handleClick = () => {
//             console.log(count)
//         }
//
//         const intervalId = setInterval(handleClick, 1000)
//
//         return () => clearInterval(intervalId)
//     }, [count]);
//
//     const click = useCallback(() => {
//         setCount((prev) => prev + 1);
//         setItems((prev) => [...prev, {id: count + 1}]);
//     }, [count, items]);
//
//     return (
//         <>
//             <ul>
//                 {items.map((item) => (
//                     <li key={item.id}>{item.id}</li>
//                 ))}
//             </ul>
//             <button onClick={click}>add one</button>
//         </>
//     );
// };

/** **************************************************************************************************************** **/

/*
  Какие значения мы увидим в UI и сколько будет рендеров
  до нажатия и после нажатия на кнопку?
*/
// import { useState } from "react";
//
// export default function Counter() {
//     const [count, setCount] = useState(0);
//     const [visible, setVisible] = useState(false);
//
//     const changeCount = () => {
//         setCount(count + 1);
//         setVisible(true);
//     };
//
//     return (
//         <div>
//             {console.log("render")}
//
//             <h1>Counter</h1>
//             <div>{count}</div>
//             <div>{visible}</div>
//             <button onClick={changeCount}>Change count</button>
//         </div>
//     );
// }

/** **************************************************************************************************************** **/

/*
 Вывести значения полей в консоль, при клике на форму,
 учитывая что первый input controlled, а второй input uncontrolled.
*/
// const Check = () => {
//     return (
//         <form>
//             <input placeholder="controlled" />
//             <input placeholder="uncontrolled"/>
//             <button>Отправить заявку на кредит</button>
//         </form>
//     );
// };

/** **************************************************************************************************************** **/

// Review pls
// const AutoComplete = () => {
//     const [search, setSearch] = useState('')
//     const [result, setResult] = useState([])
//
//
//     const handleChange = (event) => {
//         setSearch(event.target.value)
//     }
//
//     useEffect(() => {
//         const getData = async () => {
//             try {
//                 const data = await AudioParam.get('/cities', {search});
//                 if (Array.isArray(data)) {
//                     setResult(data)
//                 }
//             } catch(e) {
//                 throw new Error(e)
//             }
//
//         }
//         if (search) {
//             getData()
//         } else {
//             setResult([])
//         }
//
//     }, [search])
//
//     return (
//         <>
//             <input type="search" name="search" value={search} onChange={handleChange} />
//             <div>
//                 {result.map((item) => (
//                     <div key={item}>{item}</div>
//                 ))}
//             </div>
//         </>
//     )
// }

/** **************************************************************************************************************** **/

// TS 3 Написать Omit
// type SourceType2 = {
//     one: "One";
//     two: "Two";
//     three: "Three";
//     four: "four";
//     10: "10";
// };
//
// type MyOmit<T, K extends keyof T> = {
//     [P in keyof T as P extends K ? never : P]: T[P]
// }

/** **************************************************************************************************************** **/
// TS 7 Написать Record

// Решение:
// type ManProps = {
//     age: number;
//     height: number;
// };
//
// type MyRecord<F extends PropertyKey, L> = {
//     [C in F]: L
// }
