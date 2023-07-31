function foo(something) {
  this.a = something;
}

var obj1 = {};

var bar = foo.bind(obj1);

bar(2);

console.log(obj1.a); // 2

var obj2 = new bar(3);

console.log(obj1.a); // 2
console.log(obj2.a); // 3

