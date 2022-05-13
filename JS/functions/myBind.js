Function.prototype.myBind = function (context, ...args) {
  // const self = this; Deprecated approach to bind required context ~ES5
  return (...rest) => {
    return this.call(context, ...args.concat(rest));
    // return self.call(context, ...args.concat(rest)); Deprecated approach to bind required context ~ES5
  }
}

function log(...props) {
  console.log(this.name, this.age, ...props);
}

const obj = {name: 'Anatoly', age: 22};

log.myBind(obj, 'string', 69, true, null, undefined, [], {}, BigInt(1), Symbol('foo'))();