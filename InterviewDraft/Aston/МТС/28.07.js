
// XmlHttpRequest
// идемпотентные методы запросов
// безопасные не ьезопасные, сложные простые
// put patch
// get post : body, идемпотн, кешируемость, сложный post, безопасность
// websocket, short polling, long polling, SSE(server sent events)
// long polling, кешируемость запросов, метро запрос до и после не
// abortController
// SOP(same origni policy) -> CORS, preflight, сложные простые


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




// Promise.resolve()
//   .then(()=>console.log(1))
//   .then(()=>console.log(1))
// Promise.resolve()
//   .then(()=>console.log(2))
//   .then(()=>console.log(2))




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






// var userService = {
//   currentFilter: "active",
//   users: [
//     { name: "Alex", status: "active" },
//     { name: "Nick", status: "deleted" }
//   ],
//   getFilteredUsers: function() {
//     const filterFn = function(user) {
//       return user.status === this.currentFilter;
//     }

//     return this.users.filter(filterFn.bind(userService));
//   }
// };

// console.log(userService.getFilteredUsers());











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
/*

function curr(fn, ...args) {
  return function(...newArgs) {

  };
}

const sum = (a) => a + a;

const res = curr(sum);

console.log(res(1)(2)(3)()); // Output: 6
*/

/*

class Foo {
  constructor() {
    this.id = 'foo';
    this.print();
  }

  print() {
    console.log('foo' + this.id);
  }
}

class Bar extends Foo {
  constructor() {
    super();
    this.id = 'bar';
    this.print();
    super.print();
  }

  print() {
    console.log('bar' + this.id);
  }
}

new Bar(); // barfoo barbar foobar

*/



/*

function currying(fn, ...args) {
  return (...nextArgs) => {
    const allArgs = [...args, ...nextArgs];

    if (allArgs.length >= fn.length) {
      return fn(...allArgs);
    } else {
      return currying(fn, ...allArgs);
    }
  };
}

let curriedSum = (a, b, c) => a + b + c;

console.log(res(1, 2)(3)); // 6
console.log(res(1)(2, 3)); // 6
*/
















// 'привет'.matchAll(/\[оеиыяу]/).length;




// console.log([...new Set('AAAAbbbbcccee332')].join(''));
// 'Abce32'





// console.log(['app4le', 'melon2', 'b5anana'].sort((a,b) => a.match(/\d/) - b.match(/\d/)));

// console.log(['melon2', 'app4le', 'b5anana']);

/*
console.log([
  {title: 'dsf', salary: 1800},
  {title: 'dsf', salary: 2100},
  {title: 'dsf', salary: 1900}].sort((a, b) => b.salary - a.salary);
*/





/*
https://www.youtube.com/watch?v=Fu4BzQNN0Qs&t=1s&ab_channel=Front-endScience%D1%96%D0%B7%D0%A1%D0%B5%D1%80%D0%B3%D1%96%D1%94%D0%BC%D0%9F%D1%83%D0%B7%D0%B0%D0%BD%D0%BA%D0%BE%D0%B2%D0%B8%D0%BC


// 1 logn nlogn n n^2 n^3... n! 2^n

for {} //n
for {} //2n => n
for {} //3n => n


for {
  for { //n^2
    for { //n^3

    }
  }
}


function isPolyndrom(str) {
  let reversedStr = '';

  for(let i = str.length; i >= 0; i--) {
    const current = str[i];
    reversedStr += current;
  }

  return reversedStr === str; //O(1*n) = O(n)

  // return str === str.split('').reverse().join(''); // O(3*n) = O(n)
}

console.log(isPolyndrom('alla')) //true
console.log(isPolyndrom('шалаш')) //true
console.log(isPolyndrom('ягодая')) //false
*/








// виды полиморфизма
//

// приватные поля


// чистые функ-и, хок(фун-и высшего порядка), фу-и первого класса(FE), композиция,
// каррирование, частичное применение, рекурсия, замыкание


// infer
// type guards(typeof, in, instaceof, is)
// utility types
// Exclude vs Omit, declare, type vs interface
// let arr = [1,2,4,5,[4,5,[3,2,[5,6,],4,],6]];
// type Arr = number | Array<number> | Array<Arr>;

// function a(obj: Animal, key: ) {}
