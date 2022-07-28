/**
 * Снимок — это поведенческий паттерн проектирования,
 * который позволяет сохранять и восстанавливать прошлые состояния объектов,
 * не раскрывая подробностей их реализации.
 *
 * Преимущества:
 * 1) Не нарушает инкапсуляции исходного объекта.
 * 2) Упрощает структуру исходного объекта. Ему не нужно хранить историю версий своего состояния.
 *
 * Недостатки:
 * 1) Требует много памяти, если клиенты слишком часто создают снимки.
 * 2) Может повлечь дополнительные издержки памяти, если объекты, хранящие историю, не освобождают ресурсы, занятые устаревшими снимками.
 * 3) В некоторых языках (например, PHP, Python, JavaScript) сложно гарантировать, чтобы только исходный объект имел доступ к состоянию снимка.
 */

class Memento {
  constructor(value) {
    this.value = value;
  }
}

const creator = {
  save: val => new Memento(val),
  restore: memento => memento.value,
};

class Caretaker {
  constructor() {
    this.values = [];
  }

  addMemento(memento) {
    this.values.push(memento);
  }

  getMemento(index) {
    return this.values[index];
  }

  logAllMemento() {
    console.log(this.values)
  }
}

const careTake = new Caretaker();

careTake.addMemento(creator.save('hello'));
careTake.addMemento(creator.save('hello world'));
careTake.addMemento(creator.save('hello world !!!'));

/**
 * [
 *   Memento { value: 'hello' },
 *   Memento { value: 'hello world' },
 *   Memento { value: 'hello world !!!' }
 * ]
 */
careTake.logAllMemento();

console.log(creator.restore(careTake.getMemento(0))); // hello
console.log(creator.restore(careTake.getMemento(1))); // hello world
console.log(creator.restore(careTake.getMemento(2))); // hello world !!!

