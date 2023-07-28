// const compare = (obj, first, second) => {
//   // Разбиваем строку first на массив ключей свойств
//   const firstValue = first.split(".").reduce((acc, key) => acc[key], obj);
//
//   // Разбиваем строку second на массив ключей свойств
//   const secondValue = second.split(".").reduce((acc, key) => acc[key], obj);
//
//   // Сравниваем значения и возвращаем результат сравнения (true или false)
//   return firstValue === secondValue;
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
// console.log(compare(o, "f.s", "t.f.x")); // Output: true
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
// new Bar(); // barfoo barbar foobar
/** ************************************************************************ */
// export default function App() {
//   const [value, setValue] = useState(0);
//
//   const onClick = () => {
//     setValue(value + 1); // 1
//   };
//
//   useEffect(() => {
//     console.log(value);
//
//     return () => {
//       console.log(value);
//     };
//   }, [value]);
//
//   return (
//     <div className="App">
//       <button onClick={onClick}>increase value</button>
//       <h2>{value}</h2>
//     </div>
//   );
// }
//
// // 0 0 1 1 2
