class EventEmitter {
	constructor() {
		this.events = {};
	}

	on(eventName, callback) {
		if (!this.events[eventName]) {
			this.events[eventName] = [];
		}
		this.events[eventName].push(callback);
	}

	off(eventName, callback) {
		if (!this.events[eventName]) {
			return;
		}
		this.events[eventName] = this.events[eventName].filter((cb) => cb !== callback);
	}

	emit(eventName, ...args) {
		if (!this.events[eventName]) {
			return;
		}
		this.events[eventName].forEach((callback) => callback(...args));
	}
}

module.exports = { EventEmitter };

const emitter = new EventEmitter();
const calls = [];

emitter.on('data', (value) => calls.push(value));
emitter.emit('data', 1);
emitter.emit('data', 2);

const noop = () => calls.push('noop');
emitter.on('data', noop);
emitter.off('data', noop);
emitter.emit('data', 3);

const testCase = require('#shared/testCase');
testCase(calls, [1, 2, 3], true);
