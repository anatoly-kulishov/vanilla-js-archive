'use strict';

class HashGenerator {
	constructor(hashLength, startSymbolCode = 48, finishSymbolCode = 126) {
		this.startSymbolCode = startSymbolCode;
		this.finishSymbolCode = finishSymbolCode;
		if (!isNaN(parseInt(hashLength))) {
			this.hashLength = parseInt(hashLength);
			this.generateHash();
		} else {
			this.hash = false;
		}
	}

	getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	generateHash() {
		this.hash = '';
		for (let i = 0; i < this.hashLength; i++) {
			this.hash += String.fromCharCode(this.getRandomIntInclusive(this.startSymbolCode, this.finishSymbolCode));
		}
	}
}

const hash = new HashGenerator(10);

console.log(hash.hash);

module.exports = HashGenerator;