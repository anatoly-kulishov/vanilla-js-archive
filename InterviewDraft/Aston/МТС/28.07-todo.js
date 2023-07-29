// XmlHttpRequest
// идемпотентные методы запросов
// безопасные не ьезопасные, сложные простые
// put patch
// get post : body, идемпотн, кешируемость, сложный post, безопасность
// websocket, short polling, long polling, SSE(server sent events)
// long polling, кешируемость запросов, метро запрос до и после не
// abortController
// SOP(same origin policy) -> CORS, preflight, сложные простые

// div addEvent   <- currentTarget
//   span
//   span    <- target

// target vs currentTarget

// body > div > 'text'
/*
flex
grid
position
margin
padding
display inline-block text align center
transform translateX(50%)
*/

//оптимизация загрузки js async vs defer
//css, критический css

// https://habr.com/ru/post/320430/

// worker

// sync // while (true)
// event {
//   micro all // promise return promise callback then catch finally, queueMicrotask, observers(MutationObserver)
//   render (rAF, rIC, repaint reflow recompose)
//   macro (BOM fetch dom timeout....)
// }

// console.log('start')

// async function foo() {
//   console.log('1')
//   await console.log('2')
//   console.log('3')
// }

// foo();

// console.log('end')

// function a() {
//   console.log('1')
//   Promise.resolve().then(a)
// }

// function b() {
//   console.log('2')
//   setTimeout(b);
// }
// a()
// b()

// console.log(1);

// const p = Promise.resolve(() => {
//   console.log(2);

//   setTimeout(() => console.log(3));
// });

// let z = new Promise(()=>console.log(6));

// setTimeout(() => console.log(4));

// p.then((res) => {
//   res();
//   console.log('name');
// });

// console.log(5);
// 1 6 5 2 name 4 3

/*
Написать функцию fetchWithTimeout, которая на вход принимает массив промисов,
время таймаута и сообщение ошибки. Если один промис из array promises
отрабатывает дольше, чем timeout, выбрасывается error.

function fetchWithTimeout(array promises, timeout, error) {}

const p1 = new Promise((r) => setTimeout(r, 1900, ‘Promise 1 are resolved’))
const p2 = new Promise (r) => setTimeout(r, 2800, ‘Promise 2 are resolved’))

fetchWithTimeout ([p1, p2], 2000, 'Timeout error')
*/

// Promise.reject('a') // a
// .then(p=>p+'1',p=>p+'2') // a2
// .catch(p=>p+'b') //
// .catch(p=>p+'с') //
// .then(p=>p+'d1') // a2d1
// .then('d2') //
// .then(p=>p+'d3') // a2d1d3
// .finally(p=>p+'e') // undefined + e
// .then(p=>console.log(p)) // a2d1d3

// Promise.all, Promise.any ...

// let foo = {
//   bar: 1,
// }

// const baz = foo;

// foo.bar = 2

// foo = {
//   bar: 3
// }

// console.log (baz.bar); // 2

// 'sdfg'.__proto__ == ?
// [].__proto__.__proto__.__proto__ == null

// Promise.all, Array.some, map, filter,  как работает без полифила new bind

// class Animal {
//   constructor(name) {
//     this.name = name;
//   }

//   get getName() {
//     console.log(this.name)
//   }

//   static Hello() {
//     console.log('Hello');
//   }
// }

// class Cat extends Animal {
//   constructor(name, age) {
//     super(name);
//     this.age = age;
//   }
// }


// let animal = new Animal('Petya');
// animal.getName; //Petya
// Animal.Hello(); //Hello

// let cat = new Cat('Vasya', 28);
// cat.getName();// Vasya

// let a = {
//   foo: function() {
//     console.log(this)
//   },
//   bar: () => {
//     console.log(this);
//   }
// }

// a.foo(); // a
// a.bar(); // window

// let c = a.foo;

// c(); // window

// const fn = (cb) => cb()
// fn(a.foo); // window

// console.log(x);

// var x = 1;

// console.log(x);

// function car() {
//   // x = undefined;
//   if (false) {
//       var x = 2;
//   }
//   console.log(x);
// }
// car()
// console.log(x);

// let x = 2

// const foo = () => {
//     console.log(x) // ?
// }

// const bar = () => {
//     console.log(x) // error
//     var x = 1
//     foo()
// }

// bar()

// lex. env: {
//   env record: {inner variable, this},
//   outer: link on outer lex. env
// }

/*
var i = 1;
var b = {};

(function(){
    i++;
    b.j = 1;
})();
console.log(i, b);

(function(i,b){
    i++;
    b.k = 1

})(i, b);
console.log(i, b);
*/

// var a = {};
// function clear(a) {
//   a.b = 2;
//   a = null;
// }
// clear(a);

// console.log(a); // { b: 2 }
// console.log(a.b); // 2
/*
  a - ssilka ->   { b: 2 }
  a - ssilka2(null) --|
*/

// autoboxing
// явн и не явные привидения
// https://learn.javascript.ru/task/sum-many-brackets
