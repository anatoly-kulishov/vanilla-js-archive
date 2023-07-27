// function curr (fn, ...args) {
//   return (nextArgs) => {
//     const allArgs = [...args, ...nextArgs];
//
//     if(allArgs.length >= fn.length) {
//       return fn(...allArgs)
//     } else {
//       return curr(fn, ...allArgs);
//     }
//   }
// }
//
// const sum = (a) => a + a;
//
// const res = curr(sum);
//
// sum(1)(2)(3)();
/** ************************************************************************ */
// async function  promiseAll(promises){
//   const results = [];
//
//   for(const promise of promises) {
//     try {
//       const res = await promise;
//       results.push(res)
//     } catch (error) {
//       throw error
//     }
//   }
//
//
//   return results;
// }
/** ************************************************************************ */
// const compare = (obj, first, second) => {
//   const firstValue = first
//     .split('.')
//     .reverse()
//     // .reduce(prev, curr) => {}
// };
//
// const o = {
//   f: {
//     s: "second"
//   },
//   t: {
//     f: {
//       x: "second"
//     }
//   }
// };
//
// console.log(compare(o, "f.s", "t.f.x"));

/** ************************************************************************ */
// class Foo {
//   constructor() {
//     this.id = 'foo';
//     this.print();
//   }
//
//   print() {
//     console.log('foo' + this.id);
//   }
// }
//
// class Bar extends Foo {
//   constructor() {
//     super();
//     this.id = 'bar';
//     this.print();
//     super.print();
//   }
//
//   print() {
//     console.log('bar' + this.id);
//   }
// }
//
// new Bar(); // ???

/** ************************************************************************ */
// export default function App() {
//   const [value, setValue] = useState(0);
//
//   const onClick = () => {
//     setValue(value + 1); // 1
//   };
//
//   useEffect(()=>{
//     console.log(value);
//
//     return ()=>{
//       console.log(value);
//     }
//   }, [value]);
//
//   return (
//     <div className="App">
//       <button onClick={onClick}>increase value</button>
//       <h2>{value}</h2>
//     </div>
//   );
// }

// 0 0 1 1 2
/** ************************************************************************ */
// import { useCallback, useEffect, useState, memo } from "react";

// export default function App() {
//   const [counter, setCounter] = useState(0);
//
//   const increment = useCallback(() => {
//     setCounter((prev) => prev + 1);
//   }, []);
//
//   const decrement = useCallback(() => {
//     setCounter((prev) => prev - 1);
//   }, []);
//
//   const clear = useCallback(() => {
//     setCounter(0);
//   }, []);
//
//   return (
//     <div className="App">
//       <CounterView counter={counter} />
//       <Actions increment={increment} decrement={decrement} clear={clear} />
//     </div>
//   );
// }
//
// const CounterView = memo(({ counter }) => {
//   return <div>Current value: {counter}</div>;
// });
//
// const Actions = memo(({ increment, decrement, clear }) => {
//   useEffect(() => {
//     const clear2 = (e) => {
//       console.log(e);
//       if (e.key === "Escape") clear();
//     };
//
//     document.addEventListener("keydown", clear2);
//
//     return () => {
//       document.removeEventListener("keydown", clear2);
//     };
//   }, []);
//
//   return (
//     <div>
//       <button onClick={increment}>+</button>
//       <button onClick={decrement}>-</button>
//       <p>
//         <small>
//           Press <kbd>Esc</kbd> to reset counter.
//         </small>
//       </p>
//     </div>
//   );
// });
