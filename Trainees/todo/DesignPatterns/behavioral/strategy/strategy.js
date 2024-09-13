/**
 * Стратегия — это поведенческий паттерн проектирования,
 * который определяет семейство схожих алгоритмов и помещает каждый из них в собственный класс,
 * после чего алгоритмы можно взаимозаменять прямо во время исполнения программы.
 *
 * Преимущества:
 * 1) Горячая замена алгоритмов на лету.
 * 2) Изолирует код и данные алгоритмов от остальных классов.
 * 3) Уход от наследования к делегированию.
 * 4) Реализует принцип открытости/закрытости.
 *
 * Недостатки:
 * 1) Усложняет программу за счёт дополнительных классов.
 * 2) Клиент должен знать, в чём состоит разница между стратегиями, чтобы выбрать подходящую.
 */

function baseStrategy(amount) {
  return amount;
}

function premiumStrategy(amount) {
  return amount * 0.85;
}

function platinumStrategy(amount) {
  return amount * 0.65;
}

class AutoCart {
  constructor(discount) {
    this.discount = discount;
    this.amount = 0;
  }

  checkout() {
    return this.discount(this.amount);
  }

  setAmount(amount) {
    this.amount = amount;
  }
}

const baseCustomer = new AutoCart(baseStrategy);
baseCustomer.setAmount(100);
console.log(baseCustomer.checkout()); // 100

const premiumCustomer = new AutoCart(premiumStrategy);
premiumCustomer.setAmount(100);
console.log(premiumCustomer.checkout()); // 85

const platinumCustomer = new AutoCart(platinumStrategy);
platinumCustomer.setAmount(100);
console.log(platinumCustomer.checkout()); // 65