/**
 * Прототип — это порождающий паттерн проектирования,
 * который позволяет копировать объекты, не вдаваясь в подробности их реализации.
 *
 * Преимущества:
 * 1) Позволяет клонировать объекты, не привязываясь к их конкретным классам.
 * 2) Меньше повторяющегося кода инициализации объектов.
 * 3) Ускоряет создание объектов.
 * 4) Альтернатива созданию подклассов для конструирования сложных объектов.
 *
 * Недостатки:
 * 1) Сложно клонировать составные объекты, имеющие ссылки на другие объекты.
 */

class TeslaCar {
  constructor(model, price, interior, autopilot) {
    this.model = model;
    this.price = price;
    this.interior = interior;
    this.autopilot = autopilot;
  }

  produce() {
    return new TeslaCar(this.model, this.price, this.interior, this.autopilot);
  }
}

const prototypeCar = new TeslaCar('S', 8000, 'black', false);

const car1 = prototypeCar.produce();
const car2 = prototypeCar.produce();
const car3 = prototypeCar.produce();

car1.interior = 'white';
car2.autopilot = true;
car3.price = 10000;
car3.model = 'X';

/**
 * TeslaCar {
 *   model: 'S',
 *   price: 8000,
 *   interior: 'white', <---
 *   autopilot: false
 * }
 */
console.log(car1);

/**
 * TeslaCar {
 *   model: 'S',
 *   price: 8000,
 *   interior: 'black',
 *   autopilot: true <---
 * }
 */
console.log(car2);

/**
 * TeslaCar {
 *   model: 'X', <---
 *   price: 10000, <---
 *   interior: 'black',
 *   autopilot: false
 * }
 */
console.log(car3);