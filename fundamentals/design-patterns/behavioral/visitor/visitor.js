/**
 * Посетитель — это поведенческий паттерн проектирования,
 * который позволяет добавлять в программу новые операции,
 * не изменяя классы объектов, над которыми эти операции могут выполняться.
 *
 * Преимущества:
 * 1) Упрощает добавление операций, работающих со сложными структурами объектов.
 * 2) Объединяет родственные операции в одном классе.
 * 3) Посетитель может накапливать состояние при обходе структуры элементов.
 *
 * Недостатки:
 * 1) Паттерн не оправдан, если иерархия элементов часто меняется.
 * 2) Может привести к нарушению инкапсуляции элементов.
 */

class Auto {
  accept(visitor) {
    visitor(this);
  }
}

class Tesla extends Auto {
  info() {
    return 'It is a Tesla car!';
  }
}

class Bmw extends Auto {
  info() {
    return 'It is a BMW car!';
  }
}

class Audi extends Auto {
  info() {
    return 'It is an Audi car!';
  }
}

function exportVisitor(auto) {
  if (auto instanceof Tesla)
    auto.export = console.log(`Exported data: ${auto.info()}`);
  if (auto instanceof Bmw)
    auto.export = console.log(`Exported data: ${auto.info()}`);
  if (auto instanceof Audi)
    auto.export = console.log(`Exported data: ${auto.info()}`);
}

const tesla = new Tesla();
const audi = new Audi();
const bmw = new Bmw();

exportVisitor(tesla); // Exported data: It is a Tesla car!
exportVisitor(audi); // Exported data: It is an Audi car!
exportVisitor(bmw); // Exported data: It is a BMW car!