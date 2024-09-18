/**
 * Одиночка — это порождающий паттерн проектирования,
 * который гарантирует, что у класса есть только один экземпляр,
 * и предоставляет к нему глобальную точку доступа.
 *
 * Преимущества:
 * 1) Гарантирует наличие единственного экземпляра класса.
 * 2) Предоставляет к нему глобальную точку доступа.
 * 3) Реализует отложенную инициализацию объекта-одиночки.
 *
 * Недостатки:
 * 1) Нарушает принцип единственной ответственности класса.
 * 2) Маскирует плохой дизайн.
 * 3) Проблемы мультипоточности.
 * 4) Требует постоянного создания Mock-объектов при юнит-тестировании.
 */

class Counter {
  constructor() {
    if (typeof Counter.instance === 'object') {
      return Counter.instance;
    }
    this.count = 0;
    Counter.instance = this;
    return this;
  }

  getCount() {
    return this.count;
  }

  increaseCount() {
    return this.count++;
  }

  decreaseCount() {
    return this.count--;
  }
}

const counter1 = new Counter();
const counter2 = new Counter();

counter1.increaseCount(); // 1
counter2.increaseCount(); // 2
counter2.increaseCount(); // 3

counter2.decreaseCount(); // 2

console.log(counter1.getCount()); // output => 2
console.log(counter2.getCount()); // output => 2
