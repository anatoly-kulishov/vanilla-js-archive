const Stack = require("../helpers/stack");

const stackWithElements = new Stack();
const emptyStack = new Stack();

stackWithElements.push('element1');
stackWithElements.push('element2');
stackWithElements.push('element3');
stackWithElements.push('element4');
stackWithElements.push('element5');

function searchByStack(stack, searchElement) {

  if(!stack.size()) {
    return -1;
  }

  const temp = [];

  for(el in stack.storage) {
    const current = stack.storage[el];
    temp.push(current);
  }

  for (let i = 0; i < temp.length; i++) {
    if(temp[i] === searchElement) {
      return searchElement;
    }
  }

  return -1;
}

console.log(searchByStack(stackWithElements, 'element2')); // element2
console.log(searchByStack(stackWithElements, 'element1')); // element1
console.log(searchByStack(stackWithElements, 'missingElement')); // -1
console.log(searchByStack(emptyStack, 'missingElement')); // -1