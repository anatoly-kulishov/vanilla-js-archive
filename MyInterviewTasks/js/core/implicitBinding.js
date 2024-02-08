/** Output: [Object 1, Object 2] */
let obj1 = {
  name: "Object 1",
  doSomething: function() {
    console.log(this.name);
    obj2.doSomethingElse();
  }
};

let obj2 = {
  name: "Object 2",
  doSomethingElse: function() {
    console.log(this.name);
  }
};

obj1.doSomething(); // Output:
