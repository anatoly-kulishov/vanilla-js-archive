/**
 * O(1) [Constant]
 * Push
 * Pop
 *
 * O(n) [Linear]
 * Search
 * Access
 */

module.exports = class Stack {
  constructor() {
    this.count = 0;
    this.storage = {};
  }

  push(value) {
    this.storage [this.count] = value;
    this.count++;
  }

  pop() {
    if (this.count === 0) {
      return undefined;
    }
    this.count--;
    let result = this.storage [this.count];
    delete this.storage [this.count];
    return result;
  }

  peek() {
    return this.storage [this.count - 1];
  }

  size() {
    return this.count;
  }
}