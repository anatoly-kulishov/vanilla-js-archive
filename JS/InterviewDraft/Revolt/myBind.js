const testCase = require("../../Helper/testCase");

function plus(x, y) {
  return x + y;
}

Function.prototype.myBind = function (context, ...args) {
  // const self = this; Deprecated approach to bind required context ~ES5
  return (...rest) => {
    return this.call(context, ...args.concat(rest));
    // return self.call(context, ...args.concat(rest)); Deprecated approach to bind required context ~ES5
  }
}

const plus4 = plus.myBind(null, 4);

testCase(plus4(4), 8, true);
testCase(plus4(6), 10, true);