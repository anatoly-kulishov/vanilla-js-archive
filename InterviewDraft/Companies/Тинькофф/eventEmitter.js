class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (cb) => cb !== callback
      );
    }
  }

  emit(eventName) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => callback());
    }
  }
}

let a = new EventEmitter();

function console1() {
  console.log(1);
}

function console2() {
  console.log(2);
}

a.on("event1", console1);
a.on("event2", console2);

a.emit("event1"); // Output: 1
a.emit("event2"); // Output: 2

a.off("event2");

a.emit("event1"); // Output: 1
