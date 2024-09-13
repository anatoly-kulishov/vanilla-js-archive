/**
 * Состояние — это поведенческий паттерн проектирования,
 * который позволяет объектам менять поведение в зависимости от своего состояния.
 * Извне создаётся впечатление, что изменился класс объекта.
 *
 * Преимущества:
 * 1) Избавляет от множества больших условных операторов машины состояний.
 * 2) Концентрирует в одном месте код, связанный с определённым состоянием.
 * 3) Упрощает код контекста.
 *
 * Недостатки:
 * 1) Может неоправданно усложнить код, если состояний мало и они редко меняются.
 */

class OrderStatus {
  constructor(name, nextStatus) {
    this.name = name;
    this.nextStatus = nextStatus;
  }

  next() {
    return new this.nextStatus();
  }
}

class WaitingForPayment extends OrderStatus {
  constructor() {
    super('waitingForPayment', Shipping);
  }
}

class Shipping extends OrderStatus {
  constructor() {
    super('shipping', Delivered);
  }
}

class Delivered extends OrderStatus {
  constructor() {
    super('delivered', Delivered);
  }
}

class Order {
  constructor() {
    this.state = new WaitingForPayment();
    this.orderStatus = true;
  }

  nextState() {
    if (this.orderStatus) {
      this.state = this.state.next();
    }
  };

  cancelOrder() {
    if (this.state.name === 'waitingForPayment') {
      this.orderStatus = false;
      console.log('Order is canceled!');
    } else {
      console.log('Order can not be canceled');
    }
  }
}

const myOrder = new Order();

console.log(myOrder.state.name); // waitingForPayment

// myOrder.cancelOrder(); // Order is canceled!

myOrder.nextState();
console.log(myOrder.state.name); // shipping

// myOrder.cancelOrder(); // Order can not be canceled

myOrder.nextState();
console.log(myOrder.state.name); // delivered
