// const upperCase = str => str.toUpperCase();
// const exclaim = str => `${str}!`;
// const repeat = str => `${str} `.repeat(3);

// const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

// const compose2 = (...fns) => {
//     if(fns.length === 0) {
//         return (arg) => arg
//     }
//
//     if(fns.length === 1) {
//         return fns[0]
//     }
//
//     return fns.reduce((a, b) => (...args) => a(b(...args)));
// }

/**
 * Написать собственную реализацию функции compose.
 *
 * 3 мини-функции которые пойду в нее как аргументы:
 ** repeat - повторяет передаваемое слово x3
 ** exclaim - добавляет в конце слова символов: '!'
 ** upperCase - переводить все слово в верхний регистр
 */
const withCompose = compose(
    repeat,
    exclaim,
    upperCase
);

console.log(withCompose("I love coding")); // I LOVE CODING! I LOVE CODING! I LOVE CODING!