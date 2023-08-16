/**
 * #1 (Конструктор Promise)
 * Output: [start, 1, end]
 * Блоки синхронного кода всегда выполняются последовательно сверху вниз.
 * Когда мы вызываем new Promise(callback), функция коллбэка будет выполнена сразу же.
 */
// console.log('start');
//
// const promise1 = new Promise((resolve, reject) => {
//   console.log(1)
// })
//
// console.log('end');

// Output:
/** **************************************************** */
/**
 * #2 (.then())
 * Output: [start, 1, end, 2]
 * Помните о том, что интерпретатор JS всегда сначала выполняет синхронный код, а затем асинхронный.
 */
// console.log('start');
//
// const promise1 = new Promise((resolve, reject) => {
//   console.log(1)
//   resolve(2)
// })
//
// promise1.then(res => {
//   console.log(res)
// })
//
// console.log('end');

// Output:
/** **************************************************** */
/**
 * #3 (resolve())
 * Output: [start, 1, 3, end, 2]
 * Помните, что метод resolve не прерывает выполнение функции.
 * Код, стоящий за ним, по-прежнему будет выполняться.
 */
// console.log("start");
//
// const promise1 = new Promise((resolve, reject) => {
//   console.log(1);
//   resolve(2);
//   console.log(3);
// });
//
// promise1.then(res => {
//   console.log(res);
// });
//
// console.log("end");

// Output:
/** **************************************************** */
/**
 * #4 (resolve() не вызывается)
 * Output: [start, 1, end]
 * В этом коде метод resolve никогда не вызывался, поэтому promise1 всегда находится в состоянии ожидания (pending).
 * Так что promise1.then(…) никогда не выполнялся. 2 не выводится в консоли
 */
// console.log("start");
//
// const promise2 = new Promise((resolve, reject) => {
//   console.log(1);
// });
//
// promise2.then((res) => {
//   console.log(2);
// });
//
// console.log("end");

// Output:
/** **************************************************** */
/**
 * #5 (Нечто, сбивающее с толку)
 * Output: [start, middle, 1, end, success]
 * Сначала выполняется синхронный код, а затем асинхронный.
 * Синхронный код выполняется в том порядке, в котором он был вызван
 */
// console.log('start')
//
// const fn = () => (new Promise((resolve, reject) => {
//   console.log(1);
//   resolve('success')
// }))
//
// console.log('middle')
//
// fn().then(res => {
//   console.log(res)
// })
//
// console.log('end')

// Output:
/** **************************************************** */
/**
 * #6 (Fulfilling Promise)
 * Output: [start, end, 1, 2]
 * Здесь Promise.resolve(1) вернет объект Promise, состояние которого fulfilled, а результат равен 1 .
 * Это синхронный код.
 */
// console.log('start')
//
// Promise.resolve(1).then((res) => {
//   console.log(res)
// })
//
// Promise.resolve(2).then((res) => {
//   console.log(res)
// })
//
// console.log('end')

// Output:
/** **************************************************** */
/**
 * #7 (setTimeout vs Promise)
 * Output: [start, end, resolve, setTimeout]
 */
// console.log("start");
//
// setTimeout(() => {
//   console.log("setTimeout");
// });
//
// Promise.resolve().then(() => {
//   console.log("resolve");
// });
//
// console.log("end");

// Output:
/** **************************************************** */
/**
 * #8 (Микрозадачи смешиваются с макрозадачами)
 * Output: [1, 2, 4, timerStart, timerEnd, success]
 * Найти синхронный код.
 * Найти код микрозадачи.
 * Найти код макрозадачи.
 * Сначала выполните синхронный код
 */
// const promise = new Promise((resolve, reject) => {
//   console.log(1);
//   setTimeout(() => {
//     console.log("timerStart");
//     resolve("success");
//     console.log("timerEnd");
//   }, 0);
//   console.log(2);
// });
//
// promise.then((res) => {
//   console.log(res);
// });
//
// console.log(4);

// Output:
/** **************************************************** */
/**
 * #9 (приоритизировать микрозадачи и макрозадачи)
 * Output: [timer1, promise1, timer2]
 * Сначала выполняются все микрозадачи.
 * Выполняется одна макрозадача.
 * Повторно выполняются все (вновь добавленные) микрозадачи.
 * Выполняется следующая макрозадача.
 * Цикл повторяется / Цикл завершается.
 */
// const timer1 = setTimeout(() => {
//   console.log('timer1');
//
//   const promise1 = Promise.resolve().then(() => {
//     console.log('promise1')
//   })
// }, 0)
//
// const timer2 = setTimeout(() => {
//   console.log('timer2')
// }, 0)

// Output:
/** **************************************************** */
/**
 * #10 (типичный вопрос с собеседования)
 * Output: [start, 'end', 'promise1', 'timer1', 'promise2', 'timer2']
 */
// console.log('start');
//
// const promise1 = Promise.resolve().then(() => {
//   console.log('promise1');
//   const timer2 = setTimeout(() => {
//     console.log('timer2')
//   }, 0)
// });
//
// const timer1 = setTimeout(() => {
//   console.log('timer1')
//   const promise2 = Promise.resolve().then(() => {
//     console.log('promise2')
//   })
// }, 0)
//
// console.log('end');

// Output:
