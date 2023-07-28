/**
 Вывести значения полей в консоль, при клике на форму,
 учитывая что первый input controlled, а второй input uncontrolled.
 */
// import React from "react";
//
// export default () => {
//   const [controlledInputValue, setControlledInputValue] = useState("");
//   const uncontrolledInputElement = useRef();
//
//   const onClickForm = (e) => {
//     e.preventDefault();
//
//     console.log("controlled: ", controlledInputValue);
//     console.log("uncontrolled: ", uncontrolledInputElement.current.value);
//   };
//
//   return (
//     <form onClick={onClickForm}>
//       <input value={controlledInputValue} onChange={setControlledInputValue} placeholder="controlled" />
//       <input placeholder="uncontrolled" ref={uncontrolledInputElement} />
//
//       <button>Отправить заявку на кредит</button>
//     </form>
//   );
// };
/** ************************************************************************ */
// import React from "react";
//
// const PleaseReviewMe = () => {
//   const [count, setCount] = React.useState(1);
//   const [items, setItems] = React.useState([{ id: 1 }]);
//
//   let myInterval;
//
//   const setIntervalCount = () => {
//     myInterval = setInterval(() => console.log(count), 1000);
//   }
//
//   React.useEffect(() => {
//     document.addEventListener("click", setIntervalCount);
//
//     return () => {
//       clearInterval(myInterval);
//       document.removeEventListener("click", setIntervalCount);
//     }
//   }, []);
//
//  Hint: useCallback здесь не нужен, тк мы передаем его в кнопку а не мемоизированный компонент!
//   const click = React.useCallback(() => {
//     // батчинг #1
//     // setCount(count + 1); // 0
//     // setCount(count + 1); // 1
//
//     // батчинг #2
//     // setCount(prev => prev + 1); // 1
//
//     setCount(prev => prev + 1);
//     setItems((prev) => [...prev, { id: count + 1 }]);
//   }, [items, count])
//
//   return (
//     <React.Fragment>
//       <ul>
//         {items.map((item) => (
//           <li key={item.id}>{item.id}</li>
//         ))}
//       </ul>
//       <button onClick={click}>add one</button>
//     </React.Fragment>
//   );
// };
//
// export default PleaseReviewMe;
/** ************************************************************************ */
// import heavyComputations from './util'
//
// const [data, setData] = useState(heavyComputations(props.basedOn)) // heavy computation

