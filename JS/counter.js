function makeCounter() {
  let count = 0;
  return function () {
    return ++count;
  };
}

const counter = makeCounter();
const counter2 = makeCounter();

counter(); // 1
console.log(counter()); // 2

counter2(); // 1
counter2(); // 2
console.log(counter2()); // 3