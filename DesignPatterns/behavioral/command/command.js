/**
 * Команда — это поведенческий паттерн проектирования,
 * который превращает запросы в объекты,
 * позволяя передавать их как аргументы при вызове методов,
 * ставить запросы в очередь, логировать их, а также поддерживать отмену операций.
 *
 * Преимущества:
 * 1) Убирает прямую зависимость между объектами, вызывающими операции, и объектами, которые их непосредственно выполняют.
 * 2) Позволяет реализовать простую отмену и повтор операций.
 * 3) Позволяет реализовать отложенный запуск операций.
 * 4) Позволяет собирать сложные команды из простых.
 * 5) Реализует принцип открытости/закрытости.
 *
 * Недостатки:
 * 1) Усложняет код программы из-за введения множества дополнительных классов.
 */

class Driver {
  constructor(command) {
    this.command = command;
  }

  execute() {
    this.command.execute();
  }
}

class Engine {
  constructor() {
    this.state = false;
  }

  on() {
    this.state = true;
  }

  off() {
    this.state = false;
  }
}

class OnStartCommand {
  constructor(engine) {
    this.engine = engine;
  }

  execute() {
    this.engine.on();
  }
}

class OnSwitchOffCommand {
  constructor(engine) {
    this.engine = engine;
  }

  execute() {
    this.engine.off();
  }
}

const engine = new Engine();
console.log(engine); // Engine { state: false }

// On
const onStartCommand = new OnStartCommand(engine);
const drive_1 = new Driver(onStartCommand);
drive_1.execute();
console.log(engine); // Engine { state: true }

// Off
const onSwitchOffCommand = new OnSwitchOffCommand(engine);
const drive_2 = new Driver(onSwitchOffCommand);
drive_2.execute();
console.log(engine); // Engine { state: false }
