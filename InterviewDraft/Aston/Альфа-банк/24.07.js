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
//       <input
//         value={controlledInputValue}
//         onChange={(e) => setControlledInputValue(e.target.value)}
//         placeholder="controlled" />
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
//   const myIntervalRef = useRef();
//
//   const setIntervalCount = () => {
//     myIntervalRef.current = setInterval(() => console.log(count), 1000);
//   }
//
//   React.useEffect(() => {
//     document.addEventListener("click", setIntervalCount);
//
//     return () => {
//       clearInterval(myIntervalRef.current);
//       document.removeEventListener("click", setIntervalCount);
//     };
//   }, []); // Пустой массив зависимостей, чтобы создать/очистить интервал только один раз.
//
//   // Hint: useCallback здесь не нужен, тк мы передаем его в кнопку, а не мемоизированный компонент!
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

// useMemo для 2-й загрузки и последующих
// Асинхронные вычисления с помощью useEffect
// web-worker
// lazy Suspense
// React.memo
// virtualization(IntersectionObserver), pagination
// деление на чанки метода (Promise, setTimeout) основной способ
// Предварительная обработка данных на сервере
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

// start 1 2 end 3
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

// 10, 35, 35, 40
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

// 1 6 5 2 name 4 3
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

// 1 2 1 1 1 1∞...
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
