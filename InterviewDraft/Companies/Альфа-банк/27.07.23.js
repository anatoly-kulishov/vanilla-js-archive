/** Function programming */
// чистые функций, хок(фун-и высшего порядка), фу-и первого класса(FE), композиция,
// каррирование, частичное применение, рекурсия, замыкание
/** TypeScript */
// infer
// type guards(typeof, in, instanceOf, is)
// utility types: Omit, Pick, Record etc.
// Exclude vs Omit, declare, type vs interface

// type Arr = number | Array<Arr>;
// let arr: Arr = [1, 2, 4, 5, [1, 2], [4, 5, [3, 2, [5, 6], 4], 6]];

// interface Animal { name: string; age: number; }
// function a(obj: Animal, keyof Animal) {}
// a({name: 'alex', age: 2}, 'name', 'age')
/** Big(O) */
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
/** countVowels */
// console.log('привет'.match(/[aeiouаеёиоуыюя]/gi).length); // 2
/** unique value */
// console.log([...new Set('AAAAbbbbcccee332')].join(''));
// 'Abce32'
/** sort by number in the string */
// console.log(['app4le', 'melon2', 'b5anana'].sort((a,b) => a.match(/\d/) - b.match(/\d/)));
