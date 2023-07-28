// console.log('привет'.match(/[aeiouаеёиоуыюя]/gi).length); // 2
/** ************************************************************************ */
// console.log([...new Set('AAAAbbbbcccee332')].join(''));
// // 'Abce32'
/** ************************************************************************ */
// console.log(['app4le', 'melon2', 'b5anana'].sort((a,b) => a.match(/\d/) - b.match(/\d/)));
/** ************************************************************************ */
// console.log([
//   { title: "dsf", salary: 1800 },
//   { title: "dsf", salary: 2100 },
//   { title: "dsf", salary: 1900 }]
//   .sort((a, b) => b.salary - a.salary));
/** ************************************************************************ */
// 1 logn nlogn n n^2 n^3... n! 2^n
// for {} // n
// for {} // 2n => n
// for {} // 3n => n
// for {
//   for { //n^2
//     for { //n^3
//
//     }
//   }
// }
/** ************************************************************************ */
// function isPolyndrom(str) {
//   let reversedStr = '';
//
//   for(let i = str.length; i >= 0; i--) {
//     const current = str[i];
//     reversedStr += current;
//   }
//
//   return reversedStr === str; // O(1*n) = O(n)
//
//   // return str === str.split('').reverse().join(''); // O(3*n) = O(n)
// }
//
// console.log(isPolyndrom('alla')) // true
// console.log(isPolyndrom('шалаш')) // true
// console.log(isPolyndrom('ягодая')) // false
/** ************************************************************************ */
// чистые функций, хок(фун-и высшего порядка), фу-и первого класса(FE), композиция,
// каррирование, частичное применение, рекурсия, замыкание
/** ************************************************************************ */
// infer
// type guards(typeof, in, instanceOf, is)
// utility types: Omit, Pick, Record etc.
// Exclude vs Omit, declare, type vs interface
// let arr = [1,2,4,5,[4,5,[3,2,[5,6,],4,],6]];
// type Arr = number | Array<number> | Array<Arr>;
// function a(obj: Animal, key: keyof Animal) {}
