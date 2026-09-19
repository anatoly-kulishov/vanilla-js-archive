/**
 * Строитель — это порождающий паттерн проектирования,
 * который позволяет создавать сложные объекты пошагово.
 * Строитель даёт возможность использовать один и тот же код строительства
 * для получения разных представлений объектов.
 *
 * Преимущества:
 * 1) Позволяет создавать продукты пошагово.
 * 2) Позволяет использовать один и тот же код для создания различных продуктов.
 * 3) Изолирует сложный код сборки продукта от его основной бизнес-логики.
 *
 * Недостатки:
 * 1) Усложняет код программы из-за введения дополнительных классов.
 * 2) Клиент будет привязан к конкретным классам строителей, так как в интерфейсе директора может не быть метода получения результата.
 */

class Car {
  constructor() {
    this.autoPilot = false;
    this.parktronic = false;
    this.signaling = false;
    this.color = 'black';
  }
}

class CarBuilder {
  constructor() {
    this.car = new Car();
  }

  addAutoPilot(autoPilot) {
    this.car.autoPilot = autoPilot;
    return this;
  }

  addParktronic(parktronic) {
    this.car.parktronic = parktronic;
    return this;
  }

  addSignaling(signaling) {
    this.car.signaling = signaling;
    return this;
  }

  updateEngine(engine) {
    this.car.engine = engine;
    return this;
  }

  setCarColor(color) {
    this.car.color = color;
    return this;
  }

  build() {
    return this.car;
  }
}

const myCarWithAutoPilot = new CarBuilder()
  .addAutoPilot(true)
  .addParktronic(true)
  .updateEngine('V8')
  .setCarColor('red')
  .build();

/**
 * ┌────────────┬────────┐
 * │  (index)   │ Values │
 * ├────────────┼────────┤
 * │ autoPilot  │  true  │
 * │ parktronic │  true  │
 * │ signaling  │ false  │
 * │   color    │ 'red'  │
 * │   engine   │  'V8'  │
 * └────────────┴────────┘
 */
console.table(myCarWithAutoPilot);

const myCarWithoutAutoPilot = new CarBuilder()
  .addAutoPilot(false)
  .addParktronic(true)
  .updateEngine('V8')
  .addSignaling('SOS')
  .build();

/**
 * ┌────────────┬─────────┐
 * │  (index)   │ Values  │
 * ├────────────┼─────────┤
 * │ autoPilot  │  false  │
 * │ parktronic │  true   │
 * │ signaling  │  'SOS'  │
 * │   color    │ 'black' │
 * │   engine   │  'V8'   │
 * └────────────┴─────────┘
 */
console.table(myCarWithoutAutoPilot);