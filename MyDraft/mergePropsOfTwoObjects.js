const obj1 = {
	food: "pizza",
	beverage: "orange fresh",
	coffee: "late",
	issues: {one: 1}
}

const obj2 = {
	salad: "greek",
	main: "grilled chicken",
	coffee: "americano"
}

let merged1 = {...obj1, ...obj2}; // shallow copy
let merged2 = Object.assign({}, obj1, obj2); // shallow copy
let merged3 = {};
for(let attr in obj1) merged3[attr] = obj1[attr] // shallow copy
for(let attr in obj2) merged3[attr] = obj2[attr] // shallow copy

obj1.issues["one"] = 404;

console.table(merged1);
console.table(merged2);
console.table(merged3);