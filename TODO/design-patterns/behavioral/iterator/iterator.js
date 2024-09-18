/**
 * Iterator — поведенческий шаблон проектирования.
 * Представляет собой объект, позволяющий получить последовательный доступ к элементам объекта-агрегата
 * без использования описаний каждого из агрегированных объектов.
 *
 * Преимущества:
 * 1) Упрощает классы хранения данных.
 * 2) Позволяет реализовать различные способы обхода структуры данных.
 * 3) Позволяет одновременно перемещаться по структуре данных в разные стороны.
 *
 * Недостатки:
 * 1) Не оправдан, если можно обойтись простым циклом.
 */

class ArrayIterator {
  constructor(el) {
    this.index = 0;
    this.elements = el;
  }

  next() {
    return this.elements[this.index++];
  }

  hasNext() {
    return this.index < this.elements.length;
  }
}

const autosArray = ['Audi', 'BMW', 'Tesla', 'Mersedes']

const autosArrayCollection = new ArrayIterator(autosArray);

while (autosArrayCollection.hasNext()) {
  /**
   * Audi
   * BMW
   * Tesla
   * Mersedes
   */
  console.log(autosArrayCollection.next());
}

class ObjectIterator {
  constructor(el) {
    this.index = 0;
    this.keys = Object.keys(el);
    this.elements = el;
  }

  next() {
    return this.elements[this.keys[this.index++]];
  }

  hasNext() {
    return this.index < this.keys.length;
  }
}

const autosObject = {
  audi: {model: 'Audi', color: 'black', price: '20000'},
  bmw: {model: 'BMW', color: 'white', price: '30000'},
  tesla: {model: 'Tesla', color: 'gray', price: '40000'},
}

const autosObjectCollection = new ObjectIterator(autosObject);

while (autosObjectCollection.hasNext()) {
  /**
   * { model: 'Audi', color: 'black', price: '20000' }
   * { model: 'BMW', color: 'white', price: '30000' }
   * { model: 'Tesla', color: 'gray', price: '40000' }
   */
  console.log(autosObjectCollection.next());
}