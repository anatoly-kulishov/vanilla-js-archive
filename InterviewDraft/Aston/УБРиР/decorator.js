/**
 * Есть система, в которой есть интерфейс ICalculator, описывающий метод calculate(float, float):float.
 * Его реализуют 197 классов.
 * У этих классов нет общего родителя. Метод ICalculator:: calculate – используют в 311 местах.
 * Мы точно знаем, что объекты калькуляторов создаются с помощью вызова фабрики CalculatorFactory::getCalculator(string): ICalculator.
 * Нужно залогировать все вызовы ICalculator:: calculate, в которых хочется видеть класс калькулятора, входные параметры на расчёт и результат расчёта.
 * (Ответ: декоратор)
 */

/**
 * Декоратор — это структурный паттерн проектирования,
 * который позволяет динамически добавлять объектам новую функциональность,
 * оборачивая их в полезные «обёртки».
 *
 * Преимущества:
 * 1) Большая гибкость, чем у наследования.
 * 2) Позволяет добавлять обязанности на лету.
 * 3) Можно добавлять несколько новых обязанностей сразу.
 * 4) Позволяет иметь несколько мелких объектов вместо одного объекта на все случаи жизни.
 *
 * Недостатки:
 * 1) Трудно конфигурировать многократно обёрнутые объекты.
 * 2) Обилие крошечных классов.
 */

class Car {
  constructor() {
    this.price = 10000;
    this.model = 'Car';
  }

  getPrice() {
    return this.price;
  }

  getDescription() {
    return this.model
  }
}

class Tesla extends Car {
  constructor() {
    super();
    this.price = 25000;
    this.model = 'Tesla';
  }
}

class Autopilot {
  constructor(car) {
    this.car = car;
  }

  getPrice() {
    return this.car.getPrice() + 5000;
  }

  getDescription() {
    return `${this.car.getDescription()} with autopilot`;
  }
}

class Parktronic {
  constructor(car) {
    this.car = car;
  }

  getPrice() {
    return this.car.getPrice() + 3000;
  }

  getDescription() {
    return `${this.car.getDescription()} with parktronic`;
  }
}

class ChromePlating {
  constructor(car) {
    this.car = car;
  }

  getPrice() {
    return this.car.getPrice() + 2000;
  }

  getDescription() {
    return `${this.car.getDescription()} with chrome`;
  }
}

let tesla = new Tesla();

tesla = new Autopilot(tesla);
console.log(tesla.getDescription(), tesla.getPrice()); // Tesla with autopilot 30000

tesla = new Parktronic(tesla);
console.log(tesla.getDescription(), tesla.getPrice()); // Tesla with autopilot with parktronic 33000

tesla = new ChromePlating(tesla);
console.log(tesla.getDescription(), tesla.getPrice()); // Tesla with autopilot with parktronic with chrome 35000