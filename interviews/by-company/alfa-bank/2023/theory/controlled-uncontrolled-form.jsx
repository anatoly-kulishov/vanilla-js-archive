/**
 * Вывести значения полей в консоль при submit формы.
 * Первый input — controlled, второй — uncontrolled.
 */
// import React, { useRef, useState } from "react";
//
// export default () => {
//   const [controlledInputValue, setControlledInputValue] = useState("");
//   const uncontrolledInputElement = useRef();
//
//   const onClickForm = (e) => {
//     e.preventDefault();
//     console.log("controlled: ", controlledInputValue);
//     console.log("uncontrolled: ", uncontrolledInputElement.current.value);
//   };
//
//   return (
//     <form onSubmit={onClickForm}>
//       <input
//         value={controlledInputValue}
//         onChange={(e) => setControlledInputValue(e.target.value)}
//         placeholder="controlled"
//       />
//       <input placeholder="uncontrolled" ref={uncontrolledInputElement} />
//       <button>Отправить заявку на кредит</button>
//     </form>
//   );
// };
