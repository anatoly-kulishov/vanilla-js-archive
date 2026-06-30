/**
 * Абстрактная фабрика — это порождающий паттерн проектирования,
 * который позволяет создавать семейства связанных объектов,
 * не привязываясь к конкретным классам создаваемых объектов.
 *
 * Преимущества:
 * 1) Гарантирует сочетаемость создаваемых продуктов.
 * 2) Избавляет клиентский код от привязки к конкретным классам продуктов.
 * 3) Выделяет код производства продуктов в одно место, упрощая поддержку кода.
 * 4) Упрощает добавление новых продуктов в программу.
 * 5) Реализует принцип открытости/закрытости.
 *
 * Недостатки:
 * 1) Усложняет код программы из-за введения множества дополнительных классов.
 * 2) Требует наличия всех типов продуктов в каждой вариации.
 */

function BmwProducer(kind) {
  if(kind === 'sport')
    return sportCarFactory;
  if(kind === 'family')
    return familyCarFactory;
}

function sportCarFactory() {
  return new Z4();
}

function familyCarFactory() {
  return new I3();
}

class Z4 {
  info() {
    return "Z4 is a Sport car!";
  }
}

class I3 {
  info() {
    return "i3 is a Family car!";
  }
}

const SportCarProduce = BmwProducer('sport');
const mySportCar = SportCarProduce();
console.log(mySportCar.info()); // Z4 is a Sport car!

const FamilyCarProduce = BmwProducer('family');
const myFamilyCar = FamilyCarProduce();
console.log(myFamilyCar.info()); // i3 is a Family car!