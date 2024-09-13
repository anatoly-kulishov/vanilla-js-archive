/**
 * Цепочка обязанностей — это поведенческий паттерн проектирования,
 * который позволяет передавать запросы последовательно по цепочке обработчиков.
 * Каждый последующий обработчик решает, может ли он обработать запрос сам и стоит ли передавать запрос дальше по цепи.
 *
 * Преимущества:
 * 1) Уменьшает зависимость между клиентом и обработчиками.
 * 2) Реализует принцип единственной обязанности.
 * 3) Реализует принцип открытости/закрытости.
 *
 * Недостатки:
 * 1) Запрос может остаться никем не обработанным.
 */

class Account {
  pay(orderPrice) {
    if (this.canPay(orderPrice)) {
      console.log(`Paid ${orderPrice} using ${this.name}`);
    } else if (this.incomer) {
      console.log(`Cannot pay using ${this.name}`);
      this.incomer.pay(orderPrice)
    } else {
      console.log('Unfortunately, not enough money');
    }
  }

  canPay(amount) {
    return this.balance >= amount;
  }

  setNext(account) {
    this.incomer = account;
  }

  show() {
    console.log(this)
  }
}

class Master extends Account {
  constructor(balance) {
    super();
    this.name = 'Master Card';
    this.balance = balance;
  }
}

class Paypal extends Account {
  constructor(balance) {
    super();
    this.name = 'Paypal';
    this.balance = balance;
  }
}

class Qiwi extends Account {
  constructor(balance) {
    super();
    this.name = 'Qiwi';
    this.balance = balance;
  }
}

const master = new Master(100);
const paypal = new Paypal(200);
const qiwi = new Qiwi(300);

master.setNext(paypal);
paypal.setNext(qiwi);

/**
 * Cannot pay using Master Card
 * Cannot pay using Paypal
 * Paid 250 using Qiwi
 */
master.pay(250);

/** THIS:
 * Master {
 *   name: 'Master Card',
 *   balance: 100,
 *   incomer: Paypal {
 *     name: 'Paypal',
 *     balance: 200,
 *     incomer: Qiwi { name: 'Qiwi', balance: 300 }
 *   }
 * }
 */
master.show();
