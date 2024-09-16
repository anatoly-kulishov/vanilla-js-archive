/** **************************************************************************************************************** **/

/**
 * Посчитать сумму всех value
 * {
 *     value: 12,
 *     a: {
 *         value: 1,
 *         b: {
 *             value: NaN,
 *             c: {
 *                 value: null,
 *                 d: {
 *                     value: 3
 *                 }
 *             },
 *         },
 *     }
 * }
 */
// function sumValues(obj) {
//     // Code here...
// }
//
// const data = {
//     value: 12,
//     a: {
//         value: 1,
//         b: {
//             value: NaN,
//             c: {
//                 value: null,
//                 d: {
//                     value: 3
//                 }
//             },
//         },
//     }
// };
//
// const totalSum = sumValues(data);
// console.log(totalSum); // Output: 16

/** **************************************************************************************************************** **/

// function currying(fn, ...args) {
//     // Code here...
// }
//
// let curriedSum = (a, b, c) => a + b + c;
//
// let res = currying(curriedSum);
//
// console.log(res(1, 2)(3)); // 6
// console.log(res(1)(2, 3)); // 6

/** **************************************************************************************************************** **/

/**
 * Важно отметить, что регулярное выражение [aeiouаеёиоуыюя] указано с флагами gi,
 * чтобы учесть гласные буквы в разных регистрах (заглавных и строчных).
 */
// function countVowels(str) {
//     // Code here...
// }
//
// console.log(countVowels("привет")) // Output: 2
// console.log(countVowels("првт")) // Output: 0

/** **************************************************************************************************************** **/

/**
 * Отсортировать только нечетные числа
 */
// function sortOddArr(arr) {
//     // Code here...
// }
//
// const ARRAY = [2, 4, 1, 5, 6, 2, 9, 2, 7, 3]
//
// console.log(sortOddArr(ARRAY))

/** **************************************************************************************************************** **/

// function wtf(s) {
//     for(var i = s.length - 1, o = ''; i >= 0; o += s[i--]) {}
//     return o
// }
//
// console.log(wtf('abc'))

/** **************************************************************************************************************** **/

// class Cat {
//     sound = 'meow'
//     say = () => {
//         console.log(this.sound)
//     }
//     say2() {
//         console.log(this.sound)
//     }
// }
//
// const myCat = {
//     sound: 'meow',
//     say: () => {
//         console.log(this.sound)
//     },
//     say2: function () {
//         console.log(this.sound)
//     }
// }
//
// const cat = new Cat()
//
// cat.say() //
// cat.say2() //
//
// myCat.say() //
// myCat.say2() //

/** **************************************************************************************************************** **/

// const HighLoadComp = () => 'HighLoadComp'
//
// function Comp({isActive}) {
//     if(isActive) {
//         return (
//             <div>
//                 <h1>Header</h1>
//                 <HighLoadComp />
//             </div>
//         )
//     }
//
//     return (
//         <div>
//             <HighLoadComp />
//         </div>
//     )
// }

/** **************************************************************************************************************** **/

// import React from "react";
//
// const C1 = ({ children }) => {
//     console.log('1')
//
//     React.useEffect(() => {
//         console.log('2')
//     }, [])
//
//     return <>{children}</>
// };
//
// const C2 = () => {
//     console.log('3')
//
//     React.useEffect(() => {
//         console.log('4')
//     }, [])
//
//     return <>C2</>
// };
//
// function App() {
//     return (
//         <C1>
//             <C2 />
//         </C1>
//     )
// }
//
// export default () => <App />

/** **************************************************************************************************************** **/

// function sentToBack(count) {
//     console.log(count)
// }
//
// class Clock extends React.Component {
//     state = {
//         date: new Date()
//     }
//
//     componentDidMount() {
//         setInterval(() => {
//             this.counter++;
//             this.setState({
//                 date: new Date()
//             })
//         }, 1000)
//     }
//
//     counter = 0
//
//     componentWillUnmount() {
//         sentToBack(this.counter)
//     }
//
//     render() {
//         return <div>{this.state.date.toString()}</div>
//     }
// }
//
// const Clock = () => {
//     const [date, setDate] = useState(new Date())
//     let counter = React.useRef(0)
//
//     React.useEffect(() => {
//         let idInterval = setInterval(() => {
//             counter.current++;
//             setDate(new Date())
//         }, 1000)
//
//         return () => {
//             clearInterval(idInterval)
//             sentToBack(counter.current)
//         }
//     }, []);
//
//
//     return <div>{date.toString()}</div>
// }

/** **************************************************************************************************************** **/

// function areAnagrams(word1, word2) {
//   // Code here...
// }
//
// const word1 = "llaa";
// const word2 = "alla";
//
// const result = areAnagrams(word1, word2);
// console.log(result); // Output: true