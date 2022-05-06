class LinkedList {
  #length = 0

  constructor() {
    this.head = null
    this.tail = null
  }

  addToTail(value) {
    const node = {
      value,
      next: null
    }

    if (this.#length === 0) {
      this.head = node
      this.tail = node
    } else {
      this.tail = node
    }

    this.#length++
  }

  removeFromHead() {
    if (this.#length === 0) {
      return
    }

    const value = this.head.value

    this.head = this.head.next
    this.#length--

    return value
  }

  size() {
    return this.#length
  }
}


class Queue extends LinkedList {
  constructor() {
    super()

    this.enqueue = this.addToTail
    this.dequeue = this.removeFromHead
  }

  get size() {
    return super.size()
  }
}

const table = new Queue();

table.enqueue(1);
table.enqueue(2);
table.enqueue(4);

table.dequeue();

console.log(table.size);