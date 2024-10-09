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
//     <form onSubmit={onClickForm}>
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
/** **************************************************************************************************************** **/
// import React from "react";
//
// const PleaseReviewMe = () => {
//   const [count, setCount] = React.useState(1);
//   const [items, setItems] = React.useState([{ id: 1 }]);
//
//   React.useEffect(() => {
//     document.addEventListener("click", setInterval(() => console.log(count), 1000));
//   }, []);
//
//   const click = React.useCallback(() => {
//     setCount(count + 1); // 1
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
//       <button onClick={() => click()}>add one</button>
//     </React.Fragment>
//   );
// };
//
// export default PleaseReviewMe;
/** **************************************************************************************************************** **/
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
