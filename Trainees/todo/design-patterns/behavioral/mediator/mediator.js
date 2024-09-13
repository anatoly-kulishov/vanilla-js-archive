/**
 * Посредник — это поведенческий паттерн проектирования,
 * который позволяет уменьшить связанность множества классов между собой,
 * благодаря перемещению этих связей в один класс-посредник.
 *
 * Преимущества:
 * 1) Устраняет зависимости между компонентами, позволяя повторно их использовать.
 * 2) Упрощает взаимодействие между компонентами.
 * 3) Централизует управление в одном месте.
 *
 * Недостатки:
 * 1) Посредник может сильно раздуться.
 */

class OfficialDealer {
  constructor() {
    this.customers = [];
  }

  orderAuto(customer, auto, info) {
    const name = customer.getName();
    console.log(`Order name: ${name}. Order auto is ${auto}`);
    console.log(`Additional info: ${info}`);
    this.addToCustomersList(name);
  }

  addToCustomersList(name) {
    this.customers.push(name);
  }

  banCustomerFromList(customer) {
    this.customers = this.customers.map(el => el !== customer.getName() ? el : null);
  }

  getCustomerList() {
    return this.customers;
  }
}

class Customer {
  constructor(name, dealerMediator) {
    this.name = name;
    this.dealerMediator = dealerMediator;
  }

  getName() {
    return this.name;
  }

  makeOrder(auto, info) {
    this.dealerMediator.orderAuto(this, auto, info)
  }

  banCustomer() {
    this.dealerMediator.banCustomerFromList(this)
  }
}

const mediator = new OfficialDealer();

const anatoly = new Customer('Anatoly', mediator);
const sergey = new Customer('Sergey', mediator);

/**
 * Order name: Anatoly. Order auto is Tesla
 * Additional info: With autopilot
 */
anatoly.makeOrder('Tesla', 'With autopilot');

/**
 * Order name: Sergey. Order auto is Audi
 * Additional info: With parktronic
 */
sergey.makeOrder('Audi', 'With parktronic')

/**
 * [ 'Anatoly', 'Sergey' ]
 */
console.log(mediator.getCustomerList());

sergey.banCustomer();

/**
 * [ 'Anatoly', null ]
 */
console.log(mediator.getCustomerList());