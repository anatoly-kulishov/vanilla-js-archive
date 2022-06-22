/**
 * O(1)
 * Enqueue
 * Dequeue
 */

class Queue {
  constructor() {
    this.elements = {};
    this.head = 0;
    this.tail = 0;
  }

  enqueue(element) {
    this.elements[this.tail] = element;
    this.tail++;
  }

  dequeue() {
    const item = this.elements[this.head];
    delete this.elements[this.head];
    this.head++;
    return item;
  }

  peek() {
    return this.elements[this.head];
  }

  get length() {
    return this.tail - this.head;
  }

  get isEmpty() {
    return this.length === 0;
  }
}

let q = new Queue();

for(let i = 1; i <= 5; i++) {
  q.enqueue(`element${i}`); // Enqueue ~ O(1)
}

console.log(q.peek()); // element1

q.dequeue(); // Dequeue ~ O(1)

console.log(q.peek()); // element2