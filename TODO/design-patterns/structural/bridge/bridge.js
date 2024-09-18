/**
 * Мост — это структурный паттерн проектирования,
 * который разделяет один или несколько классов на две отдельные иерархии — абстракцию и реализацию,
 * позволяя изменять их независимо друг от друга.
 *
 * Преимущества:
 * 1) Позволяет строить платформо-независимые программы.
 * 2) Скрывает лишние или опасные детали реализации от клиентского кода.
 * 3) Реализует принцип открытости/закрытости.
 *
 * Недостатки:
 * 1) Усложняет код программы из-за введения дополнительных классов.
 */

class Model {
  constructor(color) {
    this.color = color;
  }
}

class Color {
  constructor(type) {
    this.type = type;
  }

  get() {
    return this.type;
  }
}

class BlackColor extends Color {
  constructor() {
    super("dark-black");
  }
}

class SilbrigColor extends Color {
  constructor() {
    super("silbermetallic");
  }
}

class Audi extends Model {
  constructor(color) {
    super(color);
  }

  paint() {
    return `Auto: Audi, Color: ${this.color.get()}`;
  }
}

class Bmw extends Model {
  constructor(color) {
    super(color);
  }

  paint() {
    return `Auto: Bmw, Color: ${this.color.get()}`;
  }
}

const blackBmw = new Bmw(new BlackColor());

console.log(blackBmw.paint()); // Auto: Bmw, Color: dark-black

const SilbrigAudi = new Audi(new SilbrigColor());

console.log(SilbrigAudi.paint()); // Auto: Audi, Color: Silbermetallic
