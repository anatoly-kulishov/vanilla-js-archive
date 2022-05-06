class QueueHashTable {
  #storage = {};
  #last = 0;
  #first = 0;

  enqueue(item) {
    this.#storage[this.#last] = item;
    this.#last++;
  }

  dequeue() {
    if (this.size === 0) {
      return;
    }
    const value = this.#storage[this.#first];
    delete this.#storage[this.#first];
    this.#first++;
    return value;
  }

  print() {
    console.table(this.#storage);
  }

  get size() {
    return this.#last - this.#first;
  }
}

const table = new QueueHashTable();

table.enqueue(1);
table.enqueue(5);
table.enqueue(10);

table.dequeue();

table.enqueue(0);

console.log(table.size); // 3

/**
 * ┌─────────┬────────┐
 * │ (index) │ Values │
 * ├─────────┼────────┤
 * │    1    │   5    │
 * │    2    │   10   │
 * │    3    │   0    │
 * └─────────┴────────┘
 */
table.print();