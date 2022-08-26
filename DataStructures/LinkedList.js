/**
 * O(n) [Linear]
 * Insertion and removal from a closed location
 * Finding an element
 * Element Access
 *
 * O(1) [Constant]
 * Accessing the first element
 */

class Node {
  constructor(element) {
    this.element = element;
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(element) {
    let node = new Node(element);
    let current;

    if (this.head === null)
      this.head = node;
    else {
      current = this.head;

      while (current.next) {
        current = current.next;
      }

      current.next = node;
    }
    this.size++;
  }

  insertAt(element, index) {
    if (index < 0 || index > this.size)
      return console.log("Please enter a valid index.");
    else {
      let node = new Node(element);
      let curr, prev;

      curr = this.head;

      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        curr = this.head;
        let it = 0;

        while (it < index) {
          it++;
          prev = curr;
          curr = curr.next;
        }

        node.next = curr;
        prev.next = node;
      }
      this.size++;
    }
  }

  removeFrom(index) {
    if (index < 0 || index >= this.size)
      return console.log("Please Enter a valid index");
    else {
      let current, prev, it = 0;
      current = this.head;
      prev = current;

      if (index === 0) {
        this.head = current.next;
      } else {
        while (it < index) {
          it++;
          prev = current;
          current = current.next;
        }

        prev.next = current.next;
      }
      this.size--;

      return current.element;
    }
  }

  removeElement(element) {
    let current = this.head;
    let prev = null;

    while (current !== null) {
      if (current.element === element) {
        if (prev === null) {
          this.head = current.next;
        } else {
          prev.next = current.next;
        }
        this.size--;
        return current.element;
      }
      prev = current;
      current = current.next;
    }
    return -1;
  }

  indexOf(element) {
    let count = 0;
    let current = this.head;

    while (current !== null) {
      if (current.element === element)
        return count;
      count++;
      current = current.next;
    }

    return -1;
  }

  isEmpty() {
    return this.size === 0;
  }

  size_of_list() {
    return this.size;
  }

  printList() {
    let current = this.head;
    let str = "";
    while (current) {
      str += current.element + " ";
      current = current.next;
    }
    console.log(str);
  }
}

let ll = new LinkedList();

// testing isEmpty on an empty list
console.log(ll.isEmpty());

// adding element to the list
ll.add(10);

// prints 10
ll.printList();

// returns 1
console.log(ll.size_of_list());

// adding more elements to the list
ll.add(20);
ll.add(30);
ll.add(40);
ll.add(50);

// returns 10 20 30 40 50
ll.printList();

// prints 50 from the list
console.log("[Remove]", ll.removeElement(50));

// prints 10 20 30 40
ll.printList();

// returns 3
console.log("[Index of 40]", ll.indexOf(40));

// insert 60 at second position
ll.insertAt(60, 2);

// ll contains 10 20 60 30 40
ll.printList();

// returns false
console.log("[isEmpty]", ll.isEmpty());

// remove 3rd element from the list
console.log("[removeFrom(index)]", ll.removeFrom(3));

// prints 10 20 60 40
ll.printList();