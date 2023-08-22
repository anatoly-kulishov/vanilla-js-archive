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
//   // Output: useCallback здесь не нужен, тк мы передаем его в кнопку, а не мемоизированный компонент!
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
