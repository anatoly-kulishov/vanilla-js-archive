const sum = (a) => {
  return (b) => {
    return a + b;
  }
}

const mul = (a) => {
  return (b) => {
    return a * b;
  }
}

const calculate = (cb) => {
    return (a) => {
      return (b) => {
        return cb(a, b)
      }
    }
}

console.log(calculate((sum) (3)(2))); // 5
console.log(calculate((mul) (3)(2))); // 6