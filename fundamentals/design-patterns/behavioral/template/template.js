/**
 * Шаблонный метод — это поведенческий паттерн проектирования,
 * который определяет скелет алгоритма, перекладывая ответственность за некоторые его шаги на подклассы.
 * Паттерн позволяет подклассам переопределять шаги алгоритма, не меняя его общей структуры.
 *
 * Преимущества:
 * 1) Облегчает повторное использование кода.
 *
 * Недостатки:
 * 1) Вы жёстко ограничены скелетом существующего алгоритма.
 * 2) Вы можете нарушить принцип подстановки Барбары Лисков, изменяя базовое поведение одного из шагов алгоритма через подкласс.
 * 3) С ростом количества шагов шаблонный метод становится слишком сложно поддерживать.
 */

class Builder {
  build() {
    this.addEngine();
    this.installChassis();
    this.addElectronic();
    this.collectAccessories();
  }
}

class TeslaBuilder extends Builder {
  addEngine() {
    console.log('Add Electronic Engine');
  }

  installChassis() {
    console.log('Install Tesla chassis');
  }

  addElectronic() {
    console.log('Add special electronic');
  }

  collectAccessories() {
    console.log('Collect Accessories');
  }
}

class BmwBuilder extends Builder {
  addEngine() {
    console.log('Add BMW Engine');
  }

  installChassis() {
    console.log('Install BMW chassis');
  }

  addElectronic() {
    console.log('Add electronic');
  }

  collectAccessories() {
    console.log('Collect Accessories');
  }
}

const teslaBuilder = new TeslaBuilder();
const bmwBuilder = new BmwBuilder();

/**
 * Add Electronic Engine
 * Install Tesla chassis
 * Add special electronic
 * Collect Accessories
 */
teslaBuilder.build();

/**
 * Add BMW Engine
 * Install BMW chassis
 * Add electronic
 * Collect Accessories
 */
bmwBuilder.build();