// useMemo 2 загрузку и последующие
// lazy Suspense
// React.memo
// virtualization(IntersectionObserver), pagination
// web-workers
// деление на чанки метода (Promise,setTimeout) основной способ
/** ************************************************************************ */
// function currying(fn, ...args) {
//   return (...nextArgs) => {
//     const allArgs = [...args, ...nextArgs];
//
//     if (allArgs.length >= fn.length) {
//       return fn(...allArgs);
//     } else {
//       return currying(fn, ...allArgs);
//     }
//   };
// }
//
// let curriedSum = (a, b, c) => a + b + c;
//
// let res = currying(curriedSum);
//
// console.log(res(1, 2)(3)); // 6
// console.log(res(1)(2, 3)); // 6
/** ************************************************************************ */
// function makeMemo(fn) {
//   const cache = {};
//
//   return function memoized(...args) {
//     const key = JSON.stringify(args);
//
//     if (cache[key] === undefined) {
//       cache[key] = fn(...args);
//     }
//
//     return cache[key];
//   };
// }
//
// function sum(a, b, c) {
//   console.log("sum()");
//   return a + b + c;
// }
//
// const memoSum = makeMemo(sum);
//
// // ожидание: sum выведется только после первого вызова и последнего
// console.log(memoSum(1, 2, 3)); // sum, 6
// console.log(memoSum(1, 2, 3)); // 6
// console.log(memoSum(1, 2, 3)); // 6
// console.log(memoSum(1, 2, 5)); // sum, 8
/** ************************************************************************ */
// class EventEmitter {
//   constructor() {
//     this.events = {};
//   }
//
//   on(eventName, callback) {
//     if (!this.events[eventName]) {
//       this.events[eventName] = [];
//     }
//     this.events[eventName].push(callback);
//   }
//
//   off(eventName, callback) {
//     if (this.events[eventName]) {
//       this.events[eventName] = this.events[eventName].filter(
//         (cb) => cb !== callback
//       );
//     }
//   }
//
//   emit(eventName) {
//     if (this.events[eventName]) {
//       this.events[eventName].forEach((callback) => callback());
//     }
//   }
// }
//
// let a = new EventEmitter();
//
// function console1() { console.log(1); }
// function console2() { console.log(2); }
//
// a.on("event1", console1);
// a.on("event2", console2);
//
// a.emit("event1"); // Output: 1
// a.emit("event2"); // Output: 2
//
// a.off("event2");
//
// a.emit("event1"); // Output: 1
/** ************************************************************************ */
/** (Array.prototype.map) */
// Array.prototype.myMap = function(callback, thisArg) {
//   if (this == null) throw new TypeError("this is null or not defined");
//   if (typeof callback !== "function") throw new TypeError(callback + " is not a function");
//
//   const array = Object(this);
//   const length = array.length >>> 0;
//   const result = new Array(length);
//   const context = thisArg || this;
//
//   for (let i = 0; i < length; i++) {
//     if (i in array) {
//       result[i] = callback.call(context, array[i], i, array);
//     }
//   }
//
//   return result;
// };
//
// console.log([1, 2, 3].map((el) => el + 1)); // [ 2, 3, 4 ]
/** (Array.prototype.some) */
// Array.prototype.some = function(callback, thisArg) {
//   if (this == null) throw new TypeError("this is null or not defined");
//   if (typeof callback !== "function") throw new TypeError(callback + " is not a function");
//
//   const array = Object(this);
//   const length = array.length >>> 0;
//   const context = thisArg || this;
//
//   for (let i = 0; i < length; i++) {
//     if (i in array && callback.call(context, array[i], i, array)) {
//       return true;
//     }
//   }
//
//   return false;
// }
//
// console.log([1, 2, 3].some((num) => num > 2)); // true
// console.log([1, 2, 3].some((num) => num > 3)); // false
/** (Array.prototype.filter) */
// Array.prototype.filter = function(callback, thisArg) {
//   if (this == null) throw new TypeError("this is null or not defined");
//   if (typeof callback !== "function") throw new TypeError(callback + " is not a function");
//
//   const array = Object(this);
//   const length = array.length >>> 0;
//   const result = [];
//   const context = thisArg || this;
//
//   for (let i = 0; i < length; i++) {
//     if (i in array) {
//       const element = array[i];
//       if (callback.call(context, element, i, array)) {
//         result.push(element);
//       }
//     }
//   }
//
//   return result;
// };
/** (Promise.all) */
// Promise.all = function(iterable) {
//   return new Promise(function(resolve, reject) {
//     if (!Array.isArray(iterable)) {
//       return reject(new TypeError("Promise.all accepts an array"));
//     }
//
//     let resolvedCount = 0;
//     const promisesLength = iterable.length;
//     const results = new Array(promisesLength);
//
//     function resolvePromise(index, value) {
//       resolvedCount++;
//       results[index] = value;
//
//       if (resolvedCount === promisesLength) {
//         resolve(results);
//       }
//     }
//
//     for (let i = 0; i < promisesLength; i++) {
//       Promise.resolve(iterable[i]).then(function(value) {
//         resolvePromise(i, value);
//       }, reject);
//     }
//   });
// };
/** ************************************************************************ */
// console.log('start')
//
// async function foo() {
//   console.log('1')
//   await console.log('2')
//   console.log('3')
// }
//
// foo();
// console.log('end')
//
// // start 1 2 end 3
/** ************************************************************************ */
// let a = 10;
// setTimeout(function timeout() {
//     console.log(a); // 40
//     a = 30;
// }, 0);
//
// let p = new Promise(function(resolve, reject) {
//     console.log(a); // 10
//     a = 35;
//     resolve();
// });
//
// p.then(function(){
//     console.log(a); // 35
//     a = 40
// });
//
// console.log(a); // 35
//
// // 10, 35, 35, 40
/** ************************************************************************ */
// console.log(1);
//
// const p = Promise.resolve(() => {
//   console.log(2);
//
//   setTimeout(() => console.log(3));
// });
//
// let z = new Promise(() => console.log(6));
//
// setTimeout(() => console.log(4));
//
// p.then((res) => {
//   res();
//   console.log("name");
// });
//
// console.log(5);
//
// // 1 6 5 2 name 4 3
/** ************************************************************************ */
// function a() {
//   console.log("1");
//   Promise.resolve().then(a);
// }
//
// function b() {
//   console.log("2");
//   setTimeout(b);
// }
//
// a();
// b();
//
// // 1 2 1 1 1 1 ...
/** ************************************************************************ */
// Promise.resolve()
//   .then(()=>console.log(1))
//   .then(()=>console.log(1))
// Promise.resolve()
//   .then(()=>console.log(2))
//   .then(()=>console.log(2))
/** ************************************************************************ */
// var userService = {
//   currentFilter: "active",
//   users: [
//     { name: "Alex", status: "active" },
//     { name: "Nick", status: "deleted" }
//   ],
//   getFilteredUsers: function() {
//     let that = this // 1 - option
//
//     return this.users.filter(function(user) {
//       console.log(this.currentFilter)
//       return user.status === this.currentFilter;
//     }, this); // 2 - option
//   }
// };
//
// console.log(userService.getFilteredUsers());
/** ************************************************************************ */
// let a = {
//   foo: function() {
//     console.log(this)
//   },
//   bar: () => {
//     console.log(this);
//   }
// }
//
// a.foo(); // a
// a.bar()// window
//
// let c = a.foo // .bind(a);
//
// c(); // window | undefined
//
// const fn = (cb) => cb();
// fn(a.foo); // window | undefined
/** ************************************************************************ */
// let x = 1
//
// function foo()  {
//     console.log(x); // 1
// }
//
// const bar = () => {
//     console.log(x); // error
//     let x = 1;
//     foo();
// }
//
// bar();
/** ************************************************************************ */
// var c = 1;
//
// function a(func) {
//   var c = 2;
//
//   func();
// }
//
// function b() {
//   console.log(c); // 1
// }
//
// a(b);
