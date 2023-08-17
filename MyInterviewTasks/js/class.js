/** Output: [1: "Чек от месье Ivan", 2: Error (is non a function)] */
// class Customer {
//   constructor(name) {
//     this.name = name;
//   }
// }
//
// Customer.prototype.pay = function() {
//   console.log(`Чек от месье ${this.name}`);
// };
//
// const Ivan = new Customer("Ivan");
//
// Ivan.pay();
//
// delete Customer.prototype.pay;
//
// Ivan.pay();
/** **************************************************** */
/**
 * (Inheritance)
 * Output: [barfoo barbar foobar]
 */
// class Foo {
//   constructor() {
//     this.id = "foo";
//     this.print();
//   }
//
//   print() {
//     console.log("foo" + this.id);
//   }
// }
//
// class Bar extends Foo {
//   constructor() {
//     super();
//     this.id = "bar";
//     this.print();
//     super.print();
//   }
//
//   print() {
//     console.log("bar" + this.id);
//   }
// }
//
// new Bar(); // Output:
