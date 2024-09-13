/**
 * Компоновщик — это структурный паттерн проектирования,
 * который позволяет с группировать множество объектов в древовидную структуру,
 * а затем работать с ней так, как будто это единичный объект.
 *
 * Преимущества:
 * 1) Упрощает архитектуру клиента при работе со сложным деревом компонентов.
 * 2) Облегчает добавление новых видов компонентов.
 *
 * Недостатки:
 * 1) Создаёт слишком общий дизайн классов.
 */

class Equipment {
  getPrice() {
    return this.price || 0;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  setPrice(price) {
    this.price = price;
  }
}

class Engine extends Equipment {
  constructor() {
    super();
    this.setName('Engine');
    this.setPrice(800);
  }
}

class Body extends Equipment {
  constructor() {
    super();
    this.setName('Body');
    this.setPrice(3000);
  }
}

class Tools extends Equipment {
  constructor() {
    super();
    this.setName('Tools');
    this.setPrice(4000);
  }
}

class Composite extends Equipment {
  constructor() {
    super();
    this.equipments = [];
  }

  add(equipment) {
    this.equipments.push(equipment);
  }

  getPrice() {
    return this.equipments
      .map(equipment => equipment.getPrice())
      .reduce((a, b) => a + b);
  }
}

class Car extends Composite {
  constructor() {
    super();
    this.setName('Audi');
  }
}

const myCar = new Car();

myCar.add(new Engine());
myCar.add(new Body());
myCar.add(new Tools());

// Audi price is 7800$
console.log(`${myCar.getName()} price is ${myCar.getPrice()}$`)
