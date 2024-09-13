/**
 * Наблюдатель — это поведенческий паттерн проектирования,
 * который создаёт механизм подписки,
 * позволяющий одним объектам следить и реагировать на события,
 * происходящие в других объектах.
 *
 * Преимущества:
 * 1) Издатели не зависят от конкретных классов подписчиков и наоборот.
 * 2) Вы можете подписывать и отписывать получателей на лету.
 * 3) Реализует принцип открытости/закрытости.
 *
 * Недостатки:
 * 1) Подписчики оповещаются в случайном порядке.
 */

class AutoNews {
  constructor() {
    this.news = '';
    this.actions = [];
  }

  setNews(text) {
    this.news = text;
    this.notifyAll();
  }

  notifyAll() {
    return this.actions.forEach(subs => subs.inform(this));
  }

  register(observer) {
    this.actions.push(new observer());
  }

  unregister(observer) {
    this.actions = this.actions.filter(el => !(el instanceof observer));
  }
}

class Jack {
  inform(message) {
    console.log(`Jack has been informed about: ${message.news}`);
  }
}

class Max {
  inform(message) {
    console.log(`Max has been informed about: ${message.news}`);
  }
}

const autoNews = new AutoNews();

autoNews.register(Jack);
autoNews.register(Max);

autoNews.setNews('New Tesla price is 40 000');

/**
 * Jack has been informed about: New Tesla price is 40 000
 * Max has been informed about: New Tesla price is 40 000
 */

autoNews.unregister(Max);

autoNews.setNews('Stock, new Tesla price is 30 000!');

/**
 * Jack has been informed about: Stock, new Tesla price is 30 000!
 */
