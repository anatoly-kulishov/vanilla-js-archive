/**
 * Фасад — это структурный паттерн проектирования,
 * который предоставляет простой интерфейс к сложной системе классов, библиотеке или фреймворку.
 *
 * Преимущества:
 * 1) Изолирует клиентов от компонентов сложной подсистемы.
 *
 * Недостатки:
 * 1) Фасад рискует стать божественным объектом, привязанным ко всем классам программы.
 */

class Conveyor {

  setBody() {
    console.log('Body set!');
  }

  getEngine() {
    console.log('Dismantle Engine!');
  }

  setEngine() {
    console.log('Engine set!');
  }

  setInterior() {
    console.log('Exterior added!');
  }

  changeInterior() {
    console.log('Update interior!');
  }

  setExterior() {
    console.log('Added interior!');
  }

  setWheels() {
    console.log('Wheels!');
  }

  addElectronics() {
    console.log('Added electronics!');
  }

  paint() {
    console.log('Car painted!');
  }
}

class ConveyorFacade {
  constructor(car) {
    this.car = car;
  }

  assembleCar() {
    this.car.setBody();
    this.car.setEngine();
    this.car.setInterior();
    this.car.setExterior();
    this.car.setWheels();
    this.car.addElectronics();
    this.car.paint();
  }
}

const conveyor = new ConveyorFacade(new Conveyor());

// Body set!
// Engine set!
// Exterior added!
// Added interior!
// Wheels!
// Added electronics!
// Car painted!
conveyor.assembleCar();


