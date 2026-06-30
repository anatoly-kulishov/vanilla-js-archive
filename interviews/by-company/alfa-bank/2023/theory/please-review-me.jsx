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
//     setCount(count + 1);
//     setItems((prev) => [...prev, { id: count + 1 }]);
//   }, [items, count]);
//
//   return (
//     <>
//       <ul>
//         {items.map((item) => (
//           <li key={item.id}>{item.id}</li>
//         ))}
//       </ul>
//       <button onClick={() => click()}>add one</button>
//     </>
//   );
// };
//
// export default PleaseReviewMe;
