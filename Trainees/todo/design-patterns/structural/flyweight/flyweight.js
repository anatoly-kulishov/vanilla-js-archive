/**
 * Легковес — это структурный паттерн проектирования,
 * который позволяет вместить бóльшее количество объектов в отведённую оперативную память.
 * Легковес экономит память, разделяя общее состояние объектов между собой,
 * вместо хранения одинаковых данных в каждом объекте.
 *
 * Преимущества:
 * 1) Экономит оперативную память.
 *
 * Недостатки:
 * 1) Расходует процессорное время на поиск/вычисление контекста.
 * 2) Усложняет код программы из-за введения множества дополнительных классов.
 */

class Auto {
	constructor(model) {
		this.model = model;
	}
}

class AutoFactory {
	constructor(name) {
		this.models = {};
	}

	create(name) {
		let model = this.models[name];
		if (model) return model;
    console.log('model');
		this.models[name] = new Auto(name);
		return this.models[name];
	}

  getModels() {
    console.table(this.models);
  }
}

const factory = new AutoFactory();

factory.create('BMW');
factory.create('Audi');
factory.create('Tesla'); // <--
factory.create('Audi');
factory.create('Tesla'); // <-- It'll get from cache

/**
 * model
 * model
 * model
 * ┌─────────┬─────────┐
 * │ (index) │  model  │
 * ├─────────┼─────────┤
 * │   BMW   │  'BMW'  │
 * │  Audi   │ 'Audi'  │
 * │  Tesla  │ 'Tesla' │
 * └─────────┴─────────┘
 */
factory.getModels();

