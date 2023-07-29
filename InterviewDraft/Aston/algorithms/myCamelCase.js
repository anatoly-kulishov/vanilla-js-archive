/**
 * Написать код, чтобы можно было вызвать и отрабатывало:
 * "hello world".camelCase() => HelloWorld
 */

const testCase = require("../../../Helpers/testCase");

String.prototype.toUpperCaseFirstChar = function () {
	return this.substring(0, 1).toUpperCase() + this.substring(1);
}

String.prototype.toCamelCase = function () {
	return this
		.split(' ')
		.map((word) => word.toUpperCaseFirstChar())
		.join('');
}

testCase('hello world'.toCamelCase(), "HelloWorld", true);
testCase('EquipmentClass name'.toCamelCase(), "EquipmentClassName");
testCase('Equipment className'.toCamelCase(), "EquipmentClassName");
testCase('equipment class name'.toCamelCase(), "EquipmentClassName");
testCase('Equipment Class Name'.toCamelCase(), "EquipmentClassName");
