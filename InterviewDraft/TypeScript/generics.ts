interface DefaultCustomer {
	type: "default";
	name: "unknown";
}

interface MinPersonInfo {
	name: string;
}

function workWithPerson<T extends MinPersonInfo = DefaultCustomer>(
	args: T
): MinPersonInfo {
	return args;
}

const test = workWithPerson({
	type: "mock",
	name: "Anatoly",
	age: 69,
	sex: "male"
});

console.log(test); // {type: "mock", name: "Anatoly", age: 69, sex: "male"}