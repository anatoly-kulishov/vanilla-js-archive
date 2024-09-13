/**
 * Адаптер — это структурный паттерн проектирования,
 * который позволяет объектам с несовместимыми интерфейсами работать вместе.
 *
 * Преимущества:
 * 1) Отделяет и скрывает от клиента подробности преобразования различных интерфейсов.
 *
 * Недостатки:
 * 1) Усложняет код программы из-за введения дополнительных классов.
 */

class Engine2 {
  simpleInterface() {
    console.log('Engine 2.0 - tr-tr-tr')
  }
}

class EngineV8 {
  complecatedInterface() {
    console.log('Engine V8! - wroom wroom!')
  }
}

class EngineV8Adapter {
  constructor(engine) {
    this.engine = engine;
  }

  simpleInterface() {
    this.engine.complecatedInterface();
  }
}

class Auto {
  startEngine(engine) {
    engine.simpleInterface()
  }
}

const myCar = new Auto();
const oldEngine = new Engine2();

myCar.startEngine(oldEngine); // Engine 2.0 - tr-tr-tr

const myCar2 = new Auto();
const engineAdapter = new EngineV8Adapter(new EngineV8());

myCar2.startEngine(engineAdapter); // Engine V8! - wroom wroom!

const myCar3 = new Auto();
const engineAdapter2 = new EngineV8();

// ERROR
// myCar3.startEngine(engineAdapter2